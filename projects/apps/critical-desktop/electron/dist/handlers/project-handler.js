'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProjectHandler = void 0;
const project_repo_1 = require('../data-access/project-repo');
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
            event.reply('save-project-success');
        } catch (error) {
            console.error('Error saving project data:', error);
            event.reply('save-project-failure', error);
        }
    }
}
exports.ProjectHandler = ProjectHandler;
//# sourceMappingURL=project-handler.js.map
