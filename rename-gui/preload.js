const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath),
    renameFiles: (data) => ipcRenderer.invoke('rename-files', data)
});
