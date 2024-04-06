import { RecordEntry, Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';
import { Observable } from 'rxjs';

export interface NetworkApi {
    get(id: number): Observable<Project[] | null>;
    list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null>;
    post(projectId: number, project: Project[]): Observable<boolean>;
    delete(id: number): Observable<any>;
}
