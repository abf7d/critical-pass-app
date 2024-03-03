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
const database_manager_1 = require('../util/database-manager');
const project_repo_1 = require('../data-access/project-repo');
class ProjectManager {
    constructor() {
        const dbManager = new database_manager_1.default('./mydatabase.db');
        this.projectService = new project_repo_1.default(dbManager);
    }
    addProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.projectService.addProject(project);
        });
    }
}
exports.default = new ProjectManager();
//# sourceMappingURL=project-manager.js.map
