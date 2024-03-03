import DatabaseManager from '../util/database-manager';
import ProjectService from '../data-access/project-repo';

class ProjectManager {
    private projectService: ProjectService;

    constructor() {
        const dbManager = new DatabaseManager('./mydatabase.db');
        this.projectService = new ProjectService(dbManager);
    }

    async addProject(project: any) {
        return this.projectService.addProject(project);
    }

    // Additional methods to orchestrate complex operations involving multiple services
}

export default new ProjectManager();
