import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urlJoin from 'url-join';
import { RecordEntry, ProjectLibrary, TreeNode, Project } from '@critical-pass/project/types';
import { ProjectSerializerService, ProjectTreeNodeSerializerService } from '@critical-pass/shared/serializers';
import { HistoryApi, NetworkApi } from '@critical-pass/shared/data-access';
import { ProjectSanatizerService } from '@critical-pass/shared/project-utils';

@Injectable({
    providedIn: 'root',
})
export class DesktopNetworkApiService implements NetworkApi {
    constructor(
        private projSerializer: ProjectSerializerService,
        private sanitizer: ProjectSanatizerService,
    ) {}

    public get(projectId: number): Observable<Project[] | null> {
        console.log('desktop-project-api.service.ts: list()');
        return new Observable<Project[]>(subscriber => {
            window.electron.onboardingApi.getNetwork(projectId, (response: Project[]) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null> {
        return of([] as RecordEntry[]);
    }

    public post(projectId: number, network: Project[]): Observable<boolean> {
        console.log('desktop-project-api.service.ts: list()');
        const sanitizedNetwork = network.map(x => {
            const proj = this.projSerializer.fromJson(x);
            this.sanitizer.sanatizeForSave(proj);
            return proj;
        });
        return new Observable<boolean>(subscriber => {
            window.electron.onboardingApi.saveNetwork(projectId, sanitizedNetwork, (response: boolean) => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }

    public delete(id: number) {
        return of();
    }
}
