import { TestBed } from '@angular/core/testing';

import { ProjectUndoRedoService } from './project-undo-redo.service';

describe('ProjectUndoRedoService', () => {
    let service: ProjectUndoRedoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProjectUndoRedoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
