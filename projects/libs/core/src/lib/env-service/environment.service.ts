import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    // Check if running in Electron
    get isElectron(): boolean {
        // Check for renderer process

        return !!(window as any).electron;
    }
}
