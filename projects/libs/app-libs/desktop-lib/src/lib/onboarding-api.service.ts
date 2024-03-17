import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import urlJoin from 'url-join';
import { Project, ProjectLibrary } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';

@Injectable({
    providedIn: 'root',
})
export class OnBoardingApiService {
    private baseUrl!: string;
    constructor(
        private httpClient: HttpClient,
        private serializer: ProjectSerializerService,
    ) {
        this.baseUrl = environment.criticalPathApi;
    }

    public saveLibrary(projects: Project[], append: boolean): void {
        console.log('desktop-project-api.service.ts: list()');
        window.electron.onboardingApi.saveLibrary({ projects, append });
    }
    public getLibrary(page: number, pageSize: number, listName: string | null): Observable<ProjectLibrary> {
        console.log('desktop-project-api.service.ts: list()');
        // window.electron.onboardingApi.getLibrary({ limit: pageSize, offset: page * pageSize /*, filter: listName*/ }, (data: Project[]) => {});

        return new Observable<ProjectLibrary>(subscriber => {
            // Assuming window.electronAPI.getLibrary exists and is properly initialized
            window.electron.onboardingApi.getLibrary({ limit: pageSize, offset: page * pageSize /*, filter: listName*/ }, (response: ProjectLibrary) => {
                // if (response.error) {
                //     subscriber.error(response.error); // Emit an error if there's an error in the response
                // } else {
                subscriber.next(response); // Emit the next value with the response
                subscriber.complete(); // Complete the observable stream
                // }
            });
        });
    }
}
