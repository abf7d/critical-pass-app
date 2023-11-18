import { Injectable } from '@angular/core';
import * as CONST from '../../../../constants/constants';
import { Activity, Integration, Project } from '@critical-pass/project/types';
import { ArrowStateService } from '../../arrow-state/arrow-state';

@Injectable({
    providedIn: 'root',
})
export class ArrowPropertyService {
    constructor(private st: ArrowStateService) {}
    public getNodeCss(d: Integration, proj: Project): string {
        const nonMilestoneAct = this.filterOutMilestones(proj);
        if (proj.profile.view.showOrphaned) {
            const outEdges = nonMilestoneAct.filter((a: Activity) => a.chartInfo.source_id === d.id);
            const inEdges = nonMilestoneAct.filter((a: Activity) => a.chartInfo.target_id === d.id);

            if (outEdges.length === 0) {
                return 'risk-end';
            }
            if (inEdges.length === 0) {
                return 'risk-start';
            }
            return 'unprocessed risk-0';
        }
        if (d.lft === null) {
            return 'unprocessed ' + 'risk-' + d.risk;
        }
        return 'risk-' + d.risk;
    }
    public getNodeName(d: Integration): string {
        if (d.isMilestone) {
            return d.milestoneName;
        }
        return d.name;
    }
    public getTextAboveNode(d: Integration, project: Project): string {
        if (project.profile.view.showEftLft === 'label' && d.label) {
            return d.label;
        }
        if (project.profile.view.showEftLft === 'eft' && d.eft) {
            return d.eft + '/' + d.lft;
        }
        if (project.profile.view.showEftLft === 'pcd' && d.maxPCD != null) {
            return d.maxPCD;
        }
        if (project.profile.view.showEftLft === 'milestone' && d.milestoneActivity) {
            return d.milestoneActivity.profile.name!;
        }

        return '';
    }
    public getTagColor(a: Activity, groupName: string) {
        if (a.tags) {
            const tagGroup = a.tags.find(x => x.name === groupName);
            if (tagGroup) {
                const firstTag = tagGroup.tags[0];
                if (firstTag) {
                    return firstTag.backgroundcolor;
                } else {
                    return CONST.RISK_COLOR.UNPROCESSED;
                }
            } else {
                return CONST.RISK_COLOR.UNPROCESSED;
            }
        }
        return CONST.RISK_COLOR.UNPROCESSED;
    }
    public getRiskColor(risk: number): string {
        let color;
        switch (risk) {
            case CONST.RISK_CODE.NEW:
                color = CONST.RISK_COLOR.NEW;
                break;
            case CONST.RISK_CODE.LOW:
                color = CONST.RISK_COLOR.LOW;
                break;
            case CONST.RISK_CODE.MEDIUM:
                color = CONST.RISK_COLOR.MEDIUM;
                break;
            case CONST.RISK_CODE.HIGH:
                color = CONST.RISK_COLOR.HIGH;
                break;
            case CONST.RISK_CODE.CRITICAL:
                color = CONST.RISK_COLOR.CRITICAL;
                break;
            default:
                color = CONST.RISK_COLOR.UNPROCESSED;
        }
        return color;
    }
    public getArrowColor(old: boolean, a: Activity, proj: Project, risks: Map<number, number>, skipAnim: boolean): string {
        const groupName = proj.profile.view.selectedTagGroup;
        if (groupName) {
            return this.getTagColor(a, groupName);
        }
        let risk = a.chartInfo.risk;
        const record = risks.get(a.profile.id);
        if (!skipAnim && old && !!risks && record !== undefined) {
            risk = record;
        }
        let color = this.getRiskColor(risk);

        if (a.chartInfo.tf === null) {
            color = CONST.RISK_COLOR.UNPROCESSED;
        }
        if (a.chartInfo.tf === Infinity) {
            color = CONST.RISK_COLOR.UNPROCESSED;
        }
        if (proj.profile.view.showOrphaned) {
            color = CONST.RISK_COLOR.UNPROCESSED;
        }
        if (proj.profile.view.markCompleted && a.processInfo.completed) {
            color = CONST.RISK_COLOR.COMPLETED;
        }
        return color;
    }
    public getNodeColor(old: boolean, a: Integration, proj: Project, risks: Map<number, number>, skipAnim: boolean): string {
        const groupName = proj.profile.view.selectedTagGroup;
        if (groupName) {
            return CONST.RISK_COLOR.UNASSIGNED;
        }

        let risk = a.risk;
        const record = risks.get(a.id);
        if (!skipAnim && old && risks && record !== undefined) {
            risk = record;
        }
        let color = this.getRiskColor(risk);

        if (a.lft === null || a.lft === Infinity) {
            color = CONST.RISK_COLOR.UNPROCESSED;
        }
        if (proj.profile.view.markCompleted && a.completed) {
            color = CONST.RISK_COLOR.COMPLETED;
        }
        if (proj.profile.view.showOrphaned) {
            const outEdges = proj.activities.filter((ac: Activity) => ac.chartInfo.source_id === a.id);
            const inEdges = proj.activities.filter((ac: Activity) => ac.chartInfo.target_id === a.id);

            color = CONST.RISK_COLOR.UNPROCESSED;

            if (outEdges.length === 0) {
                color = CONST.RISK_COLOR.END;
            }
            if (inEdges.length === 0) {
                color = CONST.RISK_COLOR.START;
            }
        }

        return color;
    }

    /**
     * Determines css classes for node groups. These classes set opacity on the nodes. Colors
     * are programmatically set in animation.
     * @param  {Activity} d
     * @param  {Project} proj
     * @returns string
     */
    public getLinkCss(d: Activity, proj: Project): string {
        if (proj.profile.view.selectedTagGroup) {
            return 'assigning';
        }
        if (d.chartInfo.tf == null) {
            if (d.chartInfo.isDummy) {
                return 'dummy unprocessed';
            }
            return 'unprocessed';
        }
        if (proj.profile.view.showOrphaned) {
            return 'risk-0';
        }
        if (d.chartInfo.isDummy) {
            return 'dummy risk-' + d.chartInfo.risk;
        }
        return 'risk-' + d.chartInfo.risk;
    }
    public isCompleted(d: Activity, proj: Project): boolean {
        return proj.profile.view.markCompleted && d.processInfo.completed;
    }
    public isHighlighted(d: Activity, proj: Project): boolean {
        return d.subProject.subGraphId === proj.profile.view.activeSubProjectId;
    }
    public isSelected(a: Activity, proj: Project) {
        return a === this.st.selected_link || a === proj.profile.view.selectedActivity;
    }
    public getLinkEndMarker(d: Activity, proj: Project): string {
        if (d.chartInfo.tf == null || d.chartInfo.tf === Infinity) {
            return 'url(#end-u)';
        }
        if (proj.profile.view.showOrphaned) {
            return 'url(#end-u)';
        }
        if (proj.profile.view.markCompleted && d.processInfo.completed) {
            return 'url(#end-completed)';
        }
        return `url(#end-${d.chartInfo.risk})`;
    }

    public getLowerLinkText(d: Activity, proj: Project): string {
        if (proj.profile.view.lowerArrowText === 'float') {
            if (d.chartInfo.ff !== null && d.chartInfo.tf !== null && !d.chartInfo.isDummy) {
                return d.chartInfo.ff + '/' + d.chartInfo.tf;
            }
        }
        if (proj.profile.view.lowerArrowText === 'subproj') {
            if (d.subProject.subGraphLoaded !== null || d.subProject.isParent || d.risk.criticalCount > 0 || d.risk.greenCount > 0) {
                const text = `g${d.risk.greenCount}  y${d.risk.yellowCount}  r${d.risk.redCount}  c${d.risk.criticalCount}`;
                return text;
            }
        }
        return '';
    }
    public getLowerLinkTextYPos(d: Activity, proj: Project): number {
        if (d.chartInfo.source?.y === undefined || d.chartInfo.target?.y === undefined) {
            // TODO: Implement Logger
            console.error('getLowerLinkTextYPos link node is missing y position');
            return 0;
        }
        if (proj.profile.view.lowerArrowText === 'subproj') {
            return d.chartInfo.source.y + (d.chartInfo.target!.y! - d.chartInfo.source!.y!) / 2 + 14;
        }
        return d.chartInfo.source.y + (d.chartInfo.target!.y! - d.chartInfo.source!.y!) / 2 + 14;
    }
    public getLowerLinkTextXPos(d: Activity, proj: Project): number {
        if (d.chartInfo.source?.x === undefined || d.chartInfo.target?.x === undefined) {
            // TODO: Implement Logger
            console.error('getLowerLinkTextXPos link node is missing x position');
            return 0;
        }
        if (proj.profile.view.lowerArrowText === 'subproj') {
            return d.chartInfo.source.x + (d.chartInfo.target.x - d.chartInfo.source.x) / 2;
        }
        return d.chartInfo.source.x + (d.chartInfo.target.x - d.chartInfo.source.x) / 2 - 10;
    }
    public getActivityFontSize(d: Activity, proj: Project): string {
        if (proj.profile.view.lowerArrowText === 'subproj') {
            return '9px';
        }
        return '8px';
    }
    public getLinkTextPosY(d: Activity, proj: Project): number {
        if (d.chartInfo.source?.y === undefined || d.chartInfo.target?.y === undefined) {
            // TODO: Implement Logger
            console.error('getLinkTextPosY link node is missing y position');
            return 0;
        }
        if (proj.profile.view.displayText === 'name') {
            return d.chartInfo.source.y + (d.chartInfo.target.y - d.chartInfo.source.y) / 2 - 14;
        }
        return d.chartInfo.source.y + (d.chartInfo.target.y - d.chartInfo.source.y) / 2 - 6;
    }
    public getLinkTextPosX(d: Activity, proj: Project): number {
        if (d.chartInfo.source?.x === undefined || d.chartInfo.target?.x === undefined) {
            // TODO: Implement Logger
            console.error('getLinkTextPosX link node is missing x position');
            return 0;
        }
        if (proj.profile.view.displayText === 'name') {
            return d.chartInfo.source.x + (d.chartInfo.target.x - d.chartInfo.source.x) / 2 - 10;
        }
        if (d.subProject.subGraphLoaded !== null || d.subProject.isParent || d.risk.criticalCount > 0 || d.risk.greenCount > 0) {
            return d.chartInfo.source.x + (d.chartInfo.target.x - d.chartInfo.source.x) / 2 - 10;
        }
        return d.chartInfo.source.x + (d.chartInfo.target.x - d.chartInfo.source.x) / 2 - 10;
    }
    public getLinkText(d: Activity, proj: Project): string {
        let text;
        if (proj.profile.view.displayText === 'id') {
            if (!proj.profile.view.showDummies && d.chartInfo.isDummy) {
                return '';
            }
            text = d.profile.id;
        } else if (proj.profile.view.displayText === 'duration') {
            text = d.profile.duration;
        } else if (proj.profile.view.displayText === 'name') {
            if (d.chartInfo.isDummy && !proj.profile.view.showDummies) {
                return '';
            }
            text = d.profile.name;
        } else if (proj.profile.view.displayText === 'resource') {
            return d.assign.resources.map(r => r.initials).join(', ');
        } else if (proj.profile.view.displayText === 'abbreviated') {
            if (d.chartInfo.isDummy && !proj.profile.view.showDummies) {
                return '';
            }
            if (+d.profile.name! === +d.profile.id) {
                return d.profile.id.toString();
            }
            text =
                d.profile.id +
                ' ' +
                d.profile
                    .name!.split(' ')
                    .map(x => x.substring(0, 3))
                    .join(' ') +
                ' ' +
                d.profile.duration +
                'd';
        }

        text = this.getSubProjMarkerText(d, text?.toString() ?? '');
        return text;
    }
    private getSubProjMarkerText(d: Activity, text: string): string {
        if (d.subProject.subGraphLoaded !== null || d.subProject.isParent || d.risk.criticalCount > 0 || d.risk.greenCount > 0) {
            text = text + ':';
        } else if (d.subProject.subGraphId !== -1 && !d.chartInfo.isDummy) {
            text = text + '*';
        }
        return text;
    }
    private filterOutMilestones(proj: Project): Activity[] {
        return proj.activities.filter(x => x.chartInfo.milestoneNodeId === null);
    }
}
