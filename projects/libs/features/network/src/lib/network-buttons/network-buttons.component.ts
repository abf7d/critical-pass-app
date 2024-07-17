import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@critical-pass/project/types';
import { BehaviorSubject, Subject } from 'rxjs';
import { CORE_CONST } from '@critical-pass/core';
import { EventService, EVENT_SERVICE_TOKEN, NETWORK_API_TOKEN, NetworkApi, DASHBOARD_TOKEN, DashboardService } from '@critical-pass/shared/data-access';
import { NetworkFileManagerService, NetworkJsonFileManagerService, ProjectFileManagerService } from '@critical-pass/shared/file-management';
import { NodeConnectorService } from '@critical-pass/project/processor';
import { UTIL_CONST } from '@critical-pass/shared/project-utils';
import { FILE_CONST } from '@critical-pass/shared/file-management';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'proj-meta-buttons',
    templateUrl: './network-buttons.component.html',
    styleUrls: ['./network-buttons.component.scss'],
})
export class NetworkButtonsComponent implements OnInit {
    public id!: number;
    public networkArray$: BehaviorSubject<Project[]>;
    public filteredNetworkArray$: Subject<Project[]>;
    constructor(
        @Inject(EVENT_SERVICE_TOKEN) private eventService: EventService,
        @Inject(NETWORK_API_TOKEN) private networkApi: NetworkApi,
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
        private route: ActivatedRoute,
        private router: Router,
        private fileManager: NetworkFileManagerService,
        private jsonFileManager: NetworkJsonFileManagerService,
        private nodeConnector: NodeConnectorService,
        private toastr: ToastrService,
        private ngZone: NgZone,
    ) {
        this.networkArray$ = this.eventService.get(CORE_CONST.NETWORK_ARRAY_KEY);
        this.filteredNetworkArray$ = this.eventService.get(CORE_CONST.FILTERED_NETWORK_ARRAY_KEY);
    }

    public ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
    }

    public navToSingleGraph() {
        this.router.navigateByUrl(`network/(${this.id}//sidebar:arrow/${this.id})`);
    }
    public navToMetaGraph() {
        this.router.navigateByUrl(`network/(${this.id}//sidebar:meta/${this.id})`);
    }
    public saveByDownload(fileType: string) {
        const nodes = this.networkArray$.getValue();
        if (nodes) {
            if (fileType === FILE_CONST.EXT.JSON) {
                this.jsonFileManager.export(nodes);
            } else if (fileType === FILE_CONST.EXT.XLSX) {
                this.fileManager.export(nodes);
            } else if (fileType === FILE_CONST.EXT.ELECTRON_SAVE) {
                this.networkApi.post(this.id, nodes).subscribe(success => {
                    this.ngZone.run(() => {
                        if (success) {
                            this.toastr.success('Network saved', 'Success');
                        } else {
                            this.toastr.error('Network not saved', 'Error');
                        }
                    });
                });
            }
        }
    }
    public loadFileByUpload(firstFile: File) {
        this.jsonFileManager.import(firstFile).then(projects => {
            projects.forEach(project => {
                this.nodeConnector.connectArrowsToNodes(project);
            });
            let mostRecentId = Math.min(...projects.map(p => p.profile.id));
            if (mostRecentId >= 0) {
                mostRecentId = -1;
            }
            mostRecentId -= 1;
            this.eventService.get(UTIL_CONST.NETWORK_SUB_PROJECT_TRACKER).next(mostRecentId);
            this.networkArray$.next([...projects]);
            this.filteredNetworkArray$.next([...projects]);
            this.dashboard.updateProject(projects[0], true);
        });
        // }
    }
}
