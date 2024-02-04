import { TestBed } from '@angular/core/testing';

import { ProjectListApiService } from './project-list-api.service';

describe('ProjectListApiService', () => {
    let service: ProjectListApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProjectListApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
