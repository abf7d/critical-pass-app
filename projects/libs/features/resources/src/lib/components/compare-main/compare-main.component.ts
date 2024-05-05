import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CHART_KEYS, CompletionNodeCalcService } from '@critical-pass/charts';
import { Project, TreeNode } from '@critical-pass/project/types';
import { EventService, EVENT_SERVICE_TOKEN } from '@critical-pass/shared/data-access';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'cp-compare-main',
    templateUrl: './compare-main.component.html',
    styleUrls: ['./compare-main.component.scss'],
})
export class CompareMainComponent implements OnInit, OnDestroy {
    private sub!: Subscription;
    public completedNodes: TreeNode[] = [];
    public id: number;
    public selectedNodeId: number | null = null;
    private nodeClickSub!: Subscription;
    constructor(
        @Inject(EVENT_SERVICE_TOKEN) private eventService: EventService,
        route: ActivatedRoute,
    ) {
        this.id = +route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.completedNodes = [];
        this.nodeClickSub = this.eventService
            .get<number>(CHART_KEYS.SELECTED_TREE_NODE_KEY)
            .pipe(filter(x => !!x))
            .subscribe(nodeId => {
                this.selectedNodeId = nodeId;
            });

        this.sub = this.eventService
            .get<TreeNode[]>(CHART_KEYS.ASSIGN_COMPLETED_PROJECTS)
            .pipe(filter(x => !!x))
            .subscribe(completedProjs => {
                this.completedNodes = completedProjs; //this.completed.getCompletedNodes(historyArray);
            });
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.nodeClickSub) {
            this.nodeClickSub.unsubscribe();
        }
    }
    public selectTimeCostNode(id: number): void {
        this.eventService.get<number | null>(CHART_KEYS.SELECTED_TIMECOST_POINT).next(id);
        this.selectedNodeId = id;
    }
}
