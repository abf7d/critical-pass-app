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

    // TODO: Refactor into a generic
    public saveLibrary(projects: Project[], append: boolean): void {
        window.electron.onboardingApi.saveLibrary({ projects, append });
    }
    public saveHistory(projectId: number, history: TreeNode[]): Observable<boolean> {
        return new Observable<boolean>(subscriber => {
            window.electron.onboardingApi.saveHistory(projectId, history, (response: boolean) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
    public getHistory(projectId: number): Observable<TreeNode[]> {
        return new Observable<TreeNode[]>(subscriber => {
            window.electron.onboardingApi.getHistory(projectId, (response: TreeNode[]) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
    public getLibrary(page: number, pageSize: number, listName: string | null): Observable<ProjectLibrary> {
        return new Observable<ProjectLibrary>(subscriber => {
            window.electron.onboardingApi.getLibrary({ limit: pageSize, offset: page * pageSize /*, filter: listName*/ }, (response: ProjectLibrary) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
    public getProject(id: number): Observable<Project> {
        return new Observable<Project>(subscriber => {
            window.electron.onboardingApi.getProject(id, (response: Project) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
    public saveNetwork(projectId: number, network: Project[]): Observable<boolean> {
        return new Observable<boolean>(subscriber => {
            window.electron.onboardingApi.saveNetwork(projectId, network, (response: boolean) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
    public getNetwork(projectId: number): Observable<Project[]> {
        return new Observable<Project[]>(subscriber => {
            window.electron.onboardingApi.getNetwork(projectId, (response: Project[]) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
}