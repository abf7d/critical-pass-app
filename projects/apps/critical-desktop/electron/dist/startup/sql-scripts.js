'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.scripts = void 0;
const createProjectsTable = `
    CREATE TABLE IF NOT EXISTS Projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectId INTEGER,
        projectJson TEXT,
        lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;
const createNetworkTable = `
    CREATE TABLE IF NOT EXISTS Projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectId INTEGER,
        networkJson TEXT,
        lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;
const createHistoryTable = `
    CREATE TABLE IF NOT EXISTS Projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectId INTEGER,
        historyJson TEXT,
        lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;
exports.scripts = [createProjectsTable, createNetworkTable, createHistoryTable];
//# sourceMappingURL=sql-scripts.js.map
