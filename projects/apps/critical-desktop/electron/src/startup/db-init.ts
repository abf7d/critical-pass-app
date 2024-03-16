import DatabaseManager from '../util/database-manager'; // Adjust the import path as necessary
import { scripts } from './sql-scripts';

export function initDatabase(): boolean {
    const dbManager = DatabaseManager.getInstance();
    try {
        for (const script of scripts) {
            dbManager.runQuery(script);
        }
        return true;
    } catch (error) {
        console.error('init database error', error);
        return false;
    }
}
