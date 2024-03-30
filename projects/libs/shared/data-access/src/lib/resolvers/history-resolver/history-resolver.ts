import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import {
    DASHBOARD_TOKEN,
    EVENT_SERVICE_TOKEN,
    EventService,
    HISTORY_API_TOKEN,
    HistoryApi,
    PROJECT_API_TOKEN,
    PROJECT_STORAGE_TOKEN,
    ProjectApi,
    ProjectApiService,
} from '../../..';
import * as CONST from '../../constants/constants';
import { ProjectStorageApiService } from '../../api/project-storage-api/project-storage-api.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { NodeConnectorService } from '@critical-pass/project/processor';
import { ProjectStorage } from '../../types/project-storage';
import { fork } from 'child_process';
import { forkJoin } from 'rxjs';
import { Project, TreeNode } from '@critical-pass/project/types';
import { CHART_KEYS } from '@critical-pass/charts';
import { HistoryMapperService } from '@critical-pass/shared/file-management';

@Injectable({
    providedIn: 'root',
})
export class HistoryResolver implements Resolve<any> {
    constructor(
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
        @Inject(PROJECT_API_TOKEN) private projectApi: ProjectApi,
        @Inject(PROJECT_STORAGE_TOKEN) private storageApi: ProjectStorage,
        @Inject(HISTORY_API_TOKEN) private historyApi: HistoryApi,
        @Inject(EVENT_SERVICE_TOKEN) private eventService: EventService,
        // private mapper: HistoryMapperService,
        private nodeConnector: NodeConnectorService,
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        this.dashboard.secondaryProject$.next(null);
        if (+route.params['id'] === CONST.IMPORT_ROUTE_PARAM_ID) {
            const imported = this.storageApi.get(CONST.SESSION_STORAGE);
            if (imported !== null) {
                imported.profile.view.autoZoom = true;
                this.dashboard.cleanSlateForNewPage(imported);
            }
            const bs = this.dashboard.activeProject$;
            return bs.pipe(first());
        } else {
            const projectBs = this.projectApi.get(route.params['id']);
            const historyBs = this.historyApi.get(route.params['id']);
            return forkJoin([projectBs, historyBs]).pipe(
                tap(([project, history]) => {
                    if (history) {
                        this.importHistory(history);
                        this.eventService.get('project.tree.history.file').next(history);
                    } else {
                        this.nodeConnector.connectArrowsToNodes(project);
                        this.dashboard.activeProject$.next(project);
                    }
                }),
                first(),
            );
        }
    }
    private importHistory(history: TreeNode[]): void {
        history.forEach(treeNode => {
            this.nodeConnector.connectArrowsToNodes(treeNode.data as Project);
        });
        //     const head = this.mapper.createTreeHeadNode();
        //     const innerNodes = projects.map(x => this.mapper.mapProjectToNode(x));
        //     const treeNodes = [head, ...innerNodes];
    }
}
