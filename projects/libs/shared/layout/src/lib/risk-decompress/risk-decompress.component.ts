import { Component, Inject, OnInit } from '@angular/core';
import { Project } from '@critical-pass/project/types';
import { DashboardService, DASHBOARD_TOKEN } from '@critical-pass/shared/data-access';
import { EndNodesLocatorService, LayoutProps } from '@critical-pass/shared/project-utils';
import { NodeArrangerService } from '@critical-pass/shared/project-utils';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'cp-risk-decompress',
    templateUrl: './risk-decompress.component.html',
    styleUrls: ['./risk-decompress.component.scss'],
})
export class RiskDecompressComponent implements OnInit {
    private project!: Project;
    public start!: number;
    public end!: number;
    public enableArranging!: boolean;

    public showArrangeSettings: boolean = false;
    public xGap: number = 15;
    public yGap: number = 15;
    public decross: boolean = true;
    public greedy: boolean = false;
    public quad: boolean = false;
    public layering: string = 'longestPath';
    public hasCurves: boolean = true;
    public bump: boolean = true;

    constructor(
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
        private endNodesLocator: EndNodesLocatorService,
        private nodeArranger: NodeArrangerService,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.dashboard.activeProject$.pipe(filter(x => !!x)).subscribe(project => {
            this.project = project;
            if (project.profile.start !== undefined) this.start = project.profile.start;
            if (project.profile.end !== undefined) this.end = project.profile.end;
            this.enableArranging = true;
        });
    }

    public calculateRisk(): void {
        this.endNodesLocator.setStartEndNodesFromLongestPath(this.project);
        this.dashboard.updateProject(this.project, true);
    }

    public setStart(event: any): void {
        this.project.profile.start = +event.value;
        this.dashboard.updateProject(this.project, true);
    }
    public setEnd(event: any): void {
        this.project.profile.end = +event.value;
        this.dashboard.updateProject(this.project, true);
    }

    public arrangeNodes(): void {
        const layoutOptions: LayoutProps = {
            xGap: this.xGap,
            yGap: this.yGap,
            decross: this.decross,
            greedy: this.greedy,
            quad: this.quad,
            layering: this.layering,
            hasCurves: this.hasCurves,
            bump: this.bump,
        };
        const decrossFailed = this.nodeArranger.arrangeNodes(this.project, layoutOptions);
        this.dashboard.updateProject(this.project, false);
        if (decrossFailed) {
            this.toastr.error('Decrossing arrows took too long', 'Ignored Decross.');
        }
    }
}
