import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity, Project } from '@critical-pass/project/types';
import { DashboardService, DASHBOARD_TOKEN, EventService, EVENT_SERVICE_TOKEN } from '@critical-pass/shared/data-access';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CORE_CONST } from '@critical-pass/core';
import { ProjectCompilerService } from '@critical-pass/project/processor';

@Component({
    selector: 'proj-meta-graph-layout',
    templateUrl: './network-layout.component.html',
    styleUrls: ['./network-layout.component.scss'],
})
export class NetworkLayoutComponent {
    public id: number;
    public parentId!: number;
    public project$!: Observable<Project>;
    public project!: Project;
    public refreshCount = 0;
    private subscription!: Subscription;
    private newProjSub!: Subscription;
    public breadcrumb: Crumb[] = [];
    public networkArray$!: BehaviorSubject<Project[]>;
    public selectedNetworkProject$!: Subject<number>;
    public filteredNetworkArray$!: BehaviorSubject<Project[]>;
    public selectedActivity: Activity | null = null;
    public subProjectIds!: Map<number, boolean>;
    public previousEFT: number | null = null;
    constructor(
        route: ActivatedRoute,
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
        @Inject(EVENT_SERVICE_TOKEN) private eventService: EventService,
        private projectCompiler: ProjectCompilerService,
    ) {
        this.id = +route.snapshot.params['id'];

        this.project$ = this.dashboard.activeProject$;
        this.networkArray$ = this.eventService.get(CORE_CONST.NETWORK_ARRAY_KEY);
        this.networkArray$.next([]);
        this.subscription = this.project$.pipe(filter(x => !!x)).subscribe(project => {
            this.refreshCount++;
            let crumb: Crumb[] = [];
            this.selectedActivity = project.profile.view.selectedActivity;
            this.subProjectIds = new Map<number, boolean>();
            project.activities.forEach(x => {
                if (x.subProject.subGraphId) {
                    this.subProjectIds.set(x.subProject.subGraphId, true);
                }
            });
            if (project != this.project) {
                if (project.profile.parentProject) {
                    this.breadcrumb = this.getBreadcrumb(crumb, project.profile.parentProject);
                    crumb = crumb.reverse();
                }
                const projects = this.networkArray$.getValue();
                if (projects) {
                    const parent = projects.find(x => !!x.activities.find(x => x.subProject.subGraphId === project.profile.id));
                    if (parent) {
                        this.parentId = parent!.profile.id;
                    }
                }
                this.previousEFT = project.profile.staffing.eft ?? null;
            } else if (this.previousEFT !== (project.profile.staffing.eft ?? null)) {
                this.previousEFT = project.profile.staffing.eft ?? null;
                this.updateParentProject(project);
            }

            this.project = project;
        });

        this.filteredNetworkArray$ = this.eventService.get(CORE_CONST.FILTERED_NETWORK_ARRAY_KEY);
        this.filteredNetworkArray$.next([]);
        this.newProjSub = this.eventService
            .get<Project>(CORE_CONST.CREATED_PROJECT)
            .pipe(filter(x => !!x))
            .subscribe(proj => {
                this.subProjectIds.set(proj.profile.id, true);
                if (this.selectedActivity) {
                    this.selectedActivity.subProject.subGraphId = proj.profile.id;
                }
                const networkArray = this.networkArray$.getValue();
                const filteredArray = this.filteredNetworkArray$.getValue();
                if (networkArray.length === 0) {
                    networkArray.push(this.project);
                    filteredArray.push(this.project);
                }
                networkArray.push(proj);
                filteredArray.push(proj);
            });
    }

    public getBreadcrumb(crumb: Crumb[], project: Project): Crumb[] {
        if (!project) {
            return crumb;
        }
        const projectId = project.profile.id;
        const name = project.profile.name;
        const crumbEl: Crumb = {
            projectId,
            name,
        };
        crumb.push(crumbEl);

        if (project.profile.parentProject) {
            this.getBreadcrumb(crumb, project.profile.parentProject);
        }
        return crumb;
    }

    public canDeactivate(): boolean {
        return this.refreshCount < 2;
    }
    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.newProjSub?.unsubscribe();
    }
    public load(projectId: number): void {
        const nodes = this.networkArray$.getValue();
        const node = nodes.find(x => x.profile.id === projectId);
        if (node && this.project) {
            this.project.profile.view.activeSubProjectId = null;
            this.project.profile.view.selectedActivity = null;
            this.project.profile.view.lassoOn = false;
            this.project.profile.view.lassoEnd = null;
            this.project.profile.view.lassoStart = null;
            this.project.profile.view.lassoedLinks = [];
            this.project.profile.view.lassoedNodes = [];
            node.profile.view.autoZoom = true;
            this.dashboard.updateProject(node, false);
        }
    }
    public setActiveSubProject(id: number) {
        if (this.project?.activities.length > 0) {
            const selectedActivity = this.project.activities.find(x => x.subProject.subGraphId === id);
            if (selectedActivity) {
                this.project.profile.view.selectedActivity = selectedActivity;
                this.dashboard.updateProject(this.project, false);
            }
        }
    }
    public updateProject(project: Project, projects: Project[]) {
        const parentId = project.profile.parentProjectId;
        const parent = projects.find(x => x.profile.id === parentId);
        if (parent) {
            const activityId = project.profile.subProject.activityParentId;
            const activity = parent.activities.find(x => x.profile.id === activityId);
            let dateUpdated = activity?.profile.duration !== project.profile.staffing.eft;
            if (activity) {
                activity.profile.duration = project.profile.staffing.eft;
                dateUpdated = true;
            }
            this.projectCompiler.compile(parent);
            const duplicate = { ...parent };
            projects.splice(projects.indexOf(parent), 1, duplicate);

            // The first parent project gets updated from sidebar input, by the time it gets here, the eft has already been updated
            // Calling it this way updates all projects in lineage if the current project eft changes.
            if (dateUpdated) {
                this.updateProject(parent, projects);
            }
        }
    }
    public updateParentProject(project: Project) {
        const projects = this.filteredNetworkArray$.getValue();
        this.updateProject(project, projects);
    }
    public setFilterProject(node: NetworkNode) {}
}

export interface NetworkNode {
    project: Project;
    isFiltered: boolean;
    breadcrumb: Crumb[];
}

export interface Crumb {
    name: string;
    projectId: number;
}
