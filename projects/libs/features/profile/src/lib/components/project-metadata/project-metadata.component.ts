import { Inject, Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClaimsService } from '@critical-pass/auth';
import { Project } from '@critical-pass/project/types';
import { DashboardService, DASHBOARD_TOKEN } from '@critical-pass/shared/data-access';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
    selector: 'cp-project-metadata',
    templateUrl: './project-metadata.component.html',
    styleUrls: ['./project-metadata.component.scss'],
})
export class ProjectMetadataComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    public project!: Project;
    public isAdmin: boolean = false;
    public groupList: ProjectList[] = [
        { name: 'Group 1', id: 1, isNew: false, action: LIST_ACTION.ADD },
        { name: 'Group 2', id: 2, isNew: false, action: LIST_ACTION.REMOVE },
        { name: 'Group 3', id: 3, isNew: true, action: LIST_ACTION.ADD },
    ];
    public ListAction = LIST_ACTION;
    public allowAdd: boolean = false;
    constructor(
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
        private claimsService: ClaimsService,
    ) {}

    ngOnInit() {
        this.isAdmin = this.claimsService.isAdmin();
        this.dashboard.activeProject$.pipe(filter(x => !!x)).subscribe(project => {
            this.project = project;
        });

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }

    updateProject() {
        this.dashboard.updateProject(this.project, true);
    }

    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions!: Observable<string[]>;
    listValue: string = '';
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    public onListValueChange(value: any): void {
        this.listValue = value;
        if (!this.listValue) {
            this.allowAdd = false;
            return;
        }
        if (this.groupList.find(x => x.name === this.listValue)) {
            this.allowAdd = false;
            return;
        }
        this.allowAdd = true;
    }

    public addToList(): void {
        if (this.listValue) {
            if (this.groupList.find(x => x.name === this.listValue)) {
                this.listValue = '';
                return;
            }
            const newList: ProjectList = { name: this.listValue, id: 0, isNew: true, action: LIST_ACTION.ADD };
            this.groupList.push(newList);
            this.listValue = '';
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
}

enum LIST_ACTION {
    ADD = 'Add',
    REMOVE = 'Remove',
}
export interface ProjectList {
    name: string;
    id: number;
    isNew: boolean;
    action: LIST_ACTION;
}
