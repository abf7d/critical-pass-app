import { App } from 'electron';
import DatabaseManager from '../util/database-manager'; // Adjust the import path as necessary
import { scripts } from './sql-scripts';

export function initDatabase(app: App): boolean {
    const userDataPath = app.getPath('userData');
    const databasePath = `${userDataPath}/critical-pass.db`; // Constructs the full path to the database file
    console.log('databasePath', databasePath);
    const dbManager = DatabaseManager.getInstance(databasePath);
    try {
        for (const script of scripts) {
            dbManager.runQueryMulti(script);
        }
        return true;
    } catch (error) {
        console.error('init database error', error);
        return false;
    }
}
