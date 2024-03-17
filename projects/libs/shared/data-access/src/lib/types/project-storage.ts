import { Project } from '@critical-pass/project/types';
import { Observable } from 'rxjs';

export interface ProjectStorage {
    set(storageType: string, project: Project): void;
    get(storageType: string): Project | null;
}
