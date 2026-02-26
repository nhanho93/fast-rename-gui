// --- Custom Select Component ---
const anchorSelect = document.getElementById('anchor-select');
const selected = anchorSelect.querySelector('.select-selected');
const items = anchorSelect.querySelector('.select-items');
const hiddenInput = document.getElementById('num-position');

selected.addEventListener('click', (e) => {
    e.stopPropagation();
    items.classList.toggle('select-hide');
    selected.classList.toggle('select-arrow-active');
});

items.querySelectorAll('div').forEach(item => {
    item.addEventListener('click', () => {
        selected.textContent = item.textContent;
        hiddenInput.value = item.dataset.value;
        items.classList.add('select-hide');
        selected.classList.remove('select-arrow-active');
        updatePreview(); // Trigger preview update on change
    });
});

document.addEventListener('click', () => {
    items.classList.add('select-hide');
    selected.classList.remove('select-arrow-active');
});

// --- Theme Management ---
const themeBtns = document.querySelectorAll('.theme-btn');

function applyTheme(theme) {
    if (theme === 'auto') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('light-theme', !isDark);
    } else {
        document.body.classList.toggle('light-theme', theme === 'light');
    }

    themeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    localStorage.setItem('v3-platinum-theme', theme);
}

const savedTheme = localStorage.getItem('v3-platinum-theme') || 'dark';
applyTheme(savedTheme);

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('v3-platinum-theme') === 'auto') applyTheme('auto');
});

// --- Tooltip & Info Icons ---
const tooltip = document.getElementById('tooltip');
const infoIcons = document.querySelectorAll('.info-icon');

infoIcons.forEach(icon => {
    const hideTooltip = () => {
        tooltip.classList.add('hidden');
        tooltip.style.transform = 'translate(-50%, -100%) scale(0.9)';
    };

    icon.addEventListener('mouseenter', () => {
        tooltip.textContent = icon.dataset.info;
        tooltip.classList.remove('hidden');
        const rect = icon.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 12}px`;
        tooltip.style.transform = 'translate(-50%, -100%) scale(1)';
    });

    icon.addEventListener('mouseleave', hideTooltip);
    icon.addEventListener('mouseout', hideTooltip); // Extra safety
    icon.addEventListener('click', hideTooltip);
    window.addEventListener('scroll', hideTooltip, true);
});

// Global safety cleanup for tooltip
document.addEventListener('mouseover', (e) => {
    if (!e.target.closest('.info-icon') && !tooltip.classList.contains('hidden')) {
        tooltip.classList.add('hidden');
    }
});

// --- Core Renaming Engine ---
const selectFolderBtn = document.getElementById('select-folder-btn');
const folderPathInput = document.getElementById('folder-path');
const previewBody = document.getElementById('preview-body');
const fileCountSpan = document.getElementById('file-count');
const renameBtn = document.getElementById('rename-btn');
const toast = document.getElementById('toast');

const optLowercase = document.getElementById('opt-lowercase');
const optRemoveAccents = document.getElementById('opt-remove-accents');
const optSpaceToHyphen = document.getElementById('opt-space-to-hyphen');

const prefixInput = document.getElementById('prefix');
const suffixInput = document.getElementById('suffix');
const extensionInput = document.getElementById('extension');

const numEnable = document.getElementById('num-enable');
const numStart = document.getElementById('num-start');
const numPadding = document.getElementById('num-padding');
const numSeparator = document.getElementById('num-separator');
const numberingControls = document.getElementById('numbering-controls');

const modalOverlay = document.getElementById('modal-overlay');
const conflictList = document.getElementById('conflict-list');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

let currentDir = '';
let orderedFiles = [];
let mappings = [];

// Sortable Implementation
const sortable = new Sortable(previewBody, {
    handle: '.sort-handle',
    animation: 300,
    ghostClass: 'sortable-ghost',
    onEnd: () => {
        const rows = Array.from(previewBody.querySelectorAll('tr'));
        orderedFiles = rows.map(row => row.dataset.oldName);
        updatePreview();
    }
});

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
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "d");
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str;
}

function generateName(filename, index, resolveNum = 0) {
    const dot = filename.lastIndexOf('.');
    let base = dot !== -1 ? filename.substring(0, dot) : filename;
    let ext = dot !== -1 ? filename.substring(dot) : '';

    let res = base;
    if (optRemoveAccents.checked) res = removeVietnameseTones(res);
    if (optLowercase.checked) res = res.toLowerCase();
    if (optSpaceToHyphen.checked) {
        res = res.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
    }

    res = (prefixInput.value || '') + res + (suffixInput.value || '');

    if (numEnable.checked) {
        const start = parseInt(numStart.value) || 1;
        const pad = parseInt(numPadding.value) || 1;
        const sep = numSeparator.value || '';
        const position = hiddenInput.value;
        const ns = (start + index).toString().padStart(pad, '0');
        res = position === 'prefix' ? ns + sep + res : res + sep + ns;
    }

    if (resolveNum > 0) res += `-${resolveNum}`;
    const newExt = extensionInput.value || ext;
    const finalExt = (newExt.startsWith('.') ? newExt : '.' + newExt).toLowerCase();
    return res + finalExt;
}

function updatePreview(resolve = false) {
    mappings = [];
    previewBody.innerHTML = '';
    const counts = {};
    const conflicts = [];

    orderedFiles.forEach((file, i) => {
        let name = generateName(file, i);
        if (resolve) {
            let c = 0;
            let tmp = name;
            while (counts[tmp]) { c++; tmp = generateName(file, i, c); }
            name = tmp;
        }
        if (counts[name]) conflicts.push(name);
        counts[name] = (counts[name] || 0) + 1;
        mappings.push({ oldName: file, newName: name });

        const tr = document.createElement('tr');
        tr.dataset.oldName = file;
        tr.innerHTML = `
            <td class="sort-handle">⋮⋮</td>
            <td>${file}</td>
            <td class="new-name">${name}</td>
        `;
        previewBody.appendChild(tr);
    });

    fileCountSpan.textContent = `${orderedFiles.length} File${orderedFiles.length !== 1 ? 's' : ''} Identified`;
    renameBtn.disabled = orderedFiles.length === 0;
    numberingControls.classList.toggle('disabled', !numEnable.checked);

    return conflicts;
}

selectFolderBtn.addEventListener('click', async () => {
    const folder = await window.electronAPI.selectFolder();
    if (folder) {
        currentDir = folder;
        folderPathInput.value = folder;
        const raw = await window.electronAPI.listFiles(folder);
        orderedFiles = raw.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        updatePreview();
    }
});

[optLowercase, optRemoveAccents, optSpaceToHyphen, numEnable].forEach(el => el.addEventListener('change', () => updatePreview()));
[prefixInput, suffixInput, extensionInput, numStart, numPadding, numSeparator].forEach(el => el.addEventListener('input', () => updatePreview()));

renameBtn.addEventListener('click', () => {
    const conflicts = updatePreview();
    if (conflicts.length > 0) {
        conflictList.innerHTML = [...new Set(conflicts)].map(c => `<li>${c}</li>`).join('');
        modalOverlay.classList.remove('hidden');
    } else { executeRename(); }
});

modalCancel.addEventListener('click', () => modalOverlay.classList.add('hidden'));
modalConfirm.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    updatePreview(true);
    executeRename();
});

async function executeRename() {
    renameBtn.disabled = true;
    const result = await window.electronAPI.renameFiles({ dirPath: currentDir, fileMappings: mappings });

    if (result.errors.length === 0) {
        showToast(`Successfully transformed ${result.successCount} entities!`, 'success');
        const raw = await window.electronAPI.listFiles(currentDir);
        orderedFiles = raw.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        updatePreview();
    } else {
        showToast(`Operation completed with ${result.errors.length} errors.`, 'error');
    }
    renameBtn.disabled = false;
}

function showToast(m, t) {
    toast.textContent = m;
    toast.className = `toast ${t}`;
    setTimeout(() => { toast.className = 'toast hidden'; }, 4000);
}
