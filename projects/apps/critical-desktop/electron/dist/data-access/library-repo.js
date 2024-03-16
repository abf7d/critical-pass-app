'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const database_manager_1 = require('../util/database-manager'); // Adjust the import path as necessary
class LibraryRepo {
    constructor() {
        this.dbManager = database_manager_1.default.getInstance();
    }
    addLibrary(project) {
        const sql = `INSERT INTO projects (name, description) VALUES (?, ?)`;
        return this.dbManager.runQuery(sql, [project.name, project.description]);
    }
}
exports.default = LibraryRepo;
//# sourceMappingURL=library-repo.js.map
