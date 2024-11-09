import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureLayoutComponent } from './architecture-layout.component';

describe('ArchitectureLayoutComponent', () => {
    let component: ArchitectureLayoutComponent;
    let fixture: ComponentFixture<ArchitectureLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArchitectureLayoutComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ArchitectureLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
