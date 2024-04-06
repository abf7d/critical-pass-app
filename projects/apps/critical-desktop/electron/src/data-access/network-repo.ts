import { Project } from '@critical-pass/project/types';
import DatabaseManager from '../util/database-manager'; // Adjust the import path as necessary
// Assuming a basic structure for the Project type

class NetworkRepo {
    private dbManager: DatabaseManager;

    constructor() {
        this.dbManager = DatabaseManager.getInstance();
    }

    async saveNetwork(projectId: number, network: Project[]): Promise<void> {
        // Check if the project with this projectId already exists
        const checkExistSql = `SELECT COUNT(1) as count FROM Network WHERE projectId = ?`;
        const countRow = await this.dbManager.runQuerySingle<{ count: number }>(checkExistSql, [projectId]);
        // if there is a project either update it or insert a new one
        if (countRow.count > 0) {
            // Update existing project
            const updateSql = `UPDATE Network SET networkJson = ?, lastUpdated = CURRENT_TIMESTAMP WHERE projectId = ?`;
            await this.dbManager.runQuerySingle(updateSql, [JSON.stringify(network), projectId]);
        } else {
            const insertSql = `INSERT INTO Network (projectId, networkJson, lastUpdated, createdAt) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
            await this.dbManager.runQuerySingle(insertSql, [projectId, JSON.stringify(network)]);
        }

        // Select the project with projectId from the Projects database, JSON.parse the projectJson column,
        // set project.profile.networkId, then stringify that project and update the projectJson column
        const getnetworkIdSql = `SELECT id FROM Network WHERE projectId = ?`;
        const idRow = await this.dbManager.runQuerySingle<{ id: number }>(getnetworkIdSql, [projectId]);
        // Retrieve the project to update its projectJson column
        const selectProjectSql = `SELECT projectJson FROM Projects WHERE projectId = ?`;
        const projectRow = await this.dbManager.runQuerySingle<{ projectJson: string }>(selectProjectSql, [projectId]);
        if (projectRow && idRow) {
            const project = JSON.parse(projectRow.projectJson);
            // Assuming you have a way to determine the networkId to set, modify the project object here
            // For example, setting the networkId based on some logic
            project.profile.networkId = idRow.id; /* your logic to determine networkId */

            // Stringify the modified project and update the Projects table
            const updateProjectSql = `UPDATE Projects SET projectJson = ? WHERE projectId = ?`;
            await this.dbManager.runQuerySingle(updateProjectSql, [JSON.stringify(project), projectId]);
        }
    }

    async getNetwork(projectId: number): Promise<Project[]> {
        const sql = `
        SELECT networkJson FROM Network WHERE projectId = ?
    `;
        try {
            const result = await this.dbManager.runQuerySingle<{ networkJson: string }>(sql, [projectId]);

            const projectData = result?.networkJson ? JSON.parse(result.networkJson) : [];
            return projectData;
        } catch (error) {
            console.error('Error fetching network:', error);
            throw error; // Rethrow or handle as needed
        }
    }

    async deleteNetwork(projectId: number): Promise<void> {
        const sql = `DELETE FROM Network WHERE projectId = ?`;
        await this.dbManager.runQuerySingle(sql, [projectId]);

        const selectProjectSql = `SELECT projectJson FROM Projects WHERE projectId = ?`;
        const projectRow = await this.dbManager.runQuerySingle<{ projectJson: string }>(selectProjectSql, [projectId]);
        if (projectRow) {
            const project = JSON.parse(projectRow.projectJson);
            // Assuming you have a way to determine the networkId to set, modify the project object here
            // For example, setting the networkId based on some logic
            project.profile.networkId = undefined;

            // Stringify the modified project and update the Projects table
            const updateProjectSql = `UPDATE Projects SET projectJson = ? WHERE projectId = ?`;
            await this.dbManager.runQuerySingle(updateProjectSql, [JSON.stringify(project), projectId]);
        }
    }
}

export default NetworkRepo;
