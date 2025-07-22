import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLandingComponent } from './teacher-landing.component';

describe('TeacherLandingComponent', () => {
  let component: TeacherLandingComponent;
  let fixture: ComponentFixture<TeacherLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
