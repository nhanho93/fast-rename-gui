# Changelog — Fast Image Siêu Cấp VIP PRO

All notable changes to this project are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.6.0] — 2026-03-04

### ✨ New Features

#### 🌐 Favicon SEO Pack
- Automatic generator that structuring a web-ready favicon pack directly from your logo, including WebP/PNG formats and `.ico`.
- Automatic output structured folder: `[logo-name]-favicon/`.

#### 🌍 Bilingual UI (VI / EN)
- Support full English and Vietnamese translations for the entire GUI, including tooltips and modals.
- Language preference is automatically persisted across sessions in `localStorage`.

### 🔧 Improvements

#### UX & Interface
- **Smart Auto-Collapse Changelog** — Release notes now use native HTML5 `<details>` and `<summary>` to automatically collapse older version notes keeping the UI clean.
- **Font Support** — Replaced Google Font `Outfit` with `Be Vietnam Pro` to correctly render Vietnamese diacritics.

### 🐛 Bug Fixes
- Fixed Tooltips (`data-info`) overflowing past the screen boundaries by implementing smart JS-based bounding rect checks.
- Fixed the Changelog modal being cut off (overflow text) by adding proper CSS flex `min-height` boundary logic.

---

## [1.5.0] — 2026-03-04

### ✨ New Features

#### 🖼️ Image Processing Tab (Brand New Module)
- **Integrated Image Processor** powered by `sharp` — resize, crop, and convert images directly inside the app without any external tools.
- **Resize** — resize images by exact pixel dimensions (W × H) or by percentage scale. Enforces `withoutEnlargement` so small images are never upscaled.
- **Crop** — crop images to exact pixel dimensions or a custom aspect ratio (e.g. `16:9`, `1:1`, `4:3`). Supports gravity control: Center / North / Smart Entropy.
- **Format Conversion** — convert between JPG, PNG, WebP, and AVIF in one click. Applies correct quality settings per format automatically.
- **Quality Control** — choose between Auto quality (format defaults) or Manual quality (set 1–100).
- **Keep Original Toggle** — output a new suffixed file (e.g. `photo_1920x1080.webp`) while keeping the original untouched.
- **Live Operations Preview** — the preview table shows a plain-English summary of pending operations per file (e.g. `Resize: 1920x1080 | Convert: JPG → WEBP`) before committing.
- **Image Metadata Display** — original file dimensions (W × H) are shown beneath each filename in the Image tab preview.

#### 🗂️ Multi-File Selection Mode
- Added **"Select Files"** button alongside the existing folder picker — users can now select individual files (instead of the entire folder) via the native OS dialog.
- File dialog pre-filters for **Common Images**, **RAW/Camera formats** (HEIC, DNG, CR2, NEF, ARW, etc.) and **All Files**.
- After processing in file-selection mode, the file list updates in-place (no full folder reload) to avoid losing the custom selection.

#### 🔢 Numbering Position Control
- Added **Prefix / Suffix** position selector for the auto-numbering feature — choose whether the sequence number appears at the start or end of the filename.

#### 🎨 Theme System
- **Auto theme** mode added alongside Dark / Light — automatically follows the OS light/dark preference and re-applies when the system theme changes at runtime.
- Theme preference is persisted across sessions via `localStorage`.

### 🔧 Improvements

#### UX & Interface
- **Custom Dropdown Portal** — all `<select>` elements replaced with custom-built dropdowns that render into a `body`-level portal, fixing overflow/clipping issues inside panel containers.
- **Smart Dropdown Flip** — dropdowns automatically flip upward when there is not enough space below, preventing off-screen rendering.
- **Sub-Tab Management** — image tab now has inner sub-tabs (Resize / Crop / Quality / Convert) with explicit `active` class syncing to prevent inconsistent state.
- **Per-row Remove Button** — added "✕" button on every preview row so individual files can be removed from the processing queue without clearing the entire list.
- **Dynamic Table Header** — the third preview column header changes between "Rename" and "New Config" depending on which tab is active.
- **Tooltip Safety** — multiple layered cleanup listeners (`mouseleave`, `mouseout`, `scroll`, global `mouseover`) to prevent ghost tooltips persisting on screen.

#### Rename Engine
- Conflict resolution now uses a loop-based approach to guarantee unique names even when more than two files collide to the same output name.
- Space-to-hyphen normalization now also strips non-alphanumeric characters and collapses multiple consecutive hyphens.
- Extension field normalizes output to lowercase and auto-adds leading dot if omitted.

#### Image Processing Engine
- Resize and Crop operations compose correctly in a single `sharp` pipeline (no double-decode).
- Temporary output files use a `temp_vip_{timestamp}_{name}` pattern to prevent collision in concurrent runs.
- Temp file cleanup on error — if the pipeline throws, any partial temp file is removed automatically.

#### Performance
- `fetchImageMetadata()` runs all `sharp.metadata()` calls in parallel via `Promise.all`, keeping the UI responsive even with large image folders.
- Metadata is cached in `imageMetadataCache` per filename — repeated tab switches do not re-read disk.

### 🐛 Bug Fixes
- Fixed dropdown menu clipping when the parent container has `overflow: hidden`.
- Fixed numbering index applying `position` from a stale `hiddenInput` reference.
- Fixed image mode preview not refreshing when switching back to the Image tab after metadata finishes loading.
- Fixed file list not updating correctly after format conversion in file-selection mode.

### 📦 Build & Distribution
- Upgraded to **Electron 40.6.1**.
- Upgraded to **electron-builder 26.8.1**.
- Added **SortableJS 1.15.7** for drag-to-reorder rows in the preview table.
- Added **sharp 0.34.5** as production dependency for image processing.
- Added **fs-extra 11.3.0** replacing native `fs` for safer file operations.
- Build output configured as **Windows Portable** (single `.exe`, no install required).
- Build compression set to `maximum` with `asar: true` for smallest possible bundle.

---

## [1.0.0] — 2026-02-25

### 🎉 Initial Release

- Core file renaming engine with live preview table.
- Options: Lowercase, Remove Vietnamese Accents, Space → Hyphen.
- Prefix / Suffix / Extension override fields.
- Auto-numbering with configurable start, padding, and separator.
- Conflict detection modal with auto-resolve option.
- Drag-to-reorder files in preview.
- Dark / Light theme toggle.
- Folder picker via native OS dialog.
- Windows Portable `.exe` build (~86 MB).
