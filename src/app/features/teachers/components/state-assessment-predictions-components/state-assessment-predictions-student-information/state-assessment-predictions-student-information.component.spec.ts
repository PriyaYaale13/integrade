import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAssessmentPredictionsStudentInformationComponent } from './state-assessment-predictions-student-information.component';

describe('StateAssessmentPredictionsStudentInformationComponent', () => {
  let component: StateAssessmentPredictionsStudentInformationComponent;
  let fixture: ComponentFixture<StateAssessmentPredictionsStudentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAssessmentPredictionsStudentInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAssessmentPredictionsStudentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
