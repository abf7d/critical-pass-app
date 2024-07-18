import { Component, Inject, Input, OnInit } from '@angular/core';
import { TreeNode } from '@critical-pass/project/types';
import { EventService, EVENT_SERVICE_TOKEN } from '@critical-pass/shared/data-access';
import * as CONST from '../../../constants/constants';
import { JsonFileManagerService } from '@critical-pass/shared/file-management';
@Component({
    selector: 'cp-tree-buttons',
    templateUrl: './tree-buttons.component.html',
    styleUrls: ['./tree-buttons.component.scss'],
})
export class TreeButtonsComponent implements OnInit {
    @Input() fileActions!: boolean;
    @Input() multiFileFormats: boolean = false;

    private history!: TreeNode[];

    constructor(
        @Inject(EVENT_SERVICE_TOKEN) private eventService: EventService,
        private jsonFileManager: JsonFileManagerService,
    ) {
        this.eventService.get<TreeNode[]>(CONST.HISTORY_ARRAY_KEY).subscribe(history => {
            this.history = history;
        });
    }
    public ngOnInit(): void {}
    public commit(): void {
        this.eventService.get(CONST.COMMIT_KEY).next(true);
    }
    public branch(): void {
        this.eventService.get(CONST.BRANCH_KEY).next(true);
    }
    public deleteNode(): void {
        this.eventService.get(CONST.RESET_KEY).next(true);
    }
    public downloadHistory() {
        this.jsonFileManager.export(this.history);
    }
    public loadFile(event: any) {
        const files = event.files as FileList;
        const firstFile = files.item(0);

        if (firstFile !== null && files.length > 0) {
            this.jsonFileManager.importFromTreeNodeList(firstFile).then(nodes => {
                const hfNode$ = this.eventService.get(CONST.LOAD_TREE_KEY);
                hfNode$.next(nodes);
            });
        }
    }
}
