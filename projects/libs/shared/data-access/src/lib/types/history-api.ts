import { RecordEntry, Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';
import { Observable } from 'rxjs';

export interface HistoryApi {
    get(id: number): Observable<TreeNode[] | null>;
    list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null>;
    post(projectId: number, project: TreeNode[]): Observable<boolean>;
    delete(id: number): Observable<any>;
}
