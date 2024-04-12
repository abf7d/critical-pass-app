import { contextBridge, ipcRenderer } from 'electron';
import { LibraryPagePayload, LibraryPayload } from './types/payloads';
import { Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';

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
        saveNetwork: (projectId: number, network: Project[], callback: (data: Project[]) => any): void => {
            console.log('saveNetwork hit:', projectId);
            ipcRenderer.send('save-network', projectId, network);
            ipcRenderer.once('save-network-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
        },
        saveProject: (projectId: number, project: Project, callback: (success: boolean) => any): void => {
            console.log('saveNetwork hit:', projectId);
            ipcRenderer.send('save-project', projectId, project);
            ipcRenderer.once('save-project-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
        },
        deleteNetwork: (projectId: number): void => {
            ipcRenderer.send('delete-network', projectId);
        },
        getNetwork: (projectId: number, callback: (data: Project[]) => any): void => {
            ipcRenderer.send('get-network', projectId);
            ipcRenderer.once('get-network-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
        },
        saveHistory: (projectId: number, history: TreeNode[], callback: (data: TreeNode[]) => any): void => {
            ipcRenderer.send('save-history', projectId, history);
            ipcRenderer.once('save-history-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
        },
        deleteHistory: (projectId: number): void => {
            ipcRenderer.send('delete-history', projectId);
        },
        getHistory: (projectId: number, callback: (data: TreeNode[]) => any): void => {
            ipcRenderer.send('get-history', projectId);
            ipcRenderer.once('get-history-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
        },
        getProject: (id: number, callback: (data: Project | null) => any): void => {
            ipcRenderer.send('get-project', id);
            ipcRenderer.once('get-project-response', (event, response) => {
                callback(response); // Invoke callback with the response data
            });
        },
    },
});
