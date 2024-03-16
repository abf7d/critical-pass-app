import DatabaseManager from '../util/database-manager'; // Adjust the import path as necessary
// Assuming a basic structure for the Project type
interface Project {
    name: string;
    description: string;
}

class ProjectRepo {
    private dbManager: DatabaseManager;

    constructor() {
        this.dbManager = DatabaseManager.getInstance();
    }

    addProject(project: Project): Promise<{ id: number }> {
        const sql = `INSERT INTO projects (name, description) VALUES (?, ?)`;
        return this.dbManager.runQuery(sql, [project.name, project.description]);
    }

    // More methods for handling project data (update, delete, get, etc.)
}

export default ProjectRepo;
