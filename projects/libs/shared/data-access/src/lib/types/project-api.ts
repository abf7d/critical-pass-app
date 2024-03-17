import { Project, ProjectLibrary } from '@critical-pass/project/types';
import { Observable } from 'rxjs';

export interface ProjectApi {
    get(id: number): Observable<Project>;
    list(page: number, pageSize: number, listName: string | null): Observable<ProjectLibrary>;
    post(project: Project): Observable<Project>;
    delete(id: number): Observable<any>;
}
