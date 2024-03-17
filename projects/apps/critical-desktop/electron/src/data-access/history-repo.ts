import DatabaseManager from '../util/database-manager'; // Adjust the import path as necessary
// Assuming a basic structure for the Project type
interface Project {
    name: string;
    description: string;
}

class HistoryRepo {
    private dbManager: DatabaseManager;

    constructor() {
        this.dbManager = DatabaseManager.getInstance();
    }

    addHistory(project: Project): Promise<{ id: number }> {
        const sql = `INSERT INTO projects (name, description) VALUES (?, ?)`;
        return this.dbManager.runQuerySingle(sql, [project.name, project.description]);
    }
}

export default HistoryRepo;
