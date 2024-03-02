import { ipcMain, App } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

// Define interfaces for your data as needed
interface SaveJsonData {
    // Example structure, adjust according to your actual data needs
    key: string;
    value: any;
}
console.log('ipcHandlers.ts');
export function setupFileOperationsListeners(app: App): void {
    ipcMain.on('save-json', (event, data: SaveJsonData) => {
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

    ipcMain.on('load-json', event => {
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
