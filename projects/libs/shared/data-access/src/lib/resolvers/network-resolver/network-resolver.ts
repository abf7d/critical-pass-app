import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import {
    DASHBOARD_TOKEN,
    EVENT_SERVICE_TOKEN,
    EventService,
    NETWORK_API_TOKEN,
    NetworkApi,
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
import { forkJoin } from 'rxjs';
import { Project } from '@critical-pass/project/types';
@Injectable({
    providedIn: 'root',
})
export class NetworkResolver implements Resolve<any> {
    constructor(
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
        @Inject(PROJECT_API_TOKEN) private projectApi: ProjectApi,
        @Inject(PROJECT_STORAGE_TOKEN) private storageApi: ProjectStorage,
        @Inject(NETWORK_API_TOKEN) private networkApi: NetworkApi,
        @Inject(EVENT_SERVICE_TOKEN) private eventService: EventService,
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
            const networkBs = this.networkApi.get(route.params['id']);

            return forkJoin([projectBs, networkBs]).pipe(
                tap(([project, network]) => {
                    if (network) {
                        this.importNetwork(network);
                        this.initNetwork(network);
                        if (network.length > 0) {
                            this.dashboard.activeProject$.next(network[0]);
                        }
                    } else {
                        this.nodeConnector.connectArrowsToNodes(project);
                        this.dashboard.activeProject$.next(project);
                    }
                }),
                first(),
            );
        }
    }
    private initNetwork(projects: Project[]): void {
        let mostRecentId = Math.min(...projects.map(p => p.profile.id));
        if (mostRecentId >= 0) {
            mostRecentId = -1;
        }
        mostRecentId -= 1;
        console.log(CONST.NETWORK_SUB_PROJECT_TRACKER, 'etste');
        this.eventService.get(CONST.NETWORK_SUB_PROJECT_TRACKER).next(mostRecentId);
        this.eventService.get(CONST.NETWORK_ARRAY_KEY).next([...projects]);
        this.eventService.get(CONST.FILTERED_NETWORK_ARRAY_KEY).next([...projects]);
    }
    private importNetwork(network: Project[]): void {
        network.forEach(project => {
            this.nodeConnector.connectArrowsToNodes(project);
        });
    }
}
