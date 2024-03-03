'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.setupFileOperationsListeners = void 0;
const electron_1 = require('electron');
const fs = require('fs');
const path = require('path');
const project_manager_1 = require('./managers/project-manager');
console.log('ipcHandlers.ts');
function setupFileOperationsListeners(app) {
    console.log('setupFileOperationsListeners');
    console.log('file path tried', app.getPath('userData'));
    electron_1.ipcMain.on('save-json', (event, data) => {
        console.error('try this final save-json hit', data);
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
    electron_1.ipcMain.on('save-project', (event, project) =>
        __awaiter(this, void 0, void 0, function* () {
            console.error('save-project', project);
            try {
                const result = yield project_manager_1.default.addProject(project);
                event.reply('add-project-response', result);
            } catch (error) {
                console.error('Failed to save JSON', error);
                event.reply('save-project-failure', error);
            }
        }),
    );
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
