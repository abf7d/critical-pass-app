'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const electron_1 = require('electron');
electron_1.contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        console.log('send channel hit:', channel, 'data:', data);
        const validChannels = ['save-json'];
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        const validChannels = ['save-json-success', 'save-json-failure'];
        if (validChannels.includes(channel)) {
            // Note: TypeScript may require specifying the event parameter type
            electron_1.ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
});
//# sourceMappingURL=preload.js.map
