import { Injectable } from '@angular/core';
import { LoggerService } from '@critical-pass/core';
import { Activity, Integration, Project } from '@critical-pass/project/types';
import * as d3 from 'd3';
import * as d3dag from 'd3-dag';
import { tr } from 'date-fns/locale';
import { link } from 'fs';

@Injectable({
    providedIn: 'root',
})
export class NodeArrangerService {
    offset = 500;
    scaleFactor = 7;
    multiChartOffset = 0;
    multiChartscaleFactor = 3;

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
    //import * as d3 from "https://cdn.skypack.dev/d3@7.8.4";
    public arrangeNodes(project: Project): void {
        const dagNodes: any[] = [];

        project.integrations.forEach(i => {
            const incomming = project.activities.filter(a => a.chartInfo.target_id === i.id).map(a => a.chartInfo.source_id);
            dagNodes.push({ id: i.id, parentIds: incomming.map(x => x + '') });
        });
        this.connectWithFakeStart(project, dagNodes);

        const builder = d3dag.graphStratify().id((d: any) => d.id + '');
        const graph = builder(dagNodes);
        const nodeRadius = 18;
        const nodeSize = [nodeRadius * 2, nodeRadius * 2] as const;
        const line = d3.line().curve(d3.curveBumpX);
        const shape = d3dag.tweakShape(nodeSize, d3dag.shapeEllipse);

        // extra formatting: .coord(d3dag.coordGreedy()).coord(d3dag.coordQuad()) after decross
        // https://codepen.io/brinkbot/pen/oNQwNRv
        const decrossedLayout = d3dag
            .sugiyama()
            .layering(d3dag.layeringLongestPath())
            .decross(d3dag.decrossOpt())
            .nodeSize(nodeSize)
            .gap([nodeRadius, nodeRadius])
            .tweaks([shape]);

        // decross is computationaly expensive and errors out so this is a backup
        const crossedLayout = d3dag.sugiyama().layering(d3dag.layeringLongestPath()).nodeSize(nodeSize).gap([nodeRadius, nodeRadius]).tweaks([shape]);

        try {
            decrossedLayout(graph);
            this.logger.info('decrossing layout');
        } catch (e) {
            crossedLayout(graph);
            this.logger.info('crossed layout');
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
                act.chartInfo.dPath = line(l.points.map(p => [p[1], p[0]])) ?? undefined;
            }
        });
        project.profile.view.autoZoom = true;

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
