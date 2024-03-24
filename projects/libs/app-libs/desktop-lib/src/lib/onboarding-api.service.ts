import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urlJoin from 'url-join';
import { Project, ProjectLibrary, TreeNode } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';

@Injectable({
    providedIn: 'root',
})
export class OnBoardingApiService {
    private baseUrl!: string;
    constructor(
        private httpClient: HttpClient,
        private serializer: ProjectSerializerService,
    ) {
        this.baseUrl = environment.criticalPathApi;
    }

    public saveLibrary(projects: Project[], append: boolean): void {
        console.log('desktop-project-api.service.ts: list()');
        window.electron.onboardingApi.saveLibrary({ projects, append });
    }
    public saveHistory(projectId: number, history: TreeNode[]): void {
        console.log('desktop-project-api.service.ts: list()');
        window.electron.onboardingApi.saveHistory(projectId, history);
    }
    public getHistory(projectId: number): Observable<TreeNode[]> {
        console.log('desktop-project-api.service.ts: list()');
        return new Observable<TreeNode[]>(subscriber => {
            window.electron.onboardingApi.getHistory(projectId, (response: TreeNode[]) => {
                subscriber.next(response); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream
            });
        });
    }
    public getLibrary(page: number, pageSize: number, listName: string | null): Observable<ProjectLibrary> {
        console.log('desktop-project-api.service.ts: list()');
        return new Observable<ProjectLibrary>(subscriber => {
            window.electron.onboardingApi.getLibrary({ limit: pageSize, offset: page * pageSize /*, filter: listName*/ }, (response: ProjectLibrary) => {
                subscriber.next(response); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream
            });
        });
    }
    public getProject(id: number): Observable<Project> {
        console.log('desktop-project-api.service.ts: getProject()');
        return new Observable<Project>(subscriber => {
            window.electron.onboardingApi.getProject(id, (response: Project) => {
                subscriber.next(response); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream
            });
        });
    }
}
