'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const electron_1 = require('electron');
electron_1.contextBridge.exposeInMainWorld('electron', {
    onboardingApi: {
        saveLibrary: data => {
            console.log('saveLibrary hit:', data);
            electron_1.ipcRenderer.send('save-library', data);
        },
        saveNetwork: data => {
            electron_1.ipcRenderer.send('save-network', data);
        },
        saveHistory: data => {
            electron_1.ipcRenderer.send('save-history', data);
        },
    },
    // send: (channel: Channel, data: any): void => {
    //     console.log('send channel hit:', channel, 'data:', data);
    //     const validChannels: Channel[] = ['save-json'];
    //     if (validChannels.includes(channel)) {
    //         ipcRenderer.send(channel, data);
    //     }
    // },
    // receive: (channel: Channel, func: (...args: any[]) => void): void => {
    //     const validChannels: Channel[] = ['save-json-success', 'save-json-failure'];
    //     if (validChannels.includes(channel)) {
    //         // Note: TypeScript may require specifying the event parameter type
    //         ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, ...args: any[]) => func(...args));
    //     }
    // },
});
//# sourceMappingURL=preload.js.map
