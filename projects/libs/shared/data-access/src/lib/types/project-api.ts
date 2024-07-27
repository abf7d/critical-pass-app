import { Project, ProjectLibrary } from '@critical-pass/project/types';
import { Observable } from 'rxjs';
import { LibraryFilters } from './library-filters';

export interface ProjectApi {
    get(id: number): Observable<Project>;
    list(filters: LibraryFilters): Observable<ProjectLibrary>;
    post(project: Project): Observable<Project>;
    delete(id: number): Observable<any>;
}
