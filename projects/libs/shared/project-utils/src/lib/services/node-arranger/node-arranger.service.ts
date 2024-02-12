import { Injectable } from '@angular/core';
import { LoggerService } from '@critical-pass/core';
import { Activity, Integration, Project } from '@critical-pass/project/types';
import * as d3 from 'd3';
import * as d3dag from 'd3-dag';

@Injectable({
    providedIn: 'root',
})
export class NodeArrangerService {
    offset = 500;
    scaleFactor = 7;
    multiChartOffset = 0;
    multiChartscaleFactor = 3;

    defaultLayoutProps: LayoutProps = {
        xGap: 15,
        yGap: 15,
        decross: true,
        greedy: false,
        quad: false,
        layering: 'longestPath',
        hasCurves: true,
        bump: true,
    };

    constructor(private logger: LoggerService) {}

    public setXYLocations(node: any, project: Project, offset: number, scaleFactor: number) {
        const inode = project.integrations.find(i => i.id === +node.id);
        if (inode) {
            inode.x = node.y * (offset + project.activities.length * scaleFactor);
            inode.y = node.x * (offset + project.activities.length * scaleFactor);
        }
        node.children.forEach((c: any) => {
            this.setXYLocations(c, project, offset, scaleFactor);
        });
    }

    public connectWithFakeStart(project: Project, dagNodes: any[]): { scale: number; offset: number } {
        const starts = project.integrations.filter(x => {
            const incoming = project.activities.filter(y => y.chartInfo.target_id === x.id);
            return incoming.length === 0;
        });
        if (starts.length > 1) {
            dagNodes.push({ id: -10000, parentIds: [] });
            starts.forEach((x, i) => {
                const node = dagNodes.find(y => y.id === x.id);
                if (node) {
                    dagNodes.splice(dagNodes.indexOf(node), 1);
                }
                dagNodes.push({ id: x.id, parentIds: [-10000] });
                return { scale: this.multiChartscaleFactor, offset: this.multiChartOffset };
            });
        }
        return { scale: this.scaleFactor, offset: this.offset };
    }
    // d3Dag: https://codepen.io/brinkbot/pen/oNQwNRv
    public arrangeNodes(project: Project, layoutProps: LayoutProps | undefined = this.defaultLayoutProps): boolean {
        const dagNodes: any[] = [];

        project.integrations.forEach(i => {
            const incomming = project.activities.filter(a => a.chartInfo.target_id === i.id).map(a => a.chartInfo.source_id);
            dagNodes.push({ id: i.id, parentIds: incomming.map(x => x + '') });
        });
        this.connectWithFakeStart(project, dagNodes);

        const builder = d3dag.graphStratify().id((d: any) => d.id + '');
        const graph = builder(dagNodes);
        const nodeRadius = 18;
        const nodeSize = [nodeRadius * 2, nodeRadius * 2] as const; // size of node for layout positions, integrations drawn elsewhere
        const line = layoutProps.bump ? d3.line().curve(d3.curveBumpX) : d3.line().curve(d3.curveMonotoneX);
        const shape = d3dag.tweakShape(nodeSize, d3dag.shapeEllipse);

        const sugiyama = d3dag.sugiyama();
        let algorithm;
        switch (layoutProps.layering) {
            case 'longestPath':
                algorithm = sugiyama.layering(d3dag.layeringLongestPath());
                break;
            case 'topological':
                algorithm = sugiyama.layering(d3dag.layeringTopological());
                break;
            default:
                algorithm = sugiyama.layering(d3dag.layeringLongestPath());
                break;
        }
        if (layoutProps.greedy) {
            algorithm = algorithm.coord(d3dag.coordGreedy());
        }
        if (layoutProps.quad) {
            algorithm = algorithm.coord(d3dag.coordQuad());
        }
        const crossedLayout = algorithm
            .nodeSize(nodeSize)
            .gap([nodeRadius + layoutProps.yGap, nodeRadius + layoutProps.xGap]) // length of arrow bodies and distance between nodes // .gap([nodeRadius, nodeRadius])
            .tweaks([shape]);

        let decrossFailed = false;
        if (layoutProps.decross) {
            const decrossedLayout = algorithm
                .decross(d3dag.decrossOpt())
                .nodeSize(nodeSize)
                .gap([nodeRadius + layoutProps.yGap, nodeRadius + layoutProps.xGap]) // length of arrow bodies and distance between nodes // .gap([nodeRadius, nodeRadius])
                .tweaks([shape]);
            try {
                decrossedLayout(graph);
                this.logger.debug('decrossing layout');
            } catch (e) {
                crossedLayout(graph);
                this.logger.debug('crossed layout');
                decrossFailed = true;
            }
        } else {
            crossedLayout(graph);
            this.logger.debug('crossed layout');
        }

        const nodes = Array.from(graph.nodes());
        const links = Array.from(graph.links());

        const actMap: Map<number, Map<number, Activity>> = new Map();
        project.activities
            .filter(a => !a.chartInfo.milestoneNodeId)
            .forEach(a => {
                this.addActivity(actMap, a.chartInfo.target_id, a.chartInfo.source_id, a);
            });

        const intMap: Map<number, Integration> = new Map();
        project.integrations.forEach(i => {
            intMap.set(i.id, i);
        });

        nodes.forEach(n => {
            const int = intMap.get(+n.data.id);
            int!.y = n.ux;
            int!.x = n.uy;
        });
        links.forEach(l => {
            const act = actMap.get(+l.target.data.id)?.get(+l.source.data.id);
            if (act && l.points) {
                if (!layoutProps.hasCurves) {
                    act.chartInfo.dPath = undefined;
                    return;
                }
                act.chartInfo.dPath = line(l.points.map(p => [p[1], p[0]])) ?? undefined;
            }
        });
        project.profile.view.autoZoom = true;
        return decrossFailed;

        // // Arrow heads --- This could replace current arrow head to change arrow head color and animation
        // // Arrows
        // const arrowSize = 80;
        // const arrowLen = Math.sqrt((4 * arrowSize) / Math.sqrt(3));
        // const arrow = d3.symbol().type(d3.symbolTriangle).size(arrowSize);
        // svg
        //   .select("#arrows")
        //   .selectAll("path")
        //   .data(graph.links())
        //   .join((enter) =>
        //     enter
        //       .append("path")
        //       .attr("d", arrow)
        //       .attr("fill", ({ target }) => colorMap.get(target.data.id)!)
        //       .attr("transform", arrowTransform)
        //       .attr("opacity", 0)
        //       .attr("stroke", "white")
        //       .attr("stroke-width", 2)
        //       // use this to put a white boundary on the tip of the arrow
        //       .attr("stroke-dasharray", `${arrowLen},${arrowLen}`)
        //       .call((enter) => enter.transition(trans).attr("opacity", 1))
        //   );
    }

    private addActivity(actMap: Map<number, Map<number, Activity>>, outerKey: number, innerKey: number, activity: Activity) {
        if (!actMap.has(outerKey)) {
            actMap.set(outerKey, new Map());
        }
        const innerMap = actMap.get(outerKey);
        innerMap!.set(innerKey, activity);
    }
}

export interface LayoutProps {
    xGap: number;
    yGap: number;
    decross: boolean;
    greedy: boolean;
    quad: boolean;
    layering: string;
    hasCurves: boolean;
    bump: boolean;
}
