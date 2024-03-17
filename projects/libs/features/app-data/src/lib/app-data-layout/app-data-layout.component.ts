import { Component } from '@angular/core';
import { FileUpload } from '../file-loader/file-loader.component';
import { OnBoardingApiService } from '@critical-pass/desktop-lib';
import { Project, ProjectLibrary } from '@critical-pass/project/types';

@Component({
    selector: 'ad-app-data-layout',
    standalone: false,
    templateUrl: './app-data-layout.component.html',
    styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {
    constructor(private onboardingApi: OnBoardingApiService) {}
    public deleteText = '';
    public deleteLibrary() {}
    public insertLibrary(event: FileUpload) {
        console.log('insertLibrary append data', event.appendData, 'contents', !!event.result);
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
        this.onboardingApi.getLibrary(0, 12, null).subscribe((data: ProjectLibrary) => {
            console.log('ProjectLibrary totalCount:', data.totalCount, 'items length', data.items.length);
        });
    }
    public deleteNetwork() {}
    public insertNetwork(event: FileUpload) {}
    public deleteHistory() {}
    public insertHistory(event: FileUpload) {}
}
