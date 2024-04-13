import { Injectable } from '@angular/core';
import { Project } from '@critical-pass/project/types';
import { NodeConnectorService } from '@critical-pass/project/processor';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { ProjectStorage } from '@critical-pass/shared/data-access';
import * as CONST from './constants';
import { ProjectSanatizerService } from '@critical-pass/shared/project-utils';

@Injectable({
    providedIn: 'root',
})
export class DesktopProjectStorageApiService implements ProjectStorage {
    constructor(
        private serializer: ProjectSerializerService,
        private nodeConnector: NodeConnectorService,
        private sanitizer: ProjectSanatizerService,
    ) {}

    public async get(storageType: string): Promise<Project | null> {
        return new Promise<Project | null>((resolve, reject) => {
            window.electron.onboardingApi.getProject(CONST.PROJECT_CACHE_ID, (response: Project) => {
                try {
                    const project = this.serializer.fromJson(response);
                    this.nodeConnector.connectArrowsToNodes(project);
                    resolve(project); // Resolve the promise with the project
                } catch (error) {
                    reject(error); // Reject the promise if there's an error
                }
            });
        });
    }
    public set(storageType: string, project: Project): void {
        const copy = this.serializer.fromJson(project);
        this.sanitizer.sanatizeForSave(copy);
        window.electron.onboardingApi.saveProject(CONST.PROJECT_CACHE_ID, copy, (response: boolean) => {});
    }
}
