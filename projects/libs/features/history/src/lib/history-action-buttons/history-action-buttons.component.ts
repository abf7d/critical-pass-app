import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
    DASHBOARD_TOKEN,
    DashboardService,
    EVENT_SERVICE_TOKEN,
    EventService,
    ProjectStorageApiService,
    ProjectApiService,
    API_CONST,
    ZametekApiService,
} from '@critical-pass/shared/data-access';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { FileCompilerService, ProjectSanatizerService } from '@critical-pass/shared/project-utils';
import { HistoryFileManagerService, JsonFileManagerService } from '@critical-pass/shared/file-management';
import { TreeNode } from '@critical-pass/project/types';
import { CHART_KEYS, ProjectTreeNodeSerializerService } from '@critical-pass/charts';
import { ActionButtonsComponent } from '@critical-pass/shared/layout';
import { FILE_CONST } from '@critical-pass/shared/file-management';

@Component({
    selector: 'cp-history-action-buttons',
    templateUrl: './history-action-buttons.component.html',
    styleUrls: ['./history-action-buttons.component.scss'],
})
export class HistoryActionButtonsComponent extends ActionButtonsComponent {
    public fileType = FILE_CONST.EXT.XLSX;
    private history!: TreeNode[];
    public isSelFileType = false;
    public resourceCount: number | null = null;
    constructor(
        router: Router,
        @Inject(DASHBOARD_TOKEN) dashboard: DashboardService,
        @Inject(EVENT_SERVICE_TOKEN) eventService: EventService,
        serializer: ProjectSerializerService,
        sanitizer: ProjectSanatizerService,
        toastr: ToastrService,
        storageApi: ProjectStorageApiService,
        projectApi: ProjectApiService,
        private zametekApi: ZametekApiService,
        private fCompiler: FileCompilerService,
        private fileManager: HistoryFileManagerService,
        private jsonFileManager: JsonFileManagerService,
        private treeNodeSerializer: ProjectTreeNodeSerializerService,
    ) {
        super(router, dashboard, eventService, serializer, sanitizer, toastr, storageApi, projectApi);
        eventService.get<TreeNode[]>(CHART_KEYS.HISTORY_ARRAY_KEY).subscribe(history => {
            this.history = history;
        });
    }

    public unstashTree() {
        this.showPeek = false;

        this.showPeek = false;
        try {
            const project = this.storageApi.get(API_CONST.LOCAL_STORAGE);
            if (project !== null) {
                this.dashboard.updateProject(project, false);
                const head = this.treeNodeSerializer.head();
                head.data = project;
                this.eventService.get(CHART_KEYS.LOAD_TREE_KEY).next([head]);
            }
        } catch (ex) {
            this.toastr.error('Unstash Chart', 'Error occured.');
            console.error(ex);
            return;
        }
        this.toastr.success('Unstash Chart', 'Success!');
    }

    public downloadHistory() {
        if (this.fileType === FILE_CONST.EXT.XLSX) {
            this.fileManager.export(this.history);
        } else if (this.fileType === FILE_CONST.EXT.JSON) {
            // This maps all json including the nodes
            this.jsonFileManager.export(this.history);
        }
    }
    public loadFile(event: any) {
        const files = event.files as FileList;
        const firstFile = files.item(0);

        if (firstFile !== null && files.length > 0) {
            const extension = firstFile.name.split('.').pop();
            if (extension === FILE_CONST.EXT.XLSX) {
                this.fileManager.import(firstFile).then(nodes => {
                    this.eventService.get(CHART_KEYS.LOAD_TREE_KEY).next(nodes);
                });
            } else if (extension === FILE_CONST.EXT.JSON) {
                // TODO: Pull nodes from files (not just projs) when loading json
                this.jsonFileManager.import(firstFile).then(nodes => {
                    this.eventService.get(CHART_KEYS.LOAD_TREE_KEY).next(nodes);
                });
            }
        }
    }
    public autoAssignResourceCount() {
        this.zametekApi.autoAssignResourceCount(this.dashboard.activeProject$.value, this.resourceCount).subscribe(project => {
            if (project !== null) {
                this.fCompiler.compileProjectFromFile(project);
                this.dashboard.updateProject(project, true);
            }
        });
    }
    public navToSingleGraph() {
        this.router.navigateByUrl(`history/(${this.id}//sidebar:arrow/${this.id})`);
    }
    public navToMetaGraph() {
        this.router.navigateByUrl(`history/(${this.id}//sidebar:lasso/${this.id})`);
    }
}
