import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopLibComponent } from './desktop-lib.component';

describe('DesktopLibComponent', () => {
    let component: DesktopLibComponent;
    let fixture: ComponentFixture<DesktopLibComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesktopLibComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DesktopLibComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
