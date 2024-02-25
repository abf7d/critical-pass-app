import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { Observable } from 'rxjs';
import * as CONST from '../../constants/constants';
import urlJoin from 'url-join';
import { ProjectList } from '../../types/project-list';

@Injectable({
    providedIn: 'root',
})
export class ProjectListApiService {
    private baseUrl!: string;
    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.criticalPathApi;
    }

    public getProjectLists(projectId: number): Observable<string[]> {
        return this.httpClient.get<string[]>(urlJoin(this.baseUrl, CONST.PROJECT_LIST_ENDPOINT, projectId.toString()));
    }
    public getGroupLists(filterTxt: string): Observable<string[]> {
        const params = new HttpParams().set('filterTxt', filterTxt || '');
        return this.httpClient.get<string[]>(urlJoin(this.baseUrl, CONST.GROUP_LISTS_ENDPOINT), { params });
    }
    public processProjectList(projectId: number, lists: ProjectList[]): Observable<string[]> {
        const body = JSON.stringify(lists);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post<string[]>(urlJoin(this.baseUrl, CONST.PROCESS_PROJECT_LIST_ENDPOINT, projectId.toString()), body, { headers });
    }
}
