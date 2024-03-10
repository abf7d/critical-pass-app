'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.projectHandlers = void 0;
const database_manager_1 = require('../util/database-manager');
const project_repo_1 = require('../data-access/project-repo');
const dbManager = database_manager_1.default.getInstance();
const projectRepo = new project_repo_1.default(dbManager);
exports.projectHandlers = {
    saveData: app => (event, project) => {
        try {
            projectRepo.addProject(project);
            // Implementation of saving library data
            event.reply('save-project-success');
        } catch (error) {
            console.error('Error saving project data:', error);
            event.reply('save-project-failure', error);
        }
    },
    // Other library-related handlers can go here
};
//# sourceMappingURL=project-handler.js.map
