const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    selectFiles: () => ipcRenderer.invoke('select-files'),
    listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath),
    checkPath: (p) => ipcRenderer.invoke('check-path', p),
    renameFiles: (data) => ipcRenderer.invoke('rename-files', data),
    getImageMetadata: (filePath) => ipcRenderer.invoke('get-image-metadata', filePath)
});
