import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urlJoin from 'url-join';
import { RecordEntry, Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';
import * as CONST from '../../constants/constants';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { HistoryApi } from '../../types/history-api';

@Injectable({
    providedIn: 'root',
})
export class HistoryApiService implements HistoryApi {
    private baseUrl!: string;
    constructor(
        private httpClient: HttpClient,
        private serializer: ProjectSerializerService,
    ) {
        this.baseUrl = environment.criticalPathApi;
    }

    public get(id: number): Observable<TreeNode[] | null> {
        return of(null);
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null> {
        return of(null);
    }

    public post(projectId: number, history: TreeNode[]): Observable<boolean> {
        return of(true);
    }

    public delete(id: number) {
        return of();
    }
}
