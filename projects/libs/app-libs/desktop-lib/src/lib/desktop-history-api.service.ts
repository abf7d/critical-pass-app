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
    private baseUrl!: string;
    constructor(
        private httpClient: HttpClient,
        private serializer: ProjectSerializerService,
    ) {
        this.baseUrl = environment.criticalPathApi;
    }

    public get(id: number): Observable<TreeNode[] | null> {
        console.log('desktop get history entry');
        return of([] as TreeNode[]);
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null> {
        return of([] as RecordEntry[]);
    }

    public post(project: TreeNode[]): Observable<TreeNode[] | null> {
        return of([] as TreeNode[]);
    }

    public delete(id: number) {
        return of();
    }
}
