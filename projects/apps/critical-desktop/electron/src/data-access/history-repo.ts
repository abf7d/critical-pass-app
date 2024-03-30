import { TreeNode } from '@critical-pass/project/types';
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

    async saveHistory(projectId: number, history: TreeNode[]): Promise<void> {
        // Check if the project with this projectId already exists
        const checkExistSql = `SELECT COUNT(1) as count FROM History WHERE projectId = ?`;
        const countRow = await this.dbManager.runQuerySingle<{ count: number }>(checkExistSql, [projectId]);
        // if there is a project either update it or insert a new one
        if (countRow.count > 0) {
            // Update existing project
            const updateSql = `UPDATE History SET historyJson = ?, lastUpdated = CURRENT_TIMESTAMP WHERE projectId = ?`;
            await this.dbManager.runQuerySingle(updateSql, [JSON.stringify(history), projectId]);
        } else {
            const insertSql = `INSERT INTO History (projectId, historyJson, lastUpdated, createdAt) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
            await this.dbManager.runQuerySingle(insertSql, [projectId, JSON.stringify(history)]);
        }
        // Select the project with projectId from the Projects database, JSON.parse the projectJson column,
        // set project.profile.historyId, then stringify that project and update the projectJson column

        const getHistoryIdSql = `SELECT id FROM History WHERE projectId = ?`;
        const idRow = await this.dbManager.runQuerySingle<{ id: number }>(getHistoryIdSql, [projectId]);
        // Retrieve the project to update its projectJson column
        const selectProjectSql = `SELECT projectJson FROM Projects WHERE projectId = ?`;
        const projectRow = await this.dbManager.runQuerySingle<{ projectJson: string }>(selectProjectSql, [projectId]);
        if (projectRow && idRow) {
            const project = JSON.parse(projectRow.projectJson);
            // Assuming you have a way to determine the historyId to set, modify the project object here
            // For example, setting the historyId based on some logic
            project.profile.historyId = idRow.id; /* your logic to determine historyId */

            // Stringify the modified project and update the Projects table
            const updateProjectSql = `UPDATE Projects SET projectJson = ? WHERE projectId = ?`;
            await this.dbManager.runQuerySingle(updateProjectSql, [JSON.stringify(project), projectId]);
        }
    }

    async getHistory(projectId: number): Promise<TreeNode[]> {
        const sql = `
        SELECT historyJson FROM History WHERE projectId = ?
    `;
        try {
            const result = await this.dbManager.runQuerySingle<{ historyJson: string }>(sql, [projectId]);
            const projectData = JSON.parse(result.historyJson);
            return projectData;
        } catch (error) {
            console.error('Error fetching history:', error);
            throw error; // Rethrow or handle as needed
        }
    }

    async deleteHistory(projectId: number): Promise<void> {
        const sql = `DELETE FROM History WHERE projectId = ?`;
        await this.dbManager.runQuerySingle(sql, [projectId]);

        const selectProjectSql = `SELECT projectJson FROM Projects WHERE projectId = ?`;
        const projectRow = await this.dbManager.runQuerySingle<{ projectJson: string }>(selectProjectSql, [projectId]);
        if (projectRow) {
            const project = JSON.parse(projectRow.projectJson);
            // Assuming you have a way to determine the historyId to set, modify the project object here
            // For example, setting the historyId based on some logic
            project.profile.historyId = undefined; /* your logic to determine historyId */

            // Stringify the modified project and update the Projects table
            const updateProjectSql = `UPDATE Projects SET projectJson = ? WHERE projectId = ?`;
            await this.dbManager.runQuerySingle(updateProjectSql, [JSON.stringify(project), projectId]);
        }
    }
}

export default HistoryRepo;
