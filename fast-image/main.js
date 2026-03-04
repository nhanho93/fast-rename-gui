const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs-extra');

function createWindow() {
    const win = new BrowserWindow({
        width: 1050,
        height: 800,
        minWidth: 700,
        minHeight: 500,
        icon: path.join(__dirname, 'logo-app.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
        autoHideMenuBar: true,
        backgroundColor: '#0a0a0b',
        title: "Fast Rename Siêu Cấp VIP PRO"
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('select-folder', async (event) => {
    try {
        const win = BrowserWindow.fromWebContents(event.sender);
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            properties: ['openDirectory']
        });
        if (canceled || !filePaths.length) return null;
        return { type: 'folder', path: filePaths[0] };
    } catch (err) {
        console.error('Dialog error:', err);
        return null;
    }
});

ipcMain.handle('select-files', async (event) => {
    try {
        const win = BrowserWindow.fromWebContents(event.sender);
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Common Images', extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'tif', 'avif', 'svg'] },
                { name: 'RAW / Camera', extensions: ['heic', 'heif', 'dng', 'raw', 'cr2', 'cr3', 'nef', 'arw', 'orf', 'rw2'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        });
        if (canceled || !filePaths.length) return null;
        return { type: 'files', paths: filePaths };
    } catch (err) {
        console.error('File dialog error:', err);
        return null;
    }
});

ipcMain.handle('check-path', async (event, inputPath) => {
    try {
        const stat = await fs.stat(inputPath);
        if (stat.isDirectory()) return { type: 'folder', path: inputPath };
        // If it's a file, return its parent folder and the file name
        const parentDir = path.dirname(inputPath);
        return { type: 'files', paths: [inputPath], dir: parentDir };
    } catch {
        return null; // Path doesn't exist
    }
});

ipcMain.handle('list-files', async (event, dirPath) => {
    try {
        const items = await fs.readdir(dirPath);
        const files = [];
        for (const item of items) {
            if ((await fs.stat(path.join(dirPath, item))).isFile()) {
                files.push(item);
            }
        }
        return files;
    } catch (error) {
        return [];
    }
});

const sharp = require('sharp');

ipcMain.handle('get-image-metadata', async (event, filePath) => {
    try {
        const meta = await sharp(filePath).metadata();
        return { width: meta.width, height: meta.height };
    } catch {
        return null;
    }
});

ipcMain.handle('rename-files', async (event, payload) => {
    // Legacy support for direct rename object or new payload structure
    const dirPath = payload.dirPath || payload;
    const fileMappings = payload.fileMappings || [];
    const mode = payload.mode || 'tab-rename';
    const opts = payload.imageOptions || {};

    const res = { successCount: 0, errors: [] };

    // IMAGE PROCESSING MODE
    if (mode === 'tab-image') {
        // sharp-processable formats; HEIC/HEIF excluded (no built-in decoder in most sharp builds)
        const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif', '.bmp', '.avif']);

        for (const { oldName } of fileMappings) {
            const ext = path.extname(oldName).toLowerCase();
            if (!imageExts.has(ext)) continue;

            const inputPath = path.join(dirPath, oldName);
            const tempOutPath = path.join(dirPath, `temp_vip_${Date.now()}_${oldName}`);

            try {
                let pipeline = sharp(inputPath);

                // 1. Apply Resize
                if (opts.resizeMode === 'dimensions') {
                    const w = parseInt(opts.resizeWidth) || null;
                    const h = parseInt(opts.resizeHeight) || null;
                    if (w || h) {
                        pipeline = pipeline.resize({ width: w, height: h, fit: 'inside', withoutEnlargement: true });
                    }
                } else if (opts.resizeMode === 'percentage') {
                    const pct = parseInt(opts.resizePercent);
                    if (pct && pct !== 100) {
                        const metadata = await sharp(inputPath).metadata();
                        const w = Math.round(metadata.width * (pct / 100));
                        pipeline = pipeline.resize({ width: w });
                    }
                }

                // 2. Apply Crop
                let gravityConfig = sharp.gravity.center;
                if (opts.cropGravity === 'north') gravityConfig = sharp.gravity.north;
                if (opts.cropGravity === 'entropy') gravityConfig = sharp.strategy.entropy;

                if (opts.cropMode === 'dimensions') {
                    const cw = parseInt(opts.cropWidth) || null;
                    const ch = parseInt(opts.cropHeight) || null;
                    if (cw && ch) {
                        pipeline = pipeline.resize({ width: cw, height: ch, fit: 'cover', position: gravityConfig });
                    }
                } else if (opts.cropMode === 'ratio') {
                    const ratioInput = opts.cropRatio || '1:1';
                    const parts = ratioInput.split(':');
                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                        const metadata = await sharp(inputPath).metadata();
                        const targetRatio = parseFloat(parts[0]) / parseFloat(parts[1]);
                        const currentRatio = metadata.width / metadata.height;

                        let cw = metadata.width;
                        let ch = metadata.height;

                        if (currentRatio > targetRatio) {
                            cw = Math.round(ch * targetRatio);
                        } else {
                            ch = Math.round(cw / targetRatio);
                        }

                        pipeline = pipeline.resize({ width: cw, height: ch, fit: 'cover', position: gravityConfig });
                    }
                }

                // 3. Apply Quality
                const qMode = opts.qualityMode;
                const qVal = parseInt(opts.qualityValue) || 85;
                if (qMode === 'manual') {
                    if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: qVal });
                    else if (ext === '.png') pipeline = pipeline.png({ quality: qVal });
                    else if (ext === '.webp') pipeline = pipeline.webp({ quality: qVal });
                }

                // 4. Apply Format Conversion
                const convertTo = opts.convertTo; // e.g. 'jpg', 'png', 'webp', 'avif', or 'original'
                const keepOriginal = opts.keepOriginal || false;

                // Build suffix for keepOriginal mode
                let keepSuffix = '';
                if (keepOriginal) {
                    if (opts.resizeEnable) {
                        if (opts.resizeMode === 'dimensions') {
                            const w = opts.resizeWidth || 'auto';
                            const h = opts.resizeHeight || 'auto';
                            keepSuffix += `_${w}x${h}`;
                        } else if (opts.resizeMode === 'percentage') {
                            keepSuffix += `_${opts.resizePercent || 100}pct`;
                        }
                    }
                    if (opts.cropEnable) {
                        if (opts.cropMode === 'dimensions') {
                            const cw = opts.cropWidth || 'auto';
                            const ch = opts.cropHeight || 'auto';
                            keepSuffix += `_crop${cw}x${ch}`;
                        } else if (opts.cropMode === 'ratio') {
                            const ratio = (opts.cropRatio || '1:1').replace(':', '-');
                            keepSuffix += `_crop${ratio}`;
                        }
                    }
                }

                let finalName = oldName;
                let finalExt = ext;
                if (convertTo && convertTo !== 'original') {
                    finalExt = '.' + convertTo;
                    // When converting: suffix goes before the new extension
                    const base = oldName.replace(/\.[^.]+$/, '');
                    finalName = base + keepSuffix + finalExt;
                    // Apply sharp format encoder explicitly
                    const qVal2 = parseInt(opts.qualityValue) || 85;
                    const useQuality = opts.qualityMode === 'manual';
                    if (convertTo === 'jpg' || convertTo === 'jpeg') pipeline = pipeline.jpeg({ quality: useQuality ? qVal2 : 90 });
                    else if (convertTo === 'png') pipeline = pipeline.png({ quality: useQuality ? qVal2 : undefined });
                    else if (convertTo === 'webp') pipeline = pipeline.webp({ quality: useQuality ? qVal2 : 90 });
                    else if (convertTo === 'avif') pipeline = pipeline.avif({ quality: useQuality ? qVal2 : 60 });
                } else if (keepOriginal && keepSuffix) {
                    // Same extension, just add suffix before ext
                    const base = oldName.replace(/\.[^.]+$/, '');
                    finalName = base + keepSuffix + ext;
                }

                // Build temp path with correct final extension
                const tempOutPath2 = path.join(dirPath, `temp_vip_${Date.now()}_${finalName}`);

                // Execute Pipeline
                await pipeline.toFile(tempOutPath2);

                if (keepOriginal) {
                    // Just rename temp to final (original file untouched)
                    await fs.rename(tempOutPath2, path.join(dirPath, finalName));
                } else {
                    // Replace original
                    await fs.remove(inputPath);
                    await fs.rename(tempOutPath2, path.join(dirPath, finalName));
                }
                res.successCount++;

            } catch (e) {
                // Cleanup temp file if error occurs
                if (await fs.pathExists(tempOutPath)) await fs.remove(tempOutPath);
                res.errors.push({ file: oldName, error: e.message });
            }
        }
        return res;
    }

    // NORMAL RENAME MODE
    for (const { oldName, newName } of fileMappings) {
        if (oldName === newName) continue;
        try {
            await fs.rename(path.join(dirPath, oldName), path.join(dirPath, newName));
            res.successCount++;
        } catch (e) {
            res.errors.push({ file: oldName, error: e.message });
        }
    }
    return res;
});

// ============================================================
// --- Favicon Generator ---
// ============================================================

/**
 * Encode multiple PNG buffers into a single ICO file (PNG-in-ICO, Vista+).
 * No external deps required.
 */
function createICOBuffer(entries) {
    const HEADER = 6;
    const DIR_ENTRY = 16;
    const count = entries.length;
    const dataBase = HEADER + count * DIR_ENTRY;
    const totalSize = dataBase + entries.reduce((s, e) => s + e.data.length, 0);
    const buf = Buffer.alloc(totalSize, 0);

    // ICO file header
    buf.writeUInt16LE(0, 0);       // reserved
    buf.writeUInt16LE(1, 2);       // type: 1 = icon
    buf.writeUInt16LE(count, 4);   // image count

    let dirOff = HEADER;
    let dataOff = dataBase;

    for (const { data, size } of entries) {
        const sz = size >= 256 ? 0 : size; // 0 = 256px in ICO spec
        buf.writeUInt8(sz, dirOff);              // width
        buf.writeUInt8(sz, dirOff + 1);          // height
        buf.writeUInt8(0, dirOff + 2);           // color count
        buf.writeUInt8(0, dirOff + 3);           // reserved
        buf.writeUInt16LE(0, dirOff + 4);        // planes (0 = PNG embed)
        buf.writeUInt16LE(0, dirOff + 6);        // bit count (0 = PNG embed)
        buf.writeUInt32LE(data.length, dirOff + 8);  // data size
        buf.writeUInt32LE(dataOff, dirOff + 12);     // data offset
        dirOff += DIR_ENTRY;
        data.copy(buf, dataOff);
        dataOff += data.length;
    }
    return buf;
}

ipcMain.handle('select-logo-file', async (event) => {
    try {
        const win = BrowserWindow.fromWebContents(event.sender);
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            title: 'Select Logo File',
            filters: [
                { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'svg'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile']
        });
        if (canceled || !filePaths.length) return null;
        return filePaths[0];
    } catch (err) {
        return null;
    }
});

ipcMain.handle('select-output-folder', async (event) => {
    try {
        const win = BrowserWindow.fromWebContents(event.sender);
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            title: 'Select Output Folder',
            properties: ['openDirectory', 'createDirectory']
        });
        if (canceled || !filePaths.length) return null;
        return filePaths[0];
    } catch (err) {
        return null;
    }
});

ipcMain.handle('generate-favicon', async (event, { logoPath, outputDir, appName, themeColor }) => {
    const results = [];
    const errors = [];

    try {
        await fs.ensureDir(outputDir);

        const PNG_SIZES = [
            { name: 'favicon-16x16.png', size: 16 },
            { name: 'favicon-32x32.png', size: 32 },
            { name: 'favicon-48x48.png', size: 48 },
            { name: 'apple-touch-icon.png', size: 180 },
            { name: 'android-chrome-192x192.png', size: 192 },
            { name: 'android-chrome-512x512.png', size: 512 },
        ];
        const ICO_SIZES = [16, 32, 48];

        // 1. Generate all PNG sizes
        for (const { name, size } of PNG_SIZES) {
            try {
                await sharp(logoPath)
                    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                    .png()
                    .toFile(path.join(outputDir, name));
                results.push(name);
            } catch (e) {
                errors.push({ file: name, error: e.message });
            }
        }

        // 2. Generate favicon.ico (multi-size PNG-in-ICO)
        try {
            const icoEntries = [];
            for (const size of ICO_SIZES) {
                const data = await sharp(logoPath)
                    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                    .png()
                    .toBuffer();
                icoEntries.push({ data, size });
            }
            await fs.writeFile(path.join(outputDir, 'favicon.ico'), createICOBuffer(icoEntries));
            results.push('favicon.ico');
        } catch (e) {
            errors.push({ file: 'favicon.ico', error: e.message });
        }

        // 3. Generate site.webmanifest
        const manifest = {
            name: appName || 'My App',
            short_name: (appName || 'App').split(' ')[0],
            icons: [
                { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
            ],
            theme_color: themeColor || '#ffffff',
            background_color: '#ffffff',
            display: 'standalone'
        };
        await fs.writeJSON(path.join(outputDir, 'site.webmanifest'), manifest, { spaces: 2 });
        results.push('site.webmanifest');

        return { results, errors };
    } catch (e) {
        return { results, errors: [{ file: 'setup', error: e.message }] };
    }
});

// External link opener
ipcMain.handle('open-external', async (event, url) => {
    if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
        await shell.openExternal(url);
    }
});
