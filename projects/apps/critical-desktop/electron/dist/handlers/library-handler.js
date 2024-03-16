'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LibraryHandler = exports.libraryHandlers = void 0;
// Import necessary dependencies, if any
const fs = require('fs');
const path = require('path');
const library_repo_1 = require('../data-access/library-repo');
exports.libraryHandlers = {
    //app needs to be imported from ipcHandlers.ts
    saveData: app => (event, data) => {
        try {
            // Implementation of saving library data
            // event.reply('save-library-success');
            console.error('save library hit', data);
            const filePath = path.join(app.getPath('userData'), 'yourfile.json');
            console.log('file path tried', app.getPath('userData'));
            try {
                fs.writeFileSync(filePath, JSON.stringify(data));
                // Optionally, you can send a confirmation back to the renderer process
                event.reply('save-json-success');
            } catch (error) {
                console.error('Failed to save JSON', error);
                // Handle errors, e.g., by sending an error message back
                event.reply('save-json-failure', error);
            }
        } catch (error) {
            console.error('Error saving library data:', error);
            event.reply('save-library-failure', error);
        }
    },
    // Other library-related handlers can go here
};
class LibraryHandler {
    constructor(app) {
        this.app = app;
        this.networkRepo = new library_repo_1.default();
        console.log('LibraryHandler');
    }
    saveData(event, project) {
        try {
            console.log('LibraryRepo handler class');
            // networkRepo.addProject(project);
            // Implementation of saving library data
            event.reply('save-library-success');
        } catch (error) {
            console.error('Error saving library data:', error);
            event.reply('save-library-failure', error);
        }
    }
}
exports.LibraryHandler = LibraryHandler;
//# sourceMappingURL=library-handler.js.map
