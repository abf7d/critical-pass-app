import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureBarComponent } from './architecture-bar.component';

describe('ArchitectureBarComponent', () => {
    let component: ArchitectureBarComponent;
    let fixture: ComponentFixture<ArchitectureBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArchitectureBarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ArchitectureBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
