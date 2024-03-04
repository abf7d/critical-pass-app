import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataLayoutComponent } from './app-data-layout.component';

describe('AppDataLayoutComponent', () => {
    let component: AppDataLayoutComponent;
    let fixture: ComponentFixture<AppDataLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppDataLayoutComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppDataLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
