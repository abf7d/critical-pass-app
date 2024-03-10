// Import necessary dependencies, if any
import * as fs from 'fs';
import * as path from 'path';
import { App } from 'electron';
export const libraryHandlers = {
    //app needs to be imported from ipcHandlers.ts
    saveData: (app: App) => (event: any, data: any) => {
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
