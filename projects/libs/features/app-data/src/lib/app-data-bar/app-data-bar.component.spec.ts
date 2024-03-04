import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataBarComponent } from './app-data-bar.component';

describe('AppDataBarComponent', () => {
    let component: AppDataBarComponent;
    let fixture: ComponentFixture<AppDataBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppDataBarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppDataBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
