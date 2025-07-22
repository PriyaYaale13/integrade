import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAssessmentPredictionsStudentTableComponent } from './class-assessment-predictions-student-table.component';

describe('ClassAssessmentPredictionsStudentTableComponent', () => {
  let component: ClassAssessmentPredictionsStudentTableComponent;
  let fixture: ComponentFixture<ClassAssessmentPredictionsStudentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAssessmentPredictionsStudentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAssessmentPredictionsStudentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
