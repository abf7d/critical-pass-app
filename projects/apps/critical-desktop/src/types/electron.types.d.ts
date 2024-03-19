import { Project, ProjectLibrary } from '@critical-pass/project/types';
import { LibraryPagePayload, LibraryPayload } from '../../electron/src/types/payloads';

declare global {
    interface Window {
        electron: {
            onboardingApi: {
                saveLibrary: (data: LibraryPayload) => void;
                saveNetwork: (data: any) => void;
                saveHistory: (data: any) => void;
                getLibrary: (data: LibraryPagePayload, callback: (data: ProjectLibrary) => any) => void;
                getProject: (id: number, callback: (data: Project) => any) => void;
            };
            send: (channel: string, data: any) => void;
            receive: (channel: string, func: (...args: any[]) => void) => void;
        };
    }
}

export {};
