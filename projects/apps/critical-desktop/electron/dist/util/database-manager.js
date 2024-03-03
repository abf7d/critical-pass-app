'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const sqlite3 = require('sqlite3');
const verbose = sqlite3.verbose();
class DatabaseManager {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
            if (err) {
                console.error('Error opening database', err);
            } else {
                console.log('Connected to the SQLite database.');
            }
        });
    }
    runQuery(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    // The `this` context provides the `lastID` property
                    resolve({ id: this.lastID });
                }
            });
        });
    }
}
exports.default = DatabaseManager;
//# sourceMappingURL=database-manager.js.map
