import { Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';
import { LibraryPagePayload, LibraryPayload } from '../../electron/src/types/payloads';

declare global {
    interface Window {
        electron: {
            onboardingApi: {
                saveLibrary: (data: LibraryPayload) => void;
                saveNetwork: (projectId: number, network: Project[], callback: (success: boolean) => any) => void;
                saveHistory: (projectId: number, history: TreeNode[], callback: (success: boolean) => any) => void;
                saveProject: (projectId: number, network: Project, callback: (success: boolean) => any) => void;
                getHistory: (projectId: number, callback: (data: TreeNode[]) => any) => void;
                getNetwork: (projectId: number, callback: (data: Project[]) => any) => void;
                getLibrary: (data: LibraryPagePayload, callback: (data: ProjectLibrary) => any) => void;
                getProject: (id: number, callback: (data: Project) => any) => void;
            };
            send: (channel: string, data: any) => void;
            receive: (channel: string, func: (...args: any[]) => void) => void;
        };
    }
}

export {};
