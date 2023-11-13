import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerializersComponent } from './serializers.component';

describe('SerializersComponent', () => {
  let component: SerializersComponent;
  let fixture: ComponentFixture<SerializersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerializersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerializersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
