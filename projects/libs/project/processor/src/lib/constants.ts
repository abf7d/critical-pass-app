// import { TreeNode } from '../models/assign/tree-node';
// import * as d3 from 'd3';
// export const activityDrawnKey = 'arrow.activity.drawn';
// export const activityTypedKey = 'arrow.activity.typed';
// export const projectKey = 'project.data.key';
// export const activtyCreatedKey = 'arrow.create.focus';
// export const parentKey = 'parent';
// export const decompressAmount = 'risk.curve.decompress.amount';
// export const triggerSecondDerivative = 'risk.curve.trigger.derivative';
// export const riskCurveType = 'risk.curve.risk.type';
// export const activityRiskKey = 'activity';
// export const criticalytRiskKey = 'criticality';
// export const fibonacciRiskKey = 'fibonacci';
// export const actualClass = 'actual';
// export const plannedClass = 'planned';
// export const shallowSregressionTypeKey = 'shallow.s.regression.type';
// export const linearRegType = 'linear';
// export const polynomialRegType = 'polynomial';
// export const branchKey = 'project.tree.branch';
// export const commitKey = 'project.tree.commit';
// export const resetKey = 'project.tree.reset';
// export const selectedTreeNode = 'project.tree.selected.node';
// export const historySeedProj = 'project.tree.seed.project';
// export const historyArray = 'project.tree.history.array';
// export const networkArray = 'project.newtwork.array';
// export const filteredNetworkArray = 'project.filtered.newtwork.array';
// export const loadTree = 'project.tree.history.file';
// export const initialNodeCount = 0;
// export const completedAssignmentsKey = 'project.tree.completed.assignments';
// export const timeCostCalculatePointsKey = 'time.cost.calculate.points';
// export const assignCompletedProjects = 'assign.completed.projects';
// export const selectedIntegration = 'project.profile.view.selectedIntegration';
// export const viewDummiesInGridKey = 'activity.grid.view.dumimes';

// export const RiskColor = {
//     New: '#fff',
//     Low: '#1c1',
//     Medium: '#ffd800',
//     High: '#f00',
//     Critical: '#000',
//     Unprocessed: '#bbb',
//     Completed: '#ffddff',
//     Start: '#f00',
//     End: '#00f',
//     Unassigned: '#555',
// };
// export const DonutColor = {
//     Low: '#7c7',
//     Medium: '#ff7',
//     High: '#f44',
//     Critical: '#555',
//     Unprocessed: '#bbb',
// };
// export const transitionTime = 1200;
// export const arrowEaseType = d3.easeExpInOut;
// export const weeks = 21;
// export const floatIncrements = 7;
// export const shallowSFormat = 'M-d-yyyy';
// export const europeanDateFormat = 'd-M-YYYY';

// export const activitiesWsName = 'Activities';
// export const arrowWsName = 'Arrow Info';
// export const integrationWsName = 'Integrations';
// export const profileWsName = 'Profile';
// export const phasesWsName = 'Phases';
// export const rolesWsName = 'Roles';
// export const resourcesWsName = 'Resources';
// export const activityResourcesWsName = 'Activity Assigned Resources';
// export const activityPhasesWsName = 'Activity Assinged Phases';
// export const resourceRolesWsName = 'Resource Roles';
// export const tagPoolWsName = 'Tag Pool';
// export const activityTagsWsName = 'Activity Tags';
// export const newProjectId = -1;
// export const libraryRoute = 'library/(grid/0//sidebar:libar/0)';
// export const assignRoute = 'assign/(-1//sidebar:arrow/-1)';
// export const importProfileRoute = 'profile/(-2//sidebar:grid/-2)';
// export const importIdRouteParam = -2;
// export const parentNodeColName = 'parentNodeId';
// export const nodeColName = 'nodeId';
// export const subArrowCreationMode = 'sub';
export const MULTI_ARROW_CREATION_MODE = 'multi';

export const MAIN_DATE_FORMAT = 'M/d/yyyy';
export enum RISK_CODE {
    New = -1,
    Low,
    Medium,
    High,
    Critical,
}
