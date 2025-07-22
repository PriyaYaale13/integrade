import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBehaviorAssessmentComponent } from './teacher-behavior-assessment.component';

describe('TeacherBehaviorAssessmentComponent', () => {
  let component: TeacherBehaviorAssessmentComponent;
  let fixture: ComponentFixture<TeacherBehaviorAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherBehaviorAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherBehaviorAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
