import { Project } from '@critical-pass/project/types';
import { Observable } from 'rxjs';
import { ProjectLibrary } from './project-library';

export interface ProjectStorage {
    set(storageType: string, project: Project): void;
    get(storageType: string): Project | null;
}
