import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryListBarComponent } from './library-list-bar.component';

describe('LibraryListBarComponent', () => {
    let component: LibraryListBarComponent;
    let fixture: ComponentFixture<LibraryListBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LibraryListBarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LibraryListBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
