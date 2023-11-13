import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUtilsComponent } from './project-utils.component';

describe('ProjectUtilsComponent', () => {
  let component: ProjectUtilsComponent;
  let fixture: ComponentFixture<ProjectUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectUtilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
