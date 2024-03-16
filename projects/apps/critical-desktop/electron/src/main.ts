import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { setupFileOperationsListeners } from './startup/ipc-handlers';
import { initDatabase } from './startup/db-init';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
    const size = screen.getPrimaryDisplay().workAreaSize;
    console.log('__dirname:', __dirname);
    console.log('Preload Path:', path.join(__dirname, 'preload.js'));
    // Create the browser window.
    const pathF = path.join(__dirname, 'preload.js').replace(/\\/g, '/');
    console.log(pathF);
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            // webSecurity: false,
            nodeIntegration: false,
            allowRunningInsecureContent: serve,
            contextIsolation: true,
            preload: pathF, // path.join(__dirname, 'preload.js').replaceAll('\','/'), // Update the path as necessary
        },
    });

    if (serve) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const debug = require('electron-debug');
        debug();

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        // require('electron-reloader')(module);
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('electron-reloader')(module, {
                // Options here
                watchRenderer: true,
            });

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            // require('electron-reload')(__dirname, {
            //     electron: require(`${__dirname}/node_modules/electron`),
            //     ignored: /node_modules|[\/\\]\./, // Regular expression to ignore node_modules and dotfiles
            //     argv: [], // Arguments to pass to the Electron process
            //     hardResetMethod: 'exit', // How to perform a hard reset (choices: 'exit', 'quit')
            //     forceHardReset: false, // Force a hard reset for all changes
            //     usePolling: false, // Whether to use fs.watch (false) or fs.watchFile (true) for file watching
            // });
        } catch (error) {
            console.error('Failed to load electron-reloader:', error);
        }
        win.loadURL('http://localhost:4201');
    } else {
        // Path when running electron executable
        let pathIndex = './index.html';

        if (fs.existsSync(path.join(__dirname, '../../../../dist/critical-desktop/browser/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../../../../dist/critical-desktop/browser/index.html';
        }

        const url = new URL(path.join('file:', __dirname, pathIndex));
        win.loadURL(url.href);
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    return win;
}

try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    app.on('ready', () => {
        setupFileOperationsListeners(app);
        initDatabase();
        console.log('app ready');
        setTimeout(createWindow, 400);
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
} catch (e) {
    // Catch Error
    // throw e;
}
