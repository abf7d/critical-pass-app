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
        console.log('web get history entry');
        return of(null);
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null> {
        return of(null);
    }

    public post(projectId: number, history: TreeNode[]): void {}

    public delete(id: number) {
        return of();
    }

    // private serialize(data: any): ProjectLibrary {
    //     const count = data.headers.get('x-total-count');
    //     const items = data.body.map((item: any) => this.serializer.fromJson(item));
    //     const list: ProjectLibrary = {
    //         items: items,
    //         totalCount: count,
    //     };
    //     return list;
    // }
}
