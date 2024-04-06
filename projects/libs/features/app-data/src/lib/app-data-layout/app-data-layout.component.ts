import { ChangeDetectorRef, Component, Inject, NgZone } from '@angular/core';
import { FileUpload } from '../file-loader/file-loader.component';
import { OnBoardingApiService } from '@critical-pass/desktop-lib';
import { Project, ProjectLibrary, RecordEntry, TreeNode } from '@critical-pass/project/types';
import { PROJECT_API_TOKEN, ProjectApi } from '@critical-pass/shared/data-access';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ad-app-data-layout',
    standalone: false,
    templateUrl: './app-data-layout.component.html',
    styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {
    constructor(
        private onboardingApi: OnBoardingApiService,
        private cdr: ChangeDetectorRef,
        @Inject(PROJECT_API_TOKEN) private projectApi: ProjectApi,
        private toastr: ToastrService,
        private ngZone: NgZone,
    ) {}
    public projects: Project[] = [];
    public ngOnInit() {
        this.loadPage(0);
    }
    public loadPage(page: number, pageSize: number = 12, listName: string | null = null) {
        this.projectApi.list(page, pageSize, listName).subscribe((data: ProjectLibrary) => {
            this.totalCount = data.totalCount;
            const max = Math.ceil(data.totalCount / pageSize);
            this.maxPage = max - 1;
            this.projects = data.items;
            this.cdr.detectChanges();
        });
    }
    public deleteText = '';
    public library: ProjectLibrary | null = null;
    public firstProject: Project | null = null;
    public totalCount = 0;
    public currentPage: number = 0;
    public maxPage: number = 0;
    public lastSelectedHistoryId: number | null = null;
    public deleteLibrary() {}
    public insertLibrary(event: FileUpload) {
        if (Array.isArray(event.result)) {
            const projects: Project[] = [];
            for (const project of event.result) {
                const x: Project = project as Project;
                if (x.activities && x.integrations && x.profile) {
                    projects.push(x);
                }
            }
            this.onboardingApi.saveLibrary(projects, event.appendData);
        }
    }
    public getLibrary() {
        this.loadPage(0);
    }
    public getProject() {
        this.toastr.success('Unstash Chart', 'Success!');
        this.onboardingApi.getProject(2856).subscribe((data: Project) => {
            this.firstProject = data;
            this.cdr.detectChanges();
        });
    }
    public deleteNetwork() {}
    public insertNetwork(event: FileUpload) {
        if (Array.isArray(event.result)) {
            const projects: Project[] = [];
            for (const project of event.result) {
                const x: Project = project as Project;
                projects.push(x);
            }
            if (event.id) {
                this.lastSelectedHistoryId = event.id;
                this.onboardingApi.saveNetwork(event.id, projects).subscribe((success: boolean) => {
                    this.ngZone.run(() => {
                        if (success) {
                            this.toastr.success('Network saved', 'Success');
                        } else {
                            this.toastr.error('Network not saved', 'Error');
                        }
                    });
                });
            }
        }
    }
    public getNetwork() {
        if (!this.lastSelectedHistoryId) {
            return;
        }
        this.onboardingApi.getNetwork(this.lastSelectedHistoryId).subscribe((data: Project[]) => {
            console.log('getHistory:', data[0]);
        });
    }

    public deleteHistory() {}
    public insertHistory(event: FileUpload) {
        if (Array.isArray(event.result)) {
            const nodes: TreeNode[] = [];
            for (const project of event.result) {
                const x: TreeNode = project as TreeNode;
                nodes.push(x);
            }
            if (event.id) {
                this.lastSelectedHistoryId = event.id;
                this.onboardingApi.saveHistory(event.id, nodes).subscribe((success: boolean) => {
                    this.ngZone.run(() => {
                        if (success) {
                            this.toastr.success('History saved', 'Success');
                        } else {
                            this.toastr.error('History not saved', 'Error');
                        }
                    });
                });
            }
        }
    }
    public getHistory() {
        if (!this.lastSelectedHistoryId) {
            return;
        }
        this.onboardingApi.getHistory(this.lastSelectedHistoryId).subscribe((data: TreeNode[]) => {
            console.log('getHistory:', data[0]);
        });
    }
    public pageLeft() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadPage(this.currentPage);
        }
    }
    public pageRight() {
        if (this.currentPage < this.maxPage) {
            this.currentPage++;
            this.loadPage(this.currentPage);
        }
    }
}
