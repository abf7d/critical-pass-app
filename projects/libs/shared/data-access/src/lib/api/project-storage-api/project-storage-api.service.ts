import { Injectable } from '@angular/core';
import { Project } from '@critical-pass/project/types';
import { NodeConnectorService } from '@critical-pass/project/processor';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import * as CONST from '../../constants/constants';
import { ProjectStorage } from '../../types/project-storage';

@Injectable({
    providedIn: 'root',
})
export class ProjectStorageApiService implements ProjectStorage {
    constructor(
        private serializer: ProjectSerializerService,
        private nodeConnector: NodeConnectorService,
    ) {}

    public get(storageType: string): Promise<Project | null> {
        let stored: any;
        if (storageType === CONST.LOCAL_STORAGE) {
            stored = localStorage.getItem(CONST.PROJECT_STORAGE_KEY);
        } else if (storageType === CONST.SESSION_STORAGE) {
            stored = sessionStorage.getItem(CONST.PROJECT_STORAGE_KEY);
        }
        if (stored === undefined) {
            return Promise.resolve(null);
        }
        const project = this.serializer.fromJson(JSON.parse(stored));
        this.nodeConnector.connectArrowsToNodes(project);
        return Promise.resolve(project);
    }
    public set(storageType: string, project: Project): void {
        const copy = this.serializer.fromJson(project);
        copy.profile.view.autoZoom = true;

        const projectStr = JSON.stringify(copy);
        if (storageType === CONST.LOCAL_STORAGE) {
            localStorage.setItem(CONST.PROJECT_STORAGE_KEY, projectStr);
        }
        if (storageType === CONST.SESSION_STORAGE) {
            sessionStorage.setItem(CONST.PROJECT_STORAGE_KEY, projectStr);
        }
    }
}
