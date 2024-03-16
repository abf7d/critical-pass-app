'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.setupFileOperationsListeners = void 0;
const electron_1 = require('electron');
console.log('ipcHandlers.ts');
const library_handler_1 = require('../handlers/library-handler');
const network_handler_1 = require('../handlers/network-handler');
const history_handler_1 = require('../handlers/history-handler');
const project_handler_1 = require('../handlers/project-handler');
function setupFileOperationsListeners(app) {
    console.log('file path tried', app.getPath('userData'));
    const ipcHandlers = {
        'save-project': new project_handler_1.ProjectHandler(app).saveData,
        'save-library': new library_handler_1.LibraryHandler(app).saveData,
        'save-network': new network_handler_1.NetworkHandler(app).saveData,
        'save-history': new history_handler_1.HistoryHandler(app).saveData, // historyHandlers.saveData(app),
        // Add more handlers as needed
    };
    // Setup IPC listeners for each handler
    Object.entries(ipcHandlers).forEach(([channel, handler]) => {
        electron_1.ipcMain.on(channel, handler);
    });
}
exports.setupFileOperationsListeners = setupFileOperationsListeners;
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
//# sourceMappingURL=ipc-handlers.js.map
