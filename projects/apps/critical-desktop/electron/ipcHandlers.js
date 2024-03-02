'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.setupFileOperationsListeners = void 0;
const electron_1 = require('electron');
const fs = require('fs');
const path = require('path');
console.log('ipcHandlers.ts');
function setupFileOperationsListeners(app) {
    electron_1.ipcMain.on('save-json', (event, data) => {
        const filePath = path.join(app.getPath('userData'), 'yourfile.json');
        try {
            fs.writeFileSync(filePath, JSON.stringify(data));
            // Optionally, you can send a confirmation back to the renderer process
            event.reply('save-json-success');
        } catch (error) {
            console.error('Failed to save JSON', error);
            // Handle errors, e.g., by sending an error message back
            event.reply('save-json-failure', error);
        }
    });
    electron_1.ipcMain.on('load-json', event => {
        const filePath = path.join(app.getPath('userData'), 'yourfile.json');
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            event.reply('json-loaded', JSON.parse(data));
        } catch (error) {
            console.error('Failed to load JSON', error);
            // Handle file read errors
            event.reply('load-json-failure', error);
        } //test
    });
    // Add more listeners as needed
}
exports.setupFileOperationsListeners = setupFileOperationsListeners;
//# sourceMappingURL=ipcHandlers.js.map
