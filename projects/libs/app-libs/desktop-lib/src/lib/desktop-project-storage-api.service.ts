import { Injectable } from '@angular/core';
import { Project } from '@critical-pass/project/types';
import { NodeConnectorService } from '@critical-pass/project/processor';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { ProjectStorage } from '@critical-pass/shared/data-access';
import * as CONST from './constants';
// import * as CONST from '../../constants/constants';
// import { ProjectStorage } from '../../types/project-storage';

@Injectable({
    providedIn: 'root',
})
export class DesktopProjectStorageApiService implements ProjectStorage {
    constructor(
        private serializer: ProjectSerializerService,
        private nodeConnector: NodeConnectorService,
    ) {}

    public async get(storageType: string): Promise<Project | null> {
        return new Promise<Project | null>((resolve, reject) => {
            window.electron.onboardingApi.getProject(CONST.PROJECT_CACHE_ID, (response: Project) => {
                try {
                    const project = this.serializer.fromJson(response);
                    resolve(project); // Resolve the promise with the project
                } catch (error) {
                    reject(error); // Reject the promise if there's an error
                }
            });
        });
    }
    public set(storageType: string, project: Project): void {
        // return new Observable<Project>(subscriber => {
        window.electron.onboardingApi.saveProject(CONST.PROJECT_CACHE_ID, project, (response: boolean) => {
            // subscriber.next(project);
            // subscriber.complete();
            // });
        });
        // const body = JSON.stringify(project);
        // const headers = new HttpHeaders().set('Content-Type', 'application/json');
        // return this.httpClient
        //     .post<Project>(urlJoin(this.baseUrl, 'CONST.PROJECT_ENDPOINT'), body, { headers })
        //     .pipe(map(data => this.serializer.fromJson(data)));
    }
}
