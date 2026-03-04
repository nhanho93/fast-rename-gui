// --- Tab Management ---
const tabBtns = document.querySelectorAll('.tab-btn:not([data-img-target])');
const tabContents = document.querySelectorAll('.tab-content');
let currentTab = 'tab-rename';

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        currentTab = btn.dataset.target;
        document.getElementById(currentTab).classList.add('active');

        // Update Table Headers
        const isImage = currentTab === 'tab-image';
        document.querySelector('#preview-table th:nth-child(3)').textContent = isImage ? 'New Config' : 'Rename';

        updatePreview();
    });
});

// --- Inner Sub-Tab Management ---
document.querySelectorAll('[data-img-target]').forEach(btn => {
    btn.addEventListener('click', () => {
        const subTabContainer = btn.closest('.sidebar-tabs');
        const mainPanel = btn.closest('.tab-content');

        // Only remove active from buttons in the SAME sub-tab group
        if (subTabContainer) {
            subTabContainer.querySelectorAll('[data-img-target]').forEach(b => b.classList.remove('active'));
        }

        // Only hide panels in the SAME main tab
        if (mainPanel) {
            mainPanel.querySelectorAll('.img-tab-content').forEach(c => {
                c.style.display = 'none';
                c.classList.remove('active'); // sync active class too
            });
        }

        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.imgTarget);
        if (target) {
            target.style.display = 'block';
            target.classList.add('active');
        }
    });
});

// --- Custom Select Component (Body-Portal Fix for overflow clipping) ---

// Single floating portal div appended to body
const dropdownPortal = document.createElement('div');
dropdownPortal.id = 'dropdown-portal';
dropdownPortal.style.cssText = 'position:fixed;z-index:9999;display:none;';
document.body.appendChild(dropdownPortal);

let activeSelect = null; // tracks which .custom-select is open

function closeDropdown() {
    dropdownPortal.style.display = 'none';
    dropdownPortal.innerHTML = '';
    if (activeSelect) {
        activeSelect.querySelector('.select-selected').classList.remove('select-arrow-active');
        activeSelect = null;
    }
}

function setupCustomSelects() {
    document.querySelectorAll('.custom-select').forEach(selectElement => {
        const selected = selectElement.querySelector('.select-selected');
        const items = selectElement.querySelector('.select-items');
        const hiddenInput = selectElement.querySelector('input[type="hidden"]');

        selected.addEventListener('click', (e) => {
            e.stopPropagation();

            // If this dropdown is already open, close it
            if (activeSelect === selectElement) {
                closeDropdown();
                return;
            }

            // Close any previously open dropdown
            closeDropdown();
            activeSelect = selectElement;
            selected.classList.add('select-arrow-active');

            // Clone items into portal
            const clone = items.cloneNode(true);
            clone.classList.remove('select-hide');
            clone.style.cssText = ''; // clear any hidden inline style

            // Position portal — flip UP if not enough space below
            const rect = selected.getBoundingClientRect();
            dropdownPortal.style.left = rect.left + 'px';
            dropdownPortal.style.width = rect.width + 'px';
            dropdownPortal.style.display = 'block';
            dropdownPortal.innerHTML = '';
            dropdownPortal.appendChild(clone);

            // Measure actual portal height AFTER inserting content
            const portalHeight = dropdownPortal.offsetHeight;
            const spaceBelow = window.innerHeight - rect.bottom - 8;
            const spaceAbove = rect.top - 8;

            if (spaceBelow >= portalHeight || spaceBelow >= spaceAbove) {
                // Open downward
                dropdownPortal.style.top = (rect.bottom + 4) + 'px';
                dropdownPortal.style.bottom = '';
            } else {
                // Flip upward
                dropdownPortal.style.top = '';
                dropdownPortal.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
            }

            // Wire up items in the portal clone
            clone.querySelectorAll('div').forEach(item => {
                const val = item.dataset.value;
                const text = item.textContent;
                if (!val) return;
                item.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    selected.textContent = text;
                    hiddenInput.value = val;
                    closeDropdown();
                    hiddenInput.dispatchEvent(new Event('change'));
                    updatePreview();
                });
            });
        });
    });

    // Close on outside click or scroll
    document.addEventListener('click', closeDropdown);
    window.addEventListener('scroll', closeDropdown, true);
}
setupCustomSelects();


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
const processBtn = document.getElementById('process-btn');
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

// --- Toggles & Setup ---
const resizeEnable = document.getElementById('resize-enable');
const resizeControls = document.getElementById('resize-controls');
const cropEnable = document.getElementById('crop-enable');
const cropControls = document.getElementById('crop-controls');

resizeEnable.addEventListener('change', () => {
    resizeControls.classList.toggle('disabled', !resizeEnable.checked);
    updatePreview();
});

cropEnable.addEventListener('change', () => {
    cropControls.classList.toggle('disabled', !cropEnable.checked);
    updatePreview();
});

// --- Image Processing Controls ---
const resizeMode = document.getElementById('resize-mode');
const resizeDimGroup = document.getElementById('resize-dimensions-group');
const resizePctGroup = document.getElementById('resize-percent-group');

resizeMode.addEventListener('change', (e) => {
    resizeDimGroup.classList.toggle('hidden', e.target.value !== 'dimensions');
    resizePctGroup.classList.toggle('hidden', e.target.value !== 'percentage');
});

const cropMode = document.getElementById('crop-mode');
const cropDimGroup = document.getElementById('crop-dimensions-group');
const cropRatioGroup = document.getElementById('crop-ratio-group');

cropMode.addEventListener('change', (e) => {
    cropDimGroup.classList.toggle('hidden', e.target.value !== 'dimensions');
    cropRatioGroup.classList.toggle('hidden', e.target.value !== 'ratio');
});

// --- Quality Mode Controls ---
const qualityMode = document.getElementById('quality-mode');
const qualityValueGroup = document.getElementById('quality-value-group');
qualityMode.addEventListener('change', () => {
    qualityValueGroup.classList.toggle('hidden', qualityMode.value !== 'manual');
    updatePreview();
});

// --- Convert Format Controls ---
const convertEnable = document.getElementById('convert-enable');
const convertControls = document.getElementById('convert-controls');
convertEnable.addEventListener('change', () => {
    convertControls.classList.toggle('disabled', !convertEnable.checked);
    updatePreview();
});

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
        let name = file;
        let previewText = '';

        if (currentTab === 'tab-rename') {
            name = generateName(file, i);
            if (resolve) {
                let c = 0;
                let tmp = name;
                while (counts[tmp]) { c++; tmp = generateName(file, i, c); }
                name = tmp;
            }
            if (counts[name]) conflicts.push(name);
            counts[name] = (counts[name] || 0) + 1;
            previewText = name;
        } else {
            // Image Processing Mode: Name stays same, show operation preview
            let ops = [];

            if (resizeEnable.checked) {
                const rMode = resizeMode.value;
                if (rMode === 'dimensions') ops.push(`Resize: ${document.getElementById('resize-width').value || 'auto'}x${document.getElementById('resize-height').value || 'auto'}`);
                if (rMode === 'percentage') ops.push(`Scale: ${document.getElementById('resize-percent').value || 100}%`);
            }

            if (cropEnable.checked) {
                const cMode = cropMode.value;
                if (cMode === 'dimensions') ops.push(`Crop: ${document.getElementById('crop-width').value || 'auto'}x${document.getElementById('crop-height').value || 'auto'}`);
                if (cMode === 'ratio') ops.push(`Crop ${document.getElementById('crop-ratio').value || '1:1'}`);
            }

            if (convertEnable.checked) {
                const fmt = document.getElementById('convert-format').value.toUpperCase();
                const ext = file.split('.').pop().toUpperCase();
                ops.push(`Convert: ${ext} → ${fmt}`);
            }

            previewText = ops.length > 0 ? ops.join(' | ') : 'No Operations Selected';
        }

        mappings.push({ oldName: file, newName: name });

        const tr = document.createElement('tr');
        tr.dataset.oldName = file;

        let origColumn = `<td>${file}</td>`;
        if (currentTab === 'tab-image' && imageMetadataCache[file]) {
            const w = imageMetadataCache[file].width;
            const h = imageMetadataCache[file].height;
            origColumn = `<td>
                <div>${file}</div>
                <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">${w} × ${h}</div>
            </td>`;
        }

        tr.innerHTML = `
            <td class="sort-handle">⋮⋮</td>
            ${origColumn}
            <td class="new-name" style="${currentTab === 'tab-image' ? 'color: var(--text-secondary); font-weight: 500;' : ''}">${previewText}</td>
            <td><button class="remove-row-btn" title="Remove from list">✕</button></td>
        `;
        tr.querySelector('.remove-row-btn').addEventListener('click', () => {
            orderedFiles = orderedFiles.filter(f => f !== file);
            updatePreview();
        });
        previewBody.appendChild(tr);
    });

    fileCountSpan.textContent = `${orderedFiles.length} File${orderedFiles.length !== 1 ? 's' : ''} Identified`;
    processBtn.disabled = orderedFiles.length === 0;
    numberingControls.classList.toggle('disabled', !numEnable.checked);

    return conflicts;
}

// Track whether user selected specific files (vs an entire folder)
let filesMode = false;

const imageMetadataCache = {};

async function fetchImageMetadata() {
    if (!currentDir || orderedFiles.length === 0) return;
    const sep = currentDir.includes('\\') ? '\\' : '/';
    let added = false;

    const promises = orderedFiles.map(async f => {
        if (!imageMetadataCache[f] && f.match(/\.(jpe?g|png|webp|gif|bmp|tiff?|avif)$/i)) {
            const filePath = `${currentDir}${currentDir.endsWith(sep) ? '' : sep}${f}`;
            const meta = await window.electronAPI.getImageMetadata(filePath);
            if (meta) {
                imageMetadataCache[f] = meta;
                added = true;
            }
        }
    });

    await Promise.all(promises);
    if (added && currentTab === 'tab-image') {
        updatePreview();
    }
}

// Shared helper to load a result payload
async function loadResult(result) {
    if (!result) return;
    if (result.type === 'files') {
        filesMode = true;
        const p0 = result.paths[0];
        const sep = p0.includes('\\') ? '\\' : '/';
        const folder = result.dir || p0.substring(0, p0.lastIndexOf(sep));
        currentDir = folder;
        folderPathInput.value = folder;
        orderedFiles = result.paths.map(p => p.substring(p.lastIndexOf(sep) + 1))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        updatePreview();
        fetchImageMetadata();
    } else if (result.type === 'folder') {
        filesMode = false;
        currentDir = result.path;
        folderPathInput.value = result.path;
        const raw = await window.electronAPI.listFiles(result.path);
        orderedFiles = raw.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        updatePreview();
        fetchImageMetadata();
    }
}

selectFolderBtn.addEventListener('click', async () => {
    const result = await window.electronAPI.selectFolder();
    await loadResult(result);
});

const selectFilesBtn = document.getElementById('select-files-btn');
selectFilesBtn.addEventListener('click', async () => {
    const result = await window.electronAPI.selectFiles();
    await loadResult(result);
});

// Allow typing a path directly and pressing Enter or clicking away
folderPathInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const typed = folderPathInput.value.trim();
        if (typed) {
            const result = await window.electronAPI.checkPath(typed);
            if (result) {
                await loadResult(result);
            } else {
                folderPathInput.style.borderColor = 'var(--error, #ff5555)';
                setTimeout(() => folderPathInput.style.borderColor = '', 1500);
            }
        }
    }
});

folderPathInput.addEventListener('blur', async () => {
    const typed = folderPathInput.value.trim();
    if (typed && typed !== currentDir) {
        const result = await window.electronAPI.checkPath(typed);
        if (result) await loadResult(result);
    }
});

[optLowercase, optRemoveAccents, optSpaceToHyphen, numEnable].forEach(el => el.addEventListener('change', () => updatePreview()));
[prefixInput, suffixInput, extensionInput, numStart, numPadding, numSeparator].forEach(el => el.addEventListener('input', () => updatePreview()));

['resize-width', 'resize-height', 'resize-percent', 'crop-width', 'crop-height', 'crop-ratio', 'crop-gravity'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => updatePreview());
});

processBtn.addEventListener('click', () => {
    if (currentTab === 'tab-rename') {
        const conflicts = updatePreview();
        if (conflicts.length > 0) {
            conflictList.innerHTML = [...new Set(conflicts)].map(c => `<li>${c}</li>`).join('');
            modalOverlay.classList.remove('hidden');
        } else { executeProcessing(); }
    } else {
        executeProcessing();
    }
});

modalCancel.addEventListener('click', () => modalOverlay.classList.add('hidden'));
modalConfirm.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    updatePreview(true);
    executeProcessing();
});

async function executeProcessing() {
    processBtn.disabled = true;

    // Build context payload
    const payload = {
        dirPath: currentDir,
        fileMappings: mappings,
        mode: currentTab,
        imageOptions: {
            resizeEnable: resizeEnable.checked,
            resizeMode: resizeMode.value,
            resizeWidth: document.getElementById('resize-width').value,
            resizeHeight: document.getElementById('resize-height').value,
            resizePercent: document.getElementById('resize-percent').value,
            qualityMode: document.getElementById('quality-mode').value,
            qualityValue: document.getElementById('quality-value').value,
            cropEnable: cropEnable.checked,
            cropMode: cropMode.value,
            cropGravity: document.getElementById('crop-gravity').value,
            cropWidth: document.getElementById('crop-width').value,
            cropHeight: document.getElementById('crop-height').value,
            cropRatio: document.getElementById('crop-ratio').value,
            convertTo: convertEnable.checked ? document.getElementById('convert-format').value : 'original',
            keepOriginal: document.getElementById('keep-original-toggle').checked
        }
    };

    const result = await window.electronAPI.renameFiles(payload);

    if (result.errors.length === 0) {
        showToast(`Successfully transformed ${result.successCount} entities!`, 'success');

        if (filesMode) {
            // In file-selection mode: update orderedFiles in-place so we don't reload the whole folder.
            // Build a map of oldName → newName based on what the backend would have produced.
            const convertTo = convertEnable.checked ? document.getElementById('convert-format').value : null;
            const keepOrig = document.getElementById('keep-original-toggle').checked;
            if (!keepOrig && convertTo && convertTo !== 'original') {
                // Files were converted to a new extension — update names to reflect new extension
                orderedFiles = orderedFiles.map(f => {
                    const base = f.replace(/\.[^.]+$/, '');
                    return base + '.' + convertTo;
                });
            } else if (currentTab === 'tab-rename') {
                // Rename mode: update orderedFiles from the mappings already computed
                const mapped = mappings.reduce((acc, { oldName, newName }) => {
                    acc[oldName] = newName;
                    return acc;
                }, {});
                orderedFiles = orderedFiles.map(f => mapped[f] || f);
            }
            // For resize/crop (same ext, same or suffixed name): just refresh previews
            updatePreview();
        } else {
            // Folder mode: safe to reload all from disk
            const raw = await window.electronAPI.listFiles(currentDir);
            orderedFiles = raw.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
            updatePreview();
        }
    } else {
        showToast(`Operation completed with ${result.errors.length} errors.`, 'error');
    }
    processBtn.disabled = false;
}

function showToast(m, t) {
    toast.textContent = m;
    toast.className = `toast ${t}`;
    setTimeout(() => { toast.className = 'toast hidden'; }, 4000);
}
