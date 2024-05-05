import { Inject, Injectable } from '@angular/core';
import { TimeCostState, TimeCostStateFactory } from '../time-cost-state/time-cost-state';
import * as d3 from 'd3';
import { forkJoin, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Project, TimeCostPoint, TreeNode } from '@critical-pass/project/types';
import { DASHBOARD_TOKEN, EventService, EVENT_SERVICE_TOKEN, ZametekApiService } from '@critical-pass/shared/data-access';
import { CompletionNodeCalcService } from '../../../services/completion-node-calc/completion-node-calc.service';
import { ProjectCompilerService } from '@critical-pass/project/processor';
import * as CONST from '../../../constants/constants';
import { FileCompilerService, IndirectCostCalculatorService, PcdAutogenService } from '@critical-pass/shared/project-utils';
import { ProjectTreeNodeSerializerService } from '../../../services/project-tree-node-serializer/project-tree-node-serializer.service';
import { error } from 'console';
@Injectable({
    providedIn: 'root',
})
export class TimeCostUiService {
    private id!: number;
    public st!: TimeCostState;
    private sub!: Subscription;
    private historyArray!: TreeNode[];
    private selectedNodeId!: number;

    constructor(
        @Inject(EVENT_SERVICE_TOKEN) private eventService: EventService,
        private completion: CompletionNodeCalcService,
        private fileCompiler: FileCompilerService,
        private pcdAutoGen: PcdAutogenService,
        private indirects: IndirectCostCalculatorService,
        private treeSerializer: ProjectTreeNodeSerializerService,
        private zametekApi: ZametekApiService,
    ) {}

    private initSvg(width: number, height: number, el: any): void {
        const svgclass = 'risk-curve-' + this.id;
        d3.select(el).select('svg').remove();
        this.st.svg = d3.select(el).append('svg').attr('class', svgclass).attr('width', width).attr('height', height).append('g');
        this.st.mainG = this.st.svg.append('g').attr('transform', `translate(${this.st.margin.left},${this.st.margin.top})`);
    }

    public calculateTimeCostPoints(): Promise<TimeCostPoint[]> {
        return new Promise((resolve, reject) => {
            this.createChart(this.historyArray)
                .then(timeCostPoints => resolve(timeCostPoints))
                .catch(error => reject(error));
        });
    }

    public init(width: number, height: number, id: number, el: any) {
        this.id = id;
        this.st = new TimeCostStateFactory().create();
        this.st.innerHeight = height - this.st.margin.top - this.st.margin.bottom;
        this.st.innerWidth = width - this.st.margin.left - this.st.margin.right;
        this.initSvg(width, height, el);
        this.sub = this.eventService
            .get<TreeNode[]>(CONST.HISTORY_ARRAY_KEY)
            .pipe(filter(x => !!x))
            .subscribe(historyArray => (this.historyArray = historyArray));
    }

    private createChart(historyArray: TreeNode[]): Promise<TimeCostPoint[]> {
        return new Promise((resolve, reject) => {
            this.getTimeCostForCompletedPoints(historyArray)
                .then(timeCostPoints => {
                    this.clearChart(timeCostPoints);
                    this.drawChart(timeCostPoints);
                    resolve(timeCostPoints);
                })
                .catch(error => reject(error));
        });
    }

    private getTimeCostForCompletedPoints(historyArray: TreeNode[]): Promise<TimeCostPoint[]> {
        return new Promise((resolve, reject) => {
            const nodes = this.completion.getCompletedNodes(historyArray);
            const apiCalls = nodes.map(node => this.zametekApi.compileArrowGraph(node.data!));
            forkJoin(apiCalls).subscribe(
                results => {
                    const calculatedProjects: TreeNode[] = [];
                    const timeCostPoints: TimeCostPoint[] = [];
                    results.forEach((project, i) => {
                        if (project) {
                            this.fileCompiler.compileProjectFromFile(project);
                            this.pcdAutoGen.autogeneratePcds(project);
                            const point = this.getTimeCostPoint(project, nodes[i].id);
                            timeCostPoints.push(point);
                            const completedNode = this.treeSerializer.fromJson(nodes[i]);
                            completedNode.data = project;
                            calculatedProjects.push(completedNode);
                        }
                    });
                    this.eventService.get(CONST.ASSIGN_COMPLETED_PROJECTS).next(calculatedProjects);
                    this.eventService.get(CONST.ASSIGN_TIMECOST_POINTs).next(timeCostPoints);
                    resolve(timeCostPoints);
                },
                (error: any) => reject(error),
            );
        });
    }

    private getTimeCostPoint(project: Project, nodeId: number): TimeCostPoint {
        const sortedIntegrations = project.integrations.sort((a, b) => a.eft - b.eft);
        const last = project.integrations[sortedIntegrations.length - 1];
        let time = null;
        if (last.eft > 0) {
            time = last.eft; // days
        }
        const cost = this.indirects.calculateIndirectCosts(project);
        const point: TimeCostPoint = { time, cost, nodeId };
        return point;
    }

    public destroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private createAxisTitles(): void {
        const titlegroup = this.st.mainG.append('g').attr('class', 'titles');
        const { top, right, bottom, left } = this.st.margin;
        titlegroup
            .append('text')
            .text('Time (days)')
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(' + this.st.innerWidth! / 2 + ', ' + (this.st.innerHeight! + top) + ') scale(1)');

        titlegroup
            .append('text')
            .text('Cost (Man-days)')
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(-40,' + this.st.innerHeight! / 2 + ') rotate(270)');
    }
    public clearChart(timeCostPoints: TimeCostPoint[]) {
        const isEmpty = timeCostPoints.length === 0;
        this.st.mainG.selectAll('*').remove();
        this.st.svg.select('g.empty-msg').remove();
        if (isEmpty) {
            const message = 'No data exists for Time Cost curve';
            this.st.svg.attr('transform', null);
            this.st.svg
                .append('g')
                .attr('class', 'empty-msg')
                .append('text')
                .attr('class', 'missing-data')
                .attr('y', this.st.innerHeight! / 3)
                .attr('x', this.st.innerWidth! / 2 + 100)
                .style('text-anchor', 'end')
                .text(message);
            return;
        }
    }
    public drawChart(timeCostPoints: TimeCostPoint[]) {
        this.st.mainG.selectAll('*').remove();
        const xScale = d3
            .scaleLinear()
            .domain([0, Math.max(...timeCostPoints.map(x => x.time!))])
            .range([0, this.st.innerWidth!]);

        const yScale = d3
            .scaleLinear()
            .domain([0, Math.max(...timeCostPoints.map(x => x.cost!))])
            .range([this.st.innerHeight!, 0]);

        this.st.mainG
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + this.st.innerHeight + ')')
            .call(d3.axisBottom(xScale));

        this.st.mainG.append('g').attr('class', 'y axis').call(d3.axisLeft(yScale));

        this.createAxisTitles();

        this.st.mainG
            .selectAll('.dot')
            .data(timeCostPoints)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .classed('selected-options', (d: any) => d.nodeId === this.selectedNodeId)
            .attr('cx', (d: any, i: any) => xScale(d.time))
            .attr('cy', (d: any) => yScale(d.cost))
            .attr('r', 4)
            .on('click', (event: any, d: any) => {
                this.eventService.get(CONST.SELECTED_TREE_NODE_KEY).next(d.nodeId);
                this.selectedNodeId = d.nodeId;
                this.drawChart(timeCostPoints);
            });
    }
}
