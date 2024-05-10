import * as sqlite3 from 'sqlite3';
const verbose = sqlite3.verbose();

class DatabaseManager {
    private static instance: DatabaseManager;
    private db: sqlite3.Database;
    private static dbPath: string | null = null;

    private constructor(path: string) {
        DatabaseManager.dbPath = path;
        this.db = new sqlite3.Database(DatabaseManager.dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
            if (err) {
                console.error('Error opening database', err);
            } else {
                console.log('Connected to the SQLite database.');
            }
        });
    }

    // Static method to get the instance of the class
    public static getInstance(path: string | null = null): DatabaseManager {
        if (!DatabaseManager.instance) {
            if (path === null) {
                throw new Error('Database path not provided');
            }
            DatabaseManager.instance = new DatabaseManager(path);
        }
        return DatabaseManager.instance;
    }

    public runQuerySingle<T>(sql: string, params: any[] = []): Promise<T> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row as T);
                }
            });
        });
    }

    public runQueryMulti<T>(sql: string, params: any[] = []): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as T[]);
                }
            });
        });
    }

    // Add more methods for different types of database operations (get, all, etc.)
}

export default DatabaseManager;

// import * as sqlite3 from 'sqlite3';
// const verbose = sqlite3.verbose();

// class DatabaseManager {
//     private db: sqlite3.Database;

//     constructor(dbPath: string) {
//         this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
//             if (err) {
//                 console.error('Error opening database', err);
//             } else {
//                 console.log('Connected to the SQLite database.');
//             }
//         });
//     }

//     runQuery(sql: string, params: any[] = []): Promise<{ id: number }> {
//         return new Promise((resolve, reject) => {
//             this.db.run(sql, params, function (this: sqlite3.RunResult, err: Error | null) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     // The `this` context provides the `lastID` property
//                     resolve({ id: this.lastID });
//                 }
//             });
//         });
//     }

//     // Add more methods for different types of database operations (get, all, etc.)
// }

// export default DatabaseManager;
