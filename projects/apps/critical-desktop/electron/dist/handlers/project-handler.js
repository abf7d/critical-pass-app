'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProjectHandler = void 0;
// import DatabaseManager from '../util/database-manager';
const project_repo_1 = require('../data-access/project-repo');
// // const dbManager = DatabaseManager.getInstance();
// const projectRepo = new ProjectRepo();
// export const projectHandlers = {
//     saveData: (app: App) => (event: any, project: any) => {
//         try {
//             projectRepo.addProject(project);
//             // Implementation of saving library data
//             event.reply('save-project-success');
//         } catch (error) {
//             console.error('Error saving project data:', error);
//             event.reply('save-project-failure', error);
//         }
//     },
//     // Other library-related handlers can go here
// };
class ProjectHandler {
    constructor(app) {
        this.app = app;
        this.projectRepo = new project_repo_1.default();
        console.log('ProjectHandler');
    }
    saveData(event, project) {
        try {
            console.log('project handler class');
            // projectRepo.addProject(project);
            // Implementation of saving library data
            event.reply('save-project-success');
        } catch (error) {
            console.error('Error saving project data:', error);
            event.reply('save-project-failure', error);
        }
    }
}
exports.ProjectHandler = ProjectHandler;
//# sourceMappingURL=project-handler.js.map
