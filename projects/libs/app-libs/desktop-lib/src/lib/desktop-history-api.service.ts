import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urlJoin from 'url-join';
import { RecordEntry, Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';
import { ProjectSerializerService, ProjectTreeNodeSerializerService } from '@critical-pass/shared/serializers';
import { HistoryApi } from '@critical-pass/shared/data-access';
import { ProjectSanatizerService } from '@critical-pass/shared/project-utils';

@Injectable({
    providedIn: 'root',
})
export class DesktopHistoryApiService implements HistoryApi {
    constructor(
        private treeSerializer: ProjectTreeNodeSerializerService,
        private projSerializer: ProjectSerializerService,
        private sanitizer: ProjectSanatizerService,
    ) {}

    public get(projectId: number): Observable<TreeNode[] | null> {
        console.log('desktop-project-api.service.ts: list()');
        return new Observable<TreeNode[]>(subscriber => {
            window.electron.onboardingApi.getHistory(projectId, (response: TreeNode[]) => {
                subscriber.next(response); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream
            });
        });
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null> {
        return of([] as RecordEntry[]);
    }

    public post(projectId: number, history: TreeNode[]): Observable<boolean> {
        console.log('desktop-project-api.service.ts: list()');
        const sanitizedHistory = history.map(x => {
            const node = this.treeSerializer.fromJson(x);
            node.children = [];
            node.parent = null;

            if (x.data) {
                const proj = this.projSerializer.fromJson(x.data);
                this.sanitizer.sanatizeForSave(proj);
                node.data = proj;
            }
            return node;
        });
        return new Observable<boolean>(subscriber => {
            window.electron.onboardingApi.saveHistory(projectId, sanitizedHistory, (response: boolean) => {
                subscriber.next(response); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream);
            });
        });
    }

    public delete(id: number) {
        return of();
    }
}
