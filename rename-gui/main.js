const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs-extra');

function createWindow() {
    const win = new BrowserWindow({
        width: 1050,
        height: 800,
        minWidth: 700,
        minHeight: 500,
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

ipcMain.handle('select-folder', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    if (canceled) return null;
    return filePaths[0];
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

ipcMain.handle('rename-files', async (event, { dirPath, fileMappings }) => {
    const res = { successCount: 0, errors: [] };
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
