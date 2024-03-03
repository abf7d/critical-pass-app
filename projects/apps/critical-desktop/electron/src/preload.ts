import { contextBridge, ipcRenderer } from 'electron';

// Define a type for the data parameter if necessary
// For example, if the data is always an object, you might use:
// type Data = Record<string, unknown>;
// If it's more specific, adjust the type accordingly.

type Channel = 'save-json' | 'save-json-success' | 'save-json-failure';

contextBridge.exposeInMainWorld('electron', {
    send: (channel: Channel, data: any): void => {
        console.log('send channel hit:', channel, 'data:', data);
        const validChannels: Channel[] = ['save-json'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel: Channel, func: (...args: any[]) => void): void => {
        const validChannels: Channel[] = ['save-json-success', 'save-json-failure'];
        if (validChannels.includes(channel)) {
            // Note: TypeScript may require specifying the event parameter type
            ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, ...args: any[]) => func(...args));
        }
    },
});
