import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, Tag, TagButton, TagGroupOption } from '@critical-pass/project/types';
import { DashboardService, DASHBOARD_TOKEN } from '@critical-pass/shared/data-access';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'cp-graph-options',
    templateUrl: './graph-options.component.html',
    styleUrls: ['./graph-options.component.scss'],
})
export class GraphOptionsComponent implements OnInit, OnDestroy {
    private data!: Observable<any>;
    public project!: Project | null;
    private subscription!: Subscription;
    public hasTagGroups: boolean = false;
    public hasTags: boolean = false;
    public showTagGroups: boolean = false;
    public showTags: boolean = false;
    public tagGroup: string = 'resource';
    public tagGroups: TagGroupOption[] | undefined = [];
    public selectedTagGroup: TagGroupOption | undefined = undefined;
    public selectedFadeGroup: TagGroupOption | undefined = undefined;
    public fadeTags: Tag[] | null = null;
    public tags: TagButton[] = [];
    public groupTextValue: string | null = null;
    constructor(
        private route: ActivatedRoute,
        @Inject(DASHBOARD_TOKEN) private dashboard: DashboardService,
    ) {}

    public ngOnInit() {
        this.project = null;
        this.data = this.dashboard.activeProject$;
        this.subscription = this.data.pipe(filter(x => !!x)).subscribe(project => {
            this.project = project;
            this.tagGroups = this.project?.tags;
            this.hasTagGroups = this.tagGroups ? this.tagGroups.length > 0 : false;
        });
    }
    public updateProject() {
        if (this.project !== null) {
            this.dashboard.updateProject(this.project, true);
        }
    }
    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    public setArrowUperText(type: string) {
        if (this.project !== null) {
            this.groupTextValue = null;
            this.project.profile.view.displayText = type;
            this.updateProject();
        }
    }
    public toggleTextWrap() {
        if (this.project !== null) {
            this.project.profile.view.wrapText = !this.project.profile.view.wrapText;
            this.updateProject();
        }
    }
    public setArrowUperTextTagGroup(index: number) {
        if (this.project !== null) {
            this.selectedTagGroup = this.tagGroups ? this.tagGroups[index] : undefined;
            this.hasTags = this.selectedTagGroup ? this.selectedTagGroup.tags.length > 0 : false;
            this.tags = this.selectedTagGroup ? this.selectedTagGroup.tags : [];
            this.project.profile.view.displayText = `tag.${index}`;
            this.updateProject();
        }
    }
    public fadeToTag(event: any) {
        const tagIndex = event.target.value;
        if (this.project !== null) {
            this.project.profile.view.markCompleted = false;
            const groupIndex = this.project.tags?.indexOf(this.selectedFadeGroup!);
            this.project.profile.view.fade = `tag.${groupIndex}.${tagIndex}`;
            this.updateProject();
        }
    }
    public setNodeDisplayText(type: string) {
        if (this.project !== null) {
            this.project.profile.view.showEftLft = type;
            this.updateProject();
        }
        let x = 0;
        let y = 0;  
    }
    public setArrowLowerText(type: string) {
        if (this.project !== null) {
            this.project.profile.view.lowerArrowText = type;
            this.updateProject();
        }
    }
    public isArrowUpperText(val: string): boolean {
        if (this.project !== null) {
            return this.project.profile.view.displayText === val;
        }
        return false;
    }
    public istNodeDisplayText(type: string): boolean {
        if (this.project !== null) {
            return this.project.profile.view.showEftLft === type;
        }
        return false;
    }
    public istNodeLowerText(type: string): boolean {
        if (this.project !== null) {
            return this.project.profile.view.lowerArrowText === type;
        }
        return false;
    }
    public selectFadeGroup(event: any) {
        const index = parseInt(event.target.value);
        if (index > -1) {
            this.selectedFadeGroup = this.project?.tags ? this.project.tags[index] : undefined;
            if (this.selectedFadeGroup) {
                this.fadeTags = this.selectedFadeGroup!.tags;
            } else {
                this.fadeTags = null;
            }
        } else {
            this.fadeTags = null;
            if (this.project !== null) {
                if (index === -1) {
                    this.project.profile.view.fade = 'completed';
                } else {
                    this.project.profile.view.fade = undefined;
                }
                this.updateProject();
            }
        }
    }
}
