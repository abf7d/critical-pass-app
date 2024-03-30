import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urlJoin from 'url-join';
import { RecordEntry, Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { HistoryApi } from '@critical-pass/shared/data-access';

@Injectable({
    providedIn: 'root',
})
export class DesktopHistoryApiService implements HistoryApi {
    constructor() {}

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

    public post(projectId: number, history: TreeNode[]): void {
        console.log('desktop-project-api.service.ts: list()');
        window.electron.onboardingApi.saveHistory(projectId, history);
    }

    public delete(id: number) {
        return of();
    }
}
