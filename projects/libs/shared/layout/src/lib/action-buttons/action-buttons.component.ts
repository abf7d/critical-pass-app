import { Component, HostListener, Inject, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { API_CONST, PROJECT_API_TOKEN, PROJECT_STORAGE_TOKEN, ProjectApi, ProjectApiService, ProjectStorage } from '@critical-pass/shared/data-access';
import { DashboardService, DASHBOARD_TOKEN, EventService, EVENT_SERVICE_TOKEN } from '@critical-pass/shared/data-access';
import { Project } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { ProjectSanatizerService } from '@critical-pass/shared/project-utils';
import { ToastrService } from 'ngx-toastr';
import { ProjectStorageApiService } from '@critical-pass/shared/data-access';
import { CORE_CONST } from '@critical-pass/core';
import { PROJECT_STORAGE_KEY } from '../../../../data-access/src/lib/constants/constants';

@Component({
    selector: 'cp-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent implements OnInit, OnDestroy {
    @Input() id!: number;
    public showPeek!: boolean;
    public project!: Project;
    public peekProj!: Project;
    public subscription!: Subscription;
    public canUndoRedoSub!: Subscription;
    public alertMessage: string;
    public actionText: string;
    public disableButtons!: boolean;
    public isParentProject: boolean = false;
    public showHelp: boolean;
    public timestamp!: Date | null;
    public saveTooltip: string = CORE_CONST.OWNER_TOOLTIP;
    public canUndo: boolean = false;
    public canRedo: boolean = false;

    constructor(
        protected router: Router,
        @Inject(DASHBOARD_TOKEN) protected dashboard: DashboardService,
        @Inject(EVENT_SERVICE_TOKEN) protected eventService: EventService,
        private serializer: ProjectSerializerService,
        private sanitizer: ProjectSanatizerService,
        public toastr: ToastrService,
        @Inject(PROJECT_STORAGE_TOKEN) protected storageApi: ProjectStorage,
        @Inject(PROJECT_API_TOKEN) protected projectApi: ProjectApi,
        protected ngZone: NgZone,
    ) {
        this.showHelp = false;
        this.actionText = '';
        this.alertMessage = '';
    }

    public ngOnInit(): void {
        this.subscription = this.dashboard.activeProject$.subscribe(project => {
            this.project = project;
            this.timestamp = project.profile.timestamp ? new Date(project.profile.timestamp) : null;
            this.disableButtons = !project.profile.permissions.writable || !!project.profile.parentProject;
            this.isParentProject = !!project.profile.parentProject;
            this.saveTooltip = this.isParentProject ? CORE_CONST.PARENT_PROJ_TOOLTIP : CORE_CONST.OWNER_TOOLTIP;
        });
        this.canUndoRedoSub = this.dashboard.canUndoRedo$.subscribe(canUndoRedo => {
            this.canUndo = canUndoRedo.canUndo;
            this.canRedo = canUndoRedo.canRedo;
        });
        this.showPeek = false;
        this.dashboard.allowUndoRedo = true;
    }

    public async peekStorage() {
        if (this.peekProj && !this.showPeek) {
            this.showPeek = true;
            return;
        }
        if (!this.peekProj) {
            const project = await this.storageApi.get(API_CONST.LOCAL_STORAGE);

            this.ngZone.run(() => {
                if (project) {
                    this.peekProj = project;
                    this.showPeek = true;
                }
            });
            this.showPeek = true;
        }
    }

    public stash() {
        this.showPeek = false;
        try {
            this.storageApi.set(API_CONST.LOCAL_STORAGE, this.project);
        } catch (ex) {
            this.toastr.error('Stash Chart', 'Error occured.');
            console.error(ex);
            return;
        }
        this.toastr.success('Stash Chart', 'Success!');
    }

    public async unstash() {
        this.showPeek = false;
        try {
            const project = await this.storageApi.get(API_CONST.LOCAL_STORAGE);
            if (project) {
                this.dashboard.activeProject$.next(project);
            }
        } catch (ex) {
            this.toastr.error('Unstash Chart', 'Error occured.');
            console.error(ex);
            return;
        }
        this.toastr.success('Unstash Chart', 'Success!');
    }

    public save() {
        const copy = this.serializer.fromJson(this.project);
        this.sanitizer.sanatizeForSave(copy);

        if (!copy.profile.id) {
            copy.profile.id = CORE_CONST.NEW_PROJECT_ID;
        }

        this.setSaveState('Saving', '', true);
        this.projectApi.post(copy).subscribe(
            result => {
                this.eventService.get(CORE_CONST.CLEAR_CHANGE_TRACKER).next(true);
                if (result !== null) {
                    this.project.profile.timestamp = result.profile.timestamp;
                    this.sanitizer.updateIds(this.project, result);
                    this.dashboard.resetUndoRedo();
                    this.dashboard.updateProject(this.project, false);
                }
                this.setSaveState('', '', false, true);
                this.toastr.success('Save Project', 'Success!');
            },
            error => {
                this.setSaveState('', '', false, true);
                this.toastr.error('Save Project', 'Error');
                console.error(error);
            },
        );
    }

    public saveAsNew() {
        const copy = this.serializer.fromJson(this.project);
        this.sanitizer.sanatizeForSave(copy);
        copy.profile.id = CORE_CONST.NEW_PROJECT_ID;

        this.setSaveState('Saving', '', true);
        this.projectApi.post(copy).subscribe(
            result => {
                this.eventService.get(CORE_CONST.CLEAR_CHANGE_TRACKER).next(true);

                this.router.navigateByUrl(CORE_CONST.LIBRARY_ROUTE);
                if (result !== null) {
                    this.sanitizer.updateIds(this.project, result);
                    this.dashboard.resetUndoRedo();
                    this.dashboard.updateProject(this.project, false);
                }
                this.setSaveState('', '', false, true);
                this.toastr.success('Save Copy', 'Success!');
            },
            error => {
                this.setSaveState('', '', false, true);
                this.toastr.error('Save Copy', 'Error');
                console.error(error);
            },
        );
    }
    public delete() {
        this.disableButtons = true;
        this.actionText = 'Deleting Project';
        this.eventService.get(CORE_CONST.CLEAR_CHANGE_TRACKER).next(true);

        this.projectApi.delete(this.id).subscribe(
            _ => {
                this.toastr.success('Delete Project', 'Success!');
                this.router.navigateByUrl(CORE_CONST.LIBRARY_ROUTE);
            },
            error => {
                this.toastr.error('Delete Project', 'Error');
                console.error(error);
            },
        );
    }
    public undo() {
        this.dashboard.undo();
    }
    public redo() {
        this.dashboard.redo();
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'z') {
            // Use event.metaKey on Mac
            this.dashboard.undo();
        }
        if (event.ctrlKey && event.key === 'y') {
            // Use event.metaKey on Mac
            this.dashboard.redo();
        }
    }

    public setSaveState(actionTxt: string, alertMsg: string, disabled: boolean, clearMsg: boolean = false) {
        this.actionText = actionTxt;
        this.alertMessage = alertMsg;
        this.disableButtons = disabled;
        if (clearMsg) {
            setTimeout(() => (this.alertMessage = ''), 2000);
        }
    }
    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.canUndoRedoSub?.unsubscribe();
        this.dashboard.resetUndoRedo();
    }
}