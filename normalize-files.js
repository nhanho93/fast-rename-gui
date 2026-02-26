#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run') || args.includes('-d');
const targetDir = args.filter(a => !a.startsWith('-'))[0] || process.cwd();

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
    str = str.replace(/Đ/g, "d");
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str;
}

function normalizeFileName(name) {
    const ext = path.extname(name);
    const base = path.basename(name, ext);
    if (name === 'normalize-files.js') return name;

    let normalized = removeVietnameseTones(base).toLowerCase();
    normalized = normalized.replace(/\s+/g, '-');
    normalized = normalized.replace(/[^a-z0-9-]/g, '-');
    normalized = normalized.replace(/-+/g, '-');
    normalized = normalized.replace(/^-+|-+$/g, '');

    return normalized + ext.toLowerCase();
}

if (!fs.existsSync(targetDir)) {
    console.error(`Error: Directory not found: ${targetDir}`);
    process.exit(1);
}

console.log(`${dryRun ? '[Dry Run] ' : ''}Scanning directory: ${targetDir}`);

const files = fs.readdirSync(targetDir);
let count = 0;

files.forEach(file => {
    const oldPath = path.join(targetDir, file);
    if (fs.statSync(oldPath).isFile()) {
        const newFileName = normalizeFileName(file);
        const newPath = path.join(targetDir, newFileName);

        if (file !== newFileName) {
            console.log(`Renaming: "${file}" -> "${newFileName}"`);
            if (!dryRun) {
                try {
                    fs.renameSync(oldPath, newPath);
                    count++;
                } catch (e) {
                    console.error(`Failed to rename "${file}": ${e.message}`);
                }
            } else {
                count++;
            }
        }
    }
});

console.log(`\nDone. ${dryRun ? 'Plan to rename' : 'Renamed'} ${count} files.`);
