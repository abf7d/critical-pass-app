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

    // public get(id: number): Observable<Project> {
    //     // return this.httpClient.get(urlJoin(this.baseUrl, CONST.PROJECT_ENDPOINT, id.toString())).pipe(map((data: any) => this.serializer.fromJson(data)));
    //     return of(this.serializer.fromJson(null));
    // }
    public get(id: number): Observable<Project> {
        console.log('desktop-project-api.service.ts: getProject()');
        return new Observable<Project>(subscriber => {
            // Assuming window.electronAPI.getProject exists and is properly initialized
            window.electron.onboardingApi.getProject(id, (response: Project) => {
                // if (response.error) {
                //     subscriber.error(response.error); // Emit an error if there's an error in the response
                // } else {
                const project = this.serializer.fromJson(response);
                subscriber.next(project); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream
                // }
            });
        });
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<ProjectLibrary> {
        console.log('desktop-project-api.service.ts: list()');
        // window.electron.onboardingApi.getLibrary({ limit: pageSize, offset: page * pageSize /*, filter: listName*/ }, (data: Project[]) => {});

        return new Observable<ProjectLibrary>(subscriber => {
            // Assuming window.electronAPI.getLibrary exists and is properly initialized
            window.electron.onboardingApi.getLibrary({ limit: pageSize, offset: page * pageSize /*, filter: listName*/ }, (response: ProjectLibrary) => {
                // if (response.error) {
                //     subscriber.error(response.error); // Emit an error if there's an error in the response
                // } else {
                const items: Project[] = [];
                for (const item of response.items) {
                    const project = this.serializer.fromJson(item);
                    items.push(project);
                }
                const totalCount = response.totalCount;
                subscriber.next({ totalCount, items }); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream
                // }
            });
        });
    }

    // public list(page: number, pageSize: number, listName: string | null): Observable<ProjectLibrary> {
    //     console.log('desktop-project-api.service.ts: list()');
    //     // window.electron.onboardingApi.saveLibrary({ data: 'savelibrary test data' });
    //     const obsv: ProjectLibrary = {
    //         items: [],
    //         totalCount: 0,
    //     };
    //     return of(obsv);

    //     // let params = new HttpParams();
    //     // if (listName) {
    //     //     params = params.set('filter', listName);
    //     // }
    //     // return this.httpClient
    //     //     .get(urlJoin(this.baseUrl, CONST.LIBRARY_ENDPOINT, page.toString(), pageSize.toString()), {
    //     //         observe: 'response' as 'body',
    //     //         params,
    //     //     })
    //     //     .pipe(map((data: any) => this.serialize(data)));
    // }

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
