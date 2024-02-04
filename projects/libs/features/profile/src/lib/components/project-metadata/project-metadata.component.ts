import { Inject, Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClaimsService } from '@critical-pass/auth';
import { Project } from '@critical-pass/project/types';
import { DashboardService, DASHBOARD_TOKEN, ProjectList, LIST_ACTION, ProjectListApiService } from '@critical-pass/shared/data-access';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'cp-project-metadata',
    templateUrl: './project-metadata.component.html',
    styleUrls: ['./project-metadata.component.scss'],
})
export class ProjectMetadataComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    public project!: Project;
    public isAdmin: boolean = false;
    public groupList: ProjectList[] = [];
    public ListAction = LIST_ACTION;
    public allowAdd: boolean = false;
    public myControl = new FormControl();
    public filteredOptions!: Observable<string[]>;
    private initializedProjectLists: boolean = false;
    constructor(
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
        private claimsService: ClaimsService,
        private projectListApi: ProjectListApiService,
    ) {}
    ngOnInit() {
        this.isAdmin = this.claimsService.isAdmin();
        this.dashboard.activeProject$.pipe(filter(x => !!x)).subscribe(project => {
            this.project = project;
            if (project?.profile?.id && !this.initializedProjectLists) {
                this.getProjectLists();
                this.initializedProjectLists = true;
            }
        });

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            tap(value => this.onListValueChange(value)),
            switchMap(filterTxt => this.getOptions(filterTxt)),
        );
    }
    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
    updateProject() {
        this.dashboard.updateProject(this.project, true);
    }
    public onListValueChange(value: any): void {
        if (!value) {
            this.allowAdd = false;
            return;
        }
        if (this.groupList.find(x => x.name === value)) {
            this.allowAdd = false;
            return;
        }
        this.allowAdd = true;
        return value;
    }
    public addToList(): void {
        const listValue = this.myControl.value;
        if (listValue) {
            if (this.groupList.find(x => x.name === listValue)) {
                this.myControl.setValue('');
                return;
            }
            const newList: ProjectList = { name: listValue, id: 0, isNew: true, action: LIST_ACTION.ADD };
            this.groupList.push(newList);
            this.myControl.setValue('');
        }
    }
    public setAction(action: LIST_ACTION, list: ProjectList): void {
        if (action === LIST_ACTION.REMOVE && list.isNew) {
            this.groupList = this.groupList.filter(x => x.id !== list.id);
            list.action = action;
            list.isNew = false;
            return;
        }
        list.action = action;
    }
    // For autocompleting list
    public getOptions(filterTxt: string): Observable<string[]> {
        return this.projectListApi.getGroupLists(filterTxt).pipe(map(x => x.filter(y => !this.groupList.find(z => z.name === y))));
    }
    // For getting this project's lists
    public getProjectLists(): void {
        this.projectListApi.getProjectLists(this.project.profile.id).subscribe(listNames => {
            this.groupList = [];
            listNames.forEach(x => {
                const newList: ProjectList = { name: x, id: -1, isNew: false };
                this.groupList.push(newList);
            });
        });
    }
    // Need to check on the backend if we need to merge when we add so we don't create duplicates
    public processProjectLists(): void {
        this.projectListApi.processProjectList(this.project.profile.id, this.groupList).subscribe(listNames => {
            this.groupList = [];
            listNames.forEach(x => {
                const newList: ProjectList = { name: x, id: -1, isNew: false };
                this.groupList.push(newList);
            });
        });
    }
}
