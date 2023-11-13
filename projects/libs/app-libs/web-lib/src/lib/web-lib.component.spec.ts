import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebLibComponent } from './web-lib.component';

describe('WebLibComponent', () => {
  let component: WebLibComponent;
  let fixture: ComponentFixture<WebLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
