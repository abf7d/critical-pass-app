import { contextBridge, ipcRenderer } from 'electron';
import { LibraryPagePayload, LibraryPayload } from './types/payloads';
import { Project, ProjectLibrary } from '@critical-pass/project/types';

// Define a type for the data parameter if necessary
// For example, if the data is always an object, you might use:
// type Data = Record<string, unknown>;
// If it's more specific, adjust the type accordingly.

type Channel = 'save-json' | 'save-json-success' | 'save-json-failure';

contextBridge.exposeInMainWorld('electron', {
    onboardingApi: {
        saveLibrary: (data: LibraryPayload): void => {
            console.log('saveLibrary hit:', data);
            ipcRenderer.send('save-library', data);
        },
        getLibrary: (data: LibraryPagePayload, callback: (data: ProjectLibrary) => any): void => {
            ipcRenderer.send('get-library', data);
            ipcRenderer.once('get-library-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
        },
        saveNetwork: (data: any): void => {
            ipcRenderer.send('save-network', data);
        },
        saveHistory: (data: any): void => {
            ipcRenderer.send('save-history', data);
        },
        getProject: (id: number, callback: (data: Project) => any): void => {
            ipcRenderer.send('get-project', id);
            ipcRenderer.once('get-project-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
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
