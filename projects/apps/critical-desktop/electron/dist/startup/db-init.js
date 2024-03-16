'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.initDatabase = void 0;
const database_manager_1 = require('../util/database-manager'); // Adjust the import path as necessary
const sql_scripts_1 = require('./sql-scripts');
function initDatabase(app) {
    const userDataPath = app.getPath('userData');
    const databasePath = `${userDataPath}/critical-pass.db`; // Constructs the full path to the database file
    console.log('databasePath', databasePath);
    const dbManager = database_manager_1.default.getInstance(databasePath);
    try {
        for (const script of sql_scripts_1.scripts) {
            dbManager.runQuery(script);
        }
        return true;
    } catch (error) {
        console.error('init database error', error);
        return false;
    }
}
exports.initDatabase = initDatabase;
//# sourceMappingURL=db-init.js.map
