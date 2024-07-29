import { Injectable } from '@angular/core';
import { environment } from '@critical-pass/shared/environments';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RecordEntry, Project } from '@critical-pass/project/types';
import { ProjectSerializerService } from '@critical-pass/shared/serializers';
import { NetworkApi } from '../../types/network-api';

@Injectable({
    providedIn: 'root',
})
export class NetworkApiService implements NetworkApi {
    private baseUrl!: string;
    constructor(
        private httpClient: HttpClient,
        private serializer: ProjectSerializerService,
    ) {
        this.baseUrl = environment.criticalPathApi;
    }

    public get(id: number): Observable<Project[] | null> {
        return of(null);
    }
    public list(page: number, pageSize: number, listName: string | null): Observable<RecordEntry[] | null> {
        return of(null);
    }

    public post(projectId: number, history: Project[]): Observable<boolean> {
        return of(true);
    }

    public delete(id: number) {
        return of();
    }
}
