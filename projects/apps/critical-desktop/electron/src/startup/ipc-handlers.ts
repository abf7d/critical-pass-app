import { ipcMain, App } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
// import projectManager from './managers/project-manager';

// Define interfaces for your data as needed
interface SaveJsonData {
    // Example structure, adjust according to your actual data needs
    key: string;
    value: any;
}
console.log('ipcHandlers.ts');

import { LibraryHandler } from '../handlers/library-handler';
import { NetworkHandler } from '../handlers/network-handler';
import { HistoryHandler } from '../handlers/history-handler';
import { ProjectHandler } from '../handlers/project-handler';

export function setupFileOperationsListeners(app: App): void {
    console.log('file path tried', app.getPath('userData'));
    const ipcHandlers = {
        'save-project': new ProjectHandler(app).saveData,
        'get-project': new LibraryHandler(app).getProject,
        'save-library': new LibraryHandler(app).saveLibrary, //libraryHandlers.saveData(app),
        'get-library': new LibraryHandler(app).getLibrary, // libraryHandlers.getLibrary(app),
        'save-network': new NetworkHandler(app).saveData, // networkHandlers.saveData(app),
        'save-history': new HistoryHandler(app).saveHistory, // historyHandlers.saveData(app),
        'get-history': new HistoryHandler(app).getHistory,
        'delete-history': new HistoryHandler(app).deleteHistory,
        // Add more handlers as needed
    };

    // Setup IPC listeners for each handler
    Object.entries(ipcHandlers).forEach(([channel, handler]) => {
        ipcMain.on(channel, handler);
    });
}

// export function setupFileOperationsListeners(app: App): void {
//     console.log('setupFileOperationsListeners');
//     console.log('file path tried', app.getPath('userData'));
//     ipcMain.on('save-json', (event, data: SaveJsonData) => {
//         console.error('try this final save-json hit', data);
//         const filePath = path.join(app.getPath('userData'), 'yourfile.json');
//         try {
//             fs.writeFileSync(filePath, JSON.stringify(data));
//             // Optionally, you can send a confirmation back to the renderer process
//             event.reply('save-json-success');
//         } catch (error) {
//             console.error('Failed to save JSON', error);
//             // Handle errors, e.g., by sending an error message back
//             event.reply('save-json-failure', error);
//         }
//     });

//     ipcMain.on('save-project', async (event, project) => {
//         console.error('save-project', project);
//         try {
//             const result = await projectManager.addProject(project);
//             event.reply('add-project-response', result);
//         } catch (error) {
//             console.error('Failed to save JSON', error);
//             event.reply('save-project-failure', error);
//         }
//     });

//     ipcMain.on('load-json', event => {
//         const filePath = path.join(app.getPath('userData'), 'yourfile.json');
//         try {
//             const data = fs.readFileSync(filePath, 'utf8');
//             event.reply('json-loaded', JSON.parse(data));
//         } catch (error) {
//             console.error('Failed to load JSON', error);
//             // Handle file read errors
//             event.reply('load-json-failure', error);
//         } //test
//     });

//     // Add more listeners as needed
// }
