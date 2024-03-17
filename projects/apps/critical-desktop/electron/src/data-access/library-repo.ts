import { Project, ProjectLibrary } from '@critical-pass/project/types';
import { LibraryPagePayload, LibraryPayload } from '../types/payloads';
import DatabaseManager from '../util/database-manager';

class LibraryRepo {
    private dbManager: DatabaseManager;

    constructor() {
        this.dbManager = DatabaseManager.getInstance();
    }
    async saveProject(project: Project): Promise<{ id: number }> {
        const maxProjectIdSql = `SELECT MAX(projectId) as maxProjectId FROM Projects`;
        const maxProjectId = await this.dbManager.runQuerySingle<number>(maxProjectIdSql);
        const nextProjectId = maxProjectId + 1;

        // Check if the project with this projectId already exists
        const checkExistSql = `SELECT COUNT(1) as count FROM Projects WHERE projectId = ?`;
        let count = 0;
        if (project.profile.id !== null) {
            count = await this.dbManager.runQuerySingle<number>(checkExistSql, [project.profile.id]);
        }
        // if there is a project either update it or insert a new one
        if (count > 0) {
            // Update existing project
            const updateSql = `UPDATE Projects SET projectJson = ?, lastUpdated = CURRENT_TIMESTAMP WHERE projectId = ?`;
            await this.dbManager.runQuerySingle(updateSql, [JSON.stringify(project), project.profile.id]);
        } else {
            // if there is no project and it has an id, use it or do I create a new id? maybe create a new id. (network and history can't have a new id because other projects depend on them.)
            // Insert new project
            if (project.profile.id === null) {
                project.profile.id = nextProjectId;
            }
            const insertSql = `INSERT INTO Projects (projectId, projectJson, lastUpdated, createdAt) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
            await this.dbManager.runQuerySingle(insertSql, [project.profile.id, JSON.stringify(project)]);
        }
        return { id: project.profile.id };
    }
    async saveLibrary(libraryPayload: LibraryPayload): Promise<void> {
        console.log('Repo LIbrary class');
        if (!libraryPayload.append) {
            const truncateTableSql = `DELETE FROM Projects`;
            await this.dbManager.runQuerySingle(truncateTableSql);
            // Optionally reset the autoincrement value of projectId, if desired
            // Note: This step might depend on your specific DB schema and needs
            // await this.dbManager.runQuery(`DELETE FROM sqlite_sequence WHERE name='Projects'`);
        }

        // Fetch the highest projectId in the table
        const maxProjectIdSql = `SELECT MAX(projectId) as maxProjectId FROM Projects`;
        const maxProjectId = await this.dbManager.runQuerySingle<number>(maxProjectIdSql);
        let nextProjectId = maxProjectId + 1;

        for (const project of libraryPayload.projects) {
            // Check if the project with this projectId already exists
            const checkExistSql = `SELECT COUNT(1) as count FROM Projects WHERE projectId = ?`;
            let count = 0;
            if (project.profile.id !== null) {
                const countResult = await this.dbManager
                    .runQuerySingle<number>(checkExistSql, [project.profile.id])
                    .then(result => (result ? { count: result } : { count: 0 }));
                count = countResult.count;
            }
            // if there is a project either update it or insert a new one
            if (count > 0) {
                // Update existing project
                const updateSql = `UPDATE Projects SET projectJson = ?, lastUpdated = CURRENT_TIMESTAMP WHERE projectId = ?`;
                await this.dbManager.runQuerySingle(updateSql, [JSON.stringify(project), project.profile.id]);
            } else {
                // if there is no project and it has an id, use it or do I create a new id? maybe create a new id. (network and history can't have a new id because other projects depend on them.)
                // Insert new project
                if (project.profile.id === null) {
                    project.profile.id = nextProjectId;
                }
                const insertSql = `INSERT INTO Projects (projectId, projectJson, lastUpdated, createdAt) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
                await this.dbManager.runQuerySingle(insertSql, [project.profile.id, JSON.stringify(project)]);
            }

            nextProjectId++; // Increment for the next project
        }
    }

    /**
     * Gets a project by its id.
     *
     * @param projectId The id of the project to fetch.
     * @returns A promise that resolves to an array of projects.
     */
    async getProject(projectId: number): Promise<Project[]> {
        const sql = `
            SELECT projectJson FROM Projects WHERE projectId = ?
        `;
        try {
            const projectJson = await this.dbManager.runQuerySingle<string>(sql, [projectId]);
            const projectData = JSON.parse(projectJson);
            return projectData;
        } catch (error) {
            console.error('Error fetching project:', error);
            throw error; // Rethrow or handle as needed
        }
    }

    /**
     * Gets a specified number of projects starting at an offset, ordered by lastUpdated timestamp.
     *
     * @param limit The number of projects to fetch.
     * @param offset The offset from which to start fetching projects.
     * @returns A promise that resolves to an array of projects.
     */
    async getProjects(payload: LibraryPagePayload): Promise<ProjectLibrary> {
        let sql = `SELECT projectJson FROM Projects`;

        // Incorporate search functionality if a search term and property path are provided
        if (payload.searchValue && payload.searchProperty) {
            const searchPath = payload.searchProperty.split('.').join(', '); // Convert dot notation to comma-separated for json_extract
            sql += ` WHERE json_extract(projectJson, '$.${searchPath}') LIKE '%' || ? || '%'`;
        }

        // Add dynamic ordering based on a nested JSON property
        if (payload.sortProperty) {
            const sortPath = payload.sortProperty.split('.').join(', '); // Convert dot notation for sorting
            sql += ` ORDER BY json_extract(projectJson, '$.${sortPath}') ${payload.order}`;
        } else {
            // Default ordering
            sql += ` ORDER BY lastUpdated ${payload.order}`;
        }

        // Pagination
        sql += ` LIMIT ? OFFSET ?`;

        try {
            const params = [];

            // Add search value if applicable
            if (payload.searchValue && payload.searchProperty) {
                params.push(payload.searchValue);
            }

            // Add limit and offset
            params.push(payload.limit, payload.offset);

            const projectsRows = await this.dbManager.runQueryMulti<{ projectJson: string }>(sql, params);
            const projects = projectsRows.map(row => JSON.parse(row.projectJson));
            const totalCount = await this.dbManager.runQuerySingle<number>(`SELECT COUNT(*) as count FROM Projects`).then(result => result ?? 0);
            return {
                items: projects,
                totalCount,
            };
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }

    // More methods for handling project data (update, delete, get, etc.)
}

export default LibraryRepo;
