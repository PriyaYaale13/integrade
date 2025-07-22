import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersIepComponent } from './teachers-iep.component';

describe('TeachersIepComponent', () => {
  let component: TeachersIepComponent;
  let fixture: ComponentFixture<TeachersIepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersIepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersIepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
