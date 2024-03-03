'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class ProjectService {
    constructor(databaseManager) {
        this.dbManager = databaseManager;
    }
    addProject(project) {
        const sql = `INSERT INTO projects (name, description) VALUES (?, ?)`;
        return this.dbManager.runQuery(sql, [project.name, project.description]);
    }
}
exports.default = ProjectService;
//# sourceMappingURL=project-repo.js.map
