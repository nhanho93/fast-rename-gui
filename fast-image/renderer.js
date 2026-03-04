// ============================================================
// --- i18n Language Engine ---
// ============================================================
const LANG = {
    vi: {
        // Labels
        source: 'Nguồn',
        quickRename: 'Rename Nhanh',
        advancedRename: 'Rename Nâng Cao',
        smartNumbering: 'Đánh Số Tự Động',
        resizeOptions: 'Tùy chọn Resize',
        cropOptions: 'Tùy chọn Crop',
        convertFormat: 'Chuyển Định Dạng',
        renamingList: 'Danh Sách Xử Lý',
        configuration: 'Cấu Hình',
        separator: 'Phân cách',
        startFrom: 'Bắt đầu từ',
        padding: 'Padding',
        constraintMode: 'Chế độ',
        outputQuality: 'Chất lượng',
        cropModeLabel: 'Chế độ Crop',
        gravityFocus: 'Trọng tâm',
        outputFormat: 'Định dạng đầu ra',
        widthPx: 'Rộng (px)',
        heightPx: 'Cao (px)',
        widthLabel: 'Rộng',
        heightLabel: 'Cao',
        percentage: 'Phần trăm (%)',
        ratioLabel: 'Tỷ lệ (R:C)',
        qualityVal: 'Chất lượng (1-100)',
        keepSource: 'Giữ File Gốc',
        thOriginal: 'Tên gốc',
        thNewName: 'Tên mới',
        thNewConfig: 'Cấu hình mới',
        // Buttons
        btnFolder: '📂 Thư Mục',
        btnFiles: '🖼️ Files',
        btnApply: '⚡ Áp Dụng',
        modalTitle: 'Phát hiện Xung đột Tên',
        modalBody: 'Nhiều file sẽ có cùng tên. Bạn có muốn tự động thêm số thứ tự để giải quyết không?',
        modalCancel: 'Hủy bỏ',
        modalConfirm: 'Giải quyết & Tiếp tục',
        // Tabs
        tabRename: 'Rename',
        tabImage: 'Ảnh',
        tabQuick: 'Nhanh',
        tabAdvanced: 'Nâng Cao',
        tabNumber: 'Đánh Số',
        tabResize: 'Resize',
        tabCrop: '✂️ Crop',
        tabConvert: 'Convert',
        // Checkboxes
        optLowercase: 'Chữ thường',
        optNoAccents: 'Bỏ dấu',
        optHyphens: 'Gạch ngang',
        // Selects
        numPosPrefix: 'Đầu (Tiền tố)',
        numPosSuffix: 'Cuối (Hậu tố)',
        dimDimensions: 'Kích thước',
        dimPercentage: 'Phần trăm',
        dimRatio: 'Tỷ lệ khung hình',
        qualOriginal: 'Gốc',
        qualManual: 'Thủ công %',
        gravCenter: 'Giữa',
        gravNorth: 'Trên (Bắc)',
        gravEntropy: 'Nội dung thông minh',
        // Placeholders
        phFolderPath: 'Dán đường dẫn hoặc Browse...',
        phPrefix: 'Tiền tố (vd: IMG_)',
        phSuffix: 'Hậu tố (vd: _v1)',
        phExtension: 'Đuôi file (vd: webp)',
        phWidthAuto: 'vd: 800, auto',
        phHeightAuto: 'vd: 600, auto',
        phRatio: 'vd: 16:9, 1:1',
        // Dynamic
        filesFound: (n) => `${n} Tập Tin${n !== 1 ? '' : ''}`,
        noOpsSelected: 'Chưa chọn thao tác',
        opResize: 'Resize',
        opScale: 'Tỷ lệ',
        opCrop: 'Cắt',
        opConvert: 'Chuyển đổi',
        successToast: (n) => `Đã xử lý thành công ${n} tập tin!`,
        errorToast: (n) => `Hoàn tất với ${n} lỗi.`,
        // Changelog
        changelogTitle: 'Nhật ký thay đổi',
        cl16_1: '🌐 Favicon SEO Pack: Tự tạo cấu trúc & icon tự động',
        cl16_2: '🌍 Giao diện song ngữ: Hỗ trợ đầy đủ Anh / Việt',
        cl16_3: '✨ Chuẩn font chữ: Be Vietnam Pro sửa lỗi dấu Tiếng Việt',
        cl16_4: '✨ Changelog thông minh: Tự động gập các phiên bản cũ',
        cl16_5: '🐛 Fix UI: Sửa lỗi Tooltip & Modal bị tràn mép màn hình',
        cl15_1: '✨ Xử lý ảnh tích hợp: Resize, Crop, Convert (sharp)',
        cl15_2: '✨ Chọn nhiều file riêng lẻ (Select Files)',
        cl15_3: '✨ Vị trí số thứ tự: Prefix / Suffix',
        cl15_4: '✨ Theme Auto theo hệ thống OS',
        cl15_6: '🔧 Dropdown portal fix, flip upward thông minh',
        cl15_7: '🔧 Hiển thị kích thước ảnh gốc trong bảng preview',
        cl15_8: '🔧 Nút ✕ xóa từng file khỏi danh sách',
        cl15_9: ' 🐛 Fix file list sau khi convert định dạng',
        cl10_1: '🎉 Ra mắt lần đầu',
        cl10_2: '✨ Rename nhanh: Lowercase, bỏ dấu, gạch ngang',
        cl10_3: '✨ Prefix / Suffix / Extension override',
        cl10_4: '✨ Đánh số tự động có padding',
        cl10_5: '✨ Phát hiện & giải quyết xung đột tên',
        cl10_6: '✨ Kéo thả sắp xếp file',
        cl10_7: '✨ Dark / Light theme',
        clFullLink: 'Xem changelog đầy đủ trên GitHub ↗',
        // Favicon Tab
        tabFavicon: 'Favicon',
        faviconLabel: '🌐 Favicon SEO Pack',
        fvNoLogo: 'Chưa chọn logo',
        fvPickLogo: 'Chọn Logo...',
        fvAppName: 'Tên ứng dụng',
        fvAppNamePh: 'Tên website / app',
        fvThemeColor: 'Màu chủ đạo',
        fvOutputDir: 'Thư mục xuất',
        fvOutputDirPh: 'Chọn thư mục...',
        fvPickOutput: '📁 Chọn thư mục xuất',
        fvGenerate: '⚡ Tạo Favicon Pack',
        fvResultsLabel: '📦 Files đã tạo',
        fvHint: '📂 Tự tạo thư mục: [tên-logo]-favicon/ cạnh file logo',
        fvThFile: 'File',
        fvThSize: 'Kích thước',
        fvThStatus: 'Trạng thái',
    },
    en: {
        // Labels
        source: 'Source',
        quickRename: 'Quick Rename',
        advancedRename: 'Advanced Rename',
        smartNumbering: 'Smart Numbering',
        resizeOptions: 'Resize Options',
        cropOptions: 'Crop Options',
        convertFormat: 'Convert Format',
        renamingList: 'Renaming List',
        configuration: 'Configuration',
        separator: 'Separator',
        startFrom: 'Start From',
        padding: 'Padding',
        constraintMode: 'Constraint Mode',
        outputQuality: 'Output Quality',
        cropModeLabel: 'Crop Mode',
        gravityFocus: 'Gravity focus',
        outputFormat: 'Output Format',
        widthPx: 'Width (px)',
        heightPx: 'Height (px)',
        widthLabel: 'Width',
        heightLabel: 'Height',
        percentage: 'Percentage (%)',
        ratioLabel: 'Ratio (W:H)',
        qualityVal: 'Quality (1-100)',
        keepSource: 'Keep File Source',
        thOriginal: 'Original',
        thNewName: 'New Name',
        thNewConfig: 'New Config',
        // Buttons
        btnFolder: '📂 Folder',
        btnFiles: '🖼️ Files',
        btnApply: 'Apply Transform',
        modalTitle: 'Namespace Conflict Detected',
        modalBody: 'Multiple files will result in the same name. Would you like to enable auto-sequencing to resolve this?',
        modalCancel: 'Abort Operation',
        modalConfirm: 'Resolve & Proceed',
        // Tabs
        tabRename: 'Rename',
        tabImage: 'Image',
        tabQuick: 'Quick',
        tabAdvanced: 'Advanced',
        tabNumber: '#️Number',
        tabResize: 'Resize',
        tabCrop: '✂️ Crop',
        tabConvert: 'Convert',
        // Checkboxes
        optLowercase: 'Lowercase',
        optNoAccents: 'No Accents',
        optHyphens: 'Hyphens',
        // Selects
        numPosPrefix: 'Start (Prefix)',
        numPosSuffix: 'End (Suffix)',
        dimDimensions: 'Dimensions',
        dimPercentage: 'Percentage',
        dimRatio: 'Aspect Ratio',
        qualOriginal: 'Original',
        qualManual: 'Manual %',
        gravCenter: 'Center',
        gravNorth: 'Top (North)',
        gravEntropy: 'Smart Content',
        // Placeholders
        phFolderPath: 'Paste path or Browse...',
        phPrefix: 'Prefix (e.g. IMG_)',
        phSuffix: 'Suffix (e.g. _v1)',
        phExtension: 'Extension (e.g. webp)',
        phWidthAuto: 'e.g. 800, auto',
        phHeightAuto: 'e.g. 600, auto',
        phRatio: 'e.g. 16:9, 1:1',
        // Dynamic
        filesFound: (n) => `${n} File${n !== 1 ? 's' : ''} Identified`,
        noOpsSelected: 'No Operations Selected',
        opResize: 'Resize',
        opScale: 'Scale',
        opCrop: 'Crop',
        opConvert: 'Convert',
        successToast: (n) => `Successfully transformed ${n} entities!`,
        errorToast: (n) => `Operation completed with ${n} errors.`,
        // Changelog
        changelogTitle: 'Changelog',
        cl16_1: '🌐 Favicon SEO Pack: Auto-generate structure & icons',
        cl16_2: '🌍 Bilingual UI: Full EN/VI translations',
        cl16_3: '✨ Font support: Be Vietnam Pro for correct diacritics',
        cl16_4: '✨ Smart Auto-Collapse for old Changelogs',
        cl16_5: '🐛 Fixed Tooltip & Modal Overflow clipping issues',
        cl15_1: '✨ Integrated image processor: Resize, Crop, Convert (sharp)',
        cl15_2: '✨ Select individual files (Select Files)',
        cl15_3: '✨ Numbering position: Prefix / Suffix',
        cl15_4: '✨ Auto theme following OS dark/light mode',
        cl15_6: '🔧 Dropdown portal fix, smart flip upward',
        cl15_7: '🔧 Show original image dimensions in preview table',
        cl15_8: '🔧 Per-row ✕ remove button',
        cl15_9: '🐛 Fix dropdown clipped by overflow:hidden',
        cl15_10: '🐛 Fix file list after format conversion',
        cl10_1: '🎉 Initial release',
        cl10_2: '✨ Quick rename: Lowercase, remove accents, hyphens',
        cl10_3: '✨ Prefix / Suffix / Extension override',
        cl10_4: '✨ Auto numbering with padding',
        cl10_5: '✨ Conflict detection & auto-resolve',
        cl10_6: '✨ Drag-to-reorder files',
        cl10_7: '✨ Dark / Light theme',
        clFullLink: 'View full changelog on GitHub ↗',
        // Favicon Tab
        tabFavicon: 'Favicon',
        faviconLabel: '🌐 Favicon SEO Pack',
        fvNoLogo: 'No logo selected',
        fvPickLogo: 'Pick Logo...',
        fvAppName: 'App Name',
        fvAppNamePh: 'Website / app name',
        fvThemeColor: 'Theme Color',
        fvOutputDir: 'Output Folder',
        fvOutputDirPh: 'Choose folder...',
        fvPickOutput: '📁 Choose Output Folder',
        fvGenerate: '⚡ Generate Favicon Pack',
        fvResultsLabel: '📦 Generated Files',
        fvHint: '📂 Auto folder: [logo-name]-favicon/ next to logo file',
        fvThFile: 'File',
        fvThSize: 'Size',
        fvThStatus: 'Status',
    }
};

let currentLang = localStorage.getItem('vip-lang') || 'vi';

function t(key) {
    return LANG[currentLang][key] || LANG['en'][key] || key;
}

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('vip-lang', lang);

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t(key);
        if (val) el.textContent = val;
    });

    // Update all data-i18n-placeholder inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const val = t(key);
        if (val) el.placeholder = val;
    });

    // Update all data-info tooltips
    document.querySelectorAll('.info-icon').forEach(el => {
        const val = el.dataset[`info${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
        if (val) el.dataset.info = val;
    });

    // Update lang button label
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = lang === 'vi' ? 'VI' : 'EN';

    // Re-render file count and preview if files loaded
    if (orderedFiles && orderedFiles.length > 0) {
        fileCountSpan.textContent = t('filesFound')(orderedFiles.length);
        updatePreview();
    }
}

// Lang button toggle + Changelog toggle
document.addEventListener('DOMContentLoaded', () => {
    // Language
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            applyLang(currentLang === 'vi' ? 'en' : 'vi');
        });
    }

    // Changelog
    const changelogBtn = document.getElementById('changelog-btn');
    const changelogOverlay = document.getElementById('changelog-overlay');
    const changelogClose = document.getElementById('changelog-close');

    if (changelogBtn && changelogOverlay) {
        changelogBtn.addEventListener('click', () => {
            changelogOverlay.classList.remove('hidden');
        });
        changelogClose.addEventListener('click', () => {
            changelogOverlay.classList.add('hidden');
        });
        changelogOverlay.addEventListener('click', (e) => {
            if (e.target === changelogOverlay) changelogOverlay.classList.add('hidden');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') changelogOverlay.classList.add('hidden');
        });
    }

    // Apply saved language on load
    applyLang(currentLang);
});

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

        // Show/hide right column panels for favicon tab
        const isFavicon = currentTab === 'tab-favicon';
        document.getElementById('preview-section').classList.toggle('hidden', isFavicon);
        document.getElementById('favicon-right-panel').classList.toggle('hidden', !isFavicon);
        processBtn.disabled = isFavicon ? !window._faviconLogoReady : orderedFiles.length === 0;

        if (!isFavicon) {
            // Update Table Headers
            const isImage = currentTab === 'tab-image';
            document.querySelector('#preview-table th:nth-child(3)').textContent = isImage ? t('thNewConfig') : t('thNewName');
            updatePreview();
        }
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
        tooltip.style.transform = 'translate(-50%, -100%) scale(1)';

        const rect = icon.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 12}px`;

        // Fix boundary overflow
        const ttRect = tooltip.getBoundingClientRect();
        if (ttRect.left < 10) {
            tooltip.style.left = `${10 + ttRect.width / 2}px`;
        } else if (ttRect.right > window.innerWidth - 10) {
            tooltip.style.left = `${window.innerWidth - 10 - ttRect.width / 2}px`;
        }
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
                if (rMode === 'dimensions') ops.push(`${t('opResize')}: ${document.getElementById('resize-width').value || 'auto'}x${document.getElementById('resize-height').value || 'auto'}`);
                if (rMode === 'percentage') ops.push(`${t('opScale')}: ${document.getElementById('resize-percent').value || 100}%`);
            }

            if (cropEnable.checked) {
                const cMode = cropMode.value;
                if (cMode === 'dimensions') ops.push(`${t('opCrop')}: ${document.getElementById('crop-width').value || 'auto'}x${document.getElementById('crop-height').value || 'auto'}`);
                if (cMode === 'ratio') ops.push(`${t('opCrop')} ${document.getElementById('crop-ratio').value || '1:1'}`);
            }

            if (convertEnable.checked) {
                const fmt = document.getElementById('convert-format').value.toUpperCase();
                const ext = file.split('.').pop().toUpperCase();
                ops.push(`${t('opConvert')}: ${ext} → ${fmt}`);
            }

            previewText = ops.length > 0 ? ops.join(' | ') : t('noOpsSelected');
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

    fileCountSpan.textContent = t('filesFound')(orderedFiles.length);
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
    if (currentTab === 'tab-favicon') {
        executeFavicon();
    } else if (currentTab === 'tab-rename') {
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
        showToast(t('successToast')(result.successCount), 'success');

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
        showToast(t('errorToast')(result.errors.length), 'error');
    }
    processBtn.disabled = false;
}

function showToast(m, t) {
    toast.textContent = m;
    toast.className = `toast ${t}`;
    setTimeout(() => { toast.className = 'toast hidden'; }, 4000);
}

// ============================================================
// --- Favicon Generator Tab ---
// ============================================================
(function initFaviconTab() {
    let faviconLogoPath = null;
    window._faviconLogoReady = false;

    const logoZone = document.getElementById('favicon-logo-zone');
    const logoPreview = document.getElementById('favicon-logo-preview');
    const logoNameEl = document.getElementById('favicon-logo-name');
    const autoFolderEl = document.getElementById('favicon-auto-folder');
    const pickLogoBtn = document.getElementById('favicon-pick-logo');
    const appNameInput = document.getElementById('favicon-app-name');
    // Results live in the right-column panel
    const resultsDirEl = document.getElementById('favicon-results-dir');
    const resultsList = document.getElementById('favicon-results-list');
    const snippetEl = document.getElementById('favicon-snippet');

    /** Derive auto output folder path from logo path */
    function getOutputDir(logoPath) {
        const sep = logoPath.includes('\\') ? '\\' : '/';
        const dir = logoPath.substring(0, logoPath.lastIndexOf(sep));
        const file = logoPath.split(sep).pop();
        const base = file.replace(/\.[^.]+$/, '');
        return dir + sep + base + '-favicon';
    }

    function setLogo(filePath) {
        faviconLogoPath = filePath;
        window._faviconLogoReady = true;
        const name = filePath.split(/[\\/]/).pop();
        logoNameEl.textContent = name;
        logoPreview.innerHTML = `<img src="file://${filePath.replace(/\\/g, '/')}" alt="logo">`;
        autoFolderEl.textContent = '📂 → ' + getOutputDir(filePath).split(/[\\/]/).pop() + '/';
        if (currentTab === 'tab-favicon') processBtn.disabled = false;
    }

    async function pickLogo() {
        const p = await window.electronAPI.selectLogoFile();
        if (p) setLogo(p);
    }
    logoZone.addEventListener('click', (e) => { if (e.target !== pickLogoBtn) pickLogo(); });
    pickLogoBtn.addEventListener('click', (e) => { e.stopPropagation(); pickLogo(); });

    const FILE_INFO = {
        'favicon.ico': { icon: '🖼️', desc: '16+32+48px' },
        'favicon-16x16.png': { icon: '🔹', desc: '16×16' },
        'favicon-32x32.png': { icon: '🔹', desc: '32×32' },
        'favicon-48x48.png': { icon: '🔹', desc: '48×48' },
        'apple-touch-icon.png': { icon: '📱', desc: '180×180' },
        'android-chrome-192x192.png': { icon: '🤖', desc: '192×192' },
        'android-chrome-512x512.png': { icon: '🤖', desc: '512×512' },
        'site.webmanifest': { icon: '📋', desc: 'JSON' },
    };

    // Exposed globally so processBtn handler can call it
    window.executeFavicon = async function () {
        if (!faviconLogoPath) {
            showToast(currentLang === 'vi' ? '⚠️ Chưa chọn file logo!' : '⚠️ No logo selected!', 'error');
            return;
        }
        processBtn.disabled = true;
        const origText = processBtn.textContent;
        processBtn.textContent = '⏳...';
        // Clear table before generating
        resultsList.innerHTML = '';

        const outputDir = getOutputDir(faviconLogoPath);
        const result = await window.electronAPI.generateFavicon({
            logoPath: faviconLogoPath,
            outputDir,
            appName: appNameInput.value.trim() || 'My App',
            themeColor: '#ffffff',
        });

        // Render table rows
        resultsList.innerHTML = '';
        for (const name of result.results) {
            const info = FILE_INFO[name] || { icon: '📄', desc: '' };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${info.icon} ${name}</td>
                <td style="color:var(--text-dim);">${info.desc}</td>
                <td style="color:#4ade80;">✓</td>`;
            resultsList.appendChild(tr);
        }
        for (const { file, error } of result.errors) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>❌ ${file}</td>
                <td colspan="2" style="color:#f87171;font-size:0.75rem;">${error}</td>`;
            resultsList.appendChild(tr);
        }

        // Show folder path
        const folderName = outputDir.split(/[\\/]/).pop();
        resultsDirEl.textContent = folderName + '/';

        // HTML snippet
        snippetEl.textContent = [
            `<!-- Favicon Pack — Fast Image VIP PRO -->`,
            `<link rel="icon" type="image/x-icon" href="/favicon.ico">`,
            `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
            `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`,
            `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`,
            `<link rel="manifest" href="/site.webmanifest">`,
        ].join('\n');

        processBtn.disabled = false;
        processBtn.textContent = origText;

        if (result.errors.length === 0) {
            showToast(currentLang === 'vi'
                ? `✅ Tạo ${result.results.length} favicon files thành công!`
                : `✅ ${result.results.length} favicon files created!`, 'success');
        } else {
            showToast(`⚠️ ${result.errors.length} errors`, 'error');
        }
    }; // end executeFavicon
})(); // end initFaviconTab IIFE
