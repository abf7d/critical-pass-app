import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urlJoin from 'url-join';
import { Project, ProjectLibrary } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { ProjectApi } from '@critical-pass/shared/data-access';

@Injectable({
    providedIn: 'root',
})
export class DesktopProjectApiService implements ProjectApi {
    private baseUrl!: string;
    constructor(
        private httpClient: HttpClient,
        private serializer: ProjectSerializerService,
    ) {
        this.baseUrl = environment.criticalPathApi;
    }

    public get(id: number): Observable<Project> {
        return new Observable<Project>(subscriber => {
            window.electron.onboardingApi.getProject(id, (response: Project) => {
                console.log('tags', response.tags);
                const project = this.serializer.fromJson(response);
                subscriber.next(project);
                subscriber.complete();
            });
        });
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<ProjectLibrary> {
        return new Observable<ProjectLibrary>(subscriber => {
            window.electron.onboardingApi.getLibrary({ limit: pageSize, offset: page * pageSize /*, filter: listName*/ }, (response: ProjectLibrary) => {
                const items: Project[] = [];
                for (const item of response.items) {
                    const project = this.serializer.fromJson(item);
                    items.push(project);
                }
                const totalCount = response.totalCount;
                subscriber.next({ totalCount, items });
                subscriber.complete();
            });
        });
    }

    public post(project: Project) {
        const body = JSON.stringify(project);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient
            .post<Project>(urlJoin(this.baseUrl, 'CONST.PROJECT_ENDPOINT'), body, { headers })
            .pipe(map(data => this.serializer.fromJson(data)));
    }

    public delete(id: number) {
        return this.httpClient.delete(urlJoin(this.baseUrl, 'CONST.PROJECT_ENDPOINT', id.toString()));
    }

    private serialize(data: any): ProjectLibrary {
        const count = data.headers.get('x-total-count');
        const items = data.body.map((item: any) => this.serializer.fromJson(item));
        const list: ProjectLibrary = {
            items: items,
            totalCount: count,
        };
        return list;
    }
}
