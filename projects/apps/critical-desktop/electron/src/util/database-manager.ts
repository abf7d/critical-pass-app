import * as sqlite3 from 'sqlite3';
const verbose = sqlite3.verbose();

class DatabaseManager {
    private db: sqlite3.Database;

    constructor(dbPath: string) {
        this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
            if (err) {
                console.error('Error opening database', err);
            } else {
                console.log('Connected to the SQLite database.');
            }
        });
    }

    runQuery(sql: string, params: any[] = []): Promise<{ id: number }> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (this: sqlite3.RunResult, err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    // The `this` context provides the `lastID` property
                    resolve({ id: this.lastID });
                }
            });
        });
    }

    // Add more methods for different types of database operations (get, all, etc.)
}

export default DatabaseManager;
