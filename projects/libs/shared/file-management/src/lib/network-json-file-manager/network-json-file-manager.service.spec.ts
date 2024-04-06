import { TestBed } from '@angular/core/testing';

import { NetworkJsonFileManagerService } from './network-json-file-manager.service';

describe('NetworkJsonFileManagerService', () => {
    let service: NetworkJsonFileManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NetworkJsonFileManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
