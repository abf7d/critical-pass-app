import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileActionButtonsComponent } from './file-action-buttons.component';

describe('FileActionButtonsComponent', () => {
    let component: FileActionButtonsComponent;
    let fixture: ComponentFixture<FileActionButtonsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FileActionButtonsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FileActionButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
