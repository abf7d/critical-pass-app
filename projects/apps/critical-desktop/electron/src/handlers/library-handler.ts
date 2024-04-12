// Import necessary dependencies, if any
import * as fs from 'fs';
import * as path from 'path';
import { App } from 'electron';
import LibraryRepo from '../data-access/library-repo';
import { LibraryPagePayload, LibraryPayload } from '../types/payloads';
import { Project } from '@critical-pass/project/types';
// export const libraryHandlers = {
//     //app needs to be imported from ipcHandlers.ts
//     saveData: (app: App) => (event: any, data: any) => {
//         try {
//             // Implementation of saving library data
//             // event.reply('save-library-success');

//             console.error('save library hit', data);
//             const filePath = path.join(app.getPath('userData'), 'yourfile.json');
//             console.log('file path tried', app.getPath('userData'));
//             try {
//                 fs.writeFileSync(filePath, JSON.stringify(data));
//                 // Optionally, you can send a confirmation back to the renderer process
//                 event.reply('save-json-success');
//             } catch (error) {
//                 console.error('Failed to save JSON', error);
//                 // Handle errors, e.g., by sending an error message back
//                 event.reply('save-json-failure', error);
//             }
//         } catch (error) {
//             console.error('Error saving library data:', error);
//             event.reply('save-library-failure', error);
//         }
//     },
//     // Other library-related handlers can go here
// };

export class LibraryHandler {
    constructor(private app: App) {
        console.log('LibraryHandler');
    }
    async saveLibrary(event: any, payload: LibraryPayload) {
        try {
            const libraryRepo = new LibraryRepo();
            console.log('LibraryRepo handler class');
            // networkRepo.addProject(project);
            console.log('LibraryRepo 2', libraryRepo);
            await libraryRepo.saveLibrary(payload);

            // Implementation of saving library data
            event.reply('save-library-success');
        } catch (error) {
            console.error('Error saving library data:', error);
            event.reply('save-library-failure', error);
        }
    }
    async getLibrary(event: any, payload: LibraryPagePayload) {
        try {
            console.log('LibraryRepo handler class');
            // networkRepo.addProject(project);
            const libraryRepo = new LibraryRepo();
            const library = await libraryRepo.getProjects(payload);

            // Implementation of saving library data
            event.reply('get-library-response', library);
        } catch (error) {
            console.error('Error getting library data:', error);
            event.reply('get-library-failure', error);
        }
    }

    async getProject(event: any, id: number) {
        try {
            console.log('LibraryRepo handler class');
            // networkRepo.addProject(project);
            const libraryRepo = new LibraryRepo();
            const project = await libraryRepo.getProject(id);
            console.log('project', project);
            // Implementation of saving library data
            event.reply('get-project-response', project);
        } catch (error) {
            console.error('Error getting library data:', error);
            event.reply('get-project-failure', error);
        }
    }
    async saveProject(event: any, id: number, project: Project) {
        let success = true;
        try {
            project.profile.id = id;
            const libraryRepo = new LibraryRepo();
            await libraryRepo.saveProject(project);
        } catch (error) {
            success = false;
            console.error('Error saving network data:', error);
            event.reply('save-project-failure', error);
        }
        event.reply('save-project-response', success);
    }
}
