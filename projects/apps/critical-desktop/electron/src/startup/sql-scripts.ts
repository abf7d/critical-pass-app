import { de } from 'date-fns/locale';

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
export const scripts = [createProjectsTable, createNetworkTable, createHistoryTable];
