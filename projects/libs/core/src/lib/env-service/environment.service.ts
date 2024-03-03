import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    // Check if running in Electron
    get isElectron(): boolean {
        // Check for renderer process
        if (window && window.process) {
            // @ts-ignore: Unreachable code error
            if (window.process.type) {
                return true;
            }
        }

        // Check for Electron's 'require' presence
        if (typeof window !== 'undefined' && typeof window.require === 'function') {
            try {
                const electron = window.require('electron');
                return electron !== undefined;
            } catch (error) {
                return false;
            }
        }

        return false;
    }
}
