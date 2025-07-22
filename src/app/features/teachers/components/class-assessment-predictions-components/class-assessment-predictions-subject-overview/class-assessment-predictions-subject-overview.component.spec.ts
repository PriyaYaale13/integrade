import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAssessmentPredictionsSubjectOverviewComponent } from './class-assessment-predictions-subject-overview.component';

describe('ClassAssessmentPredictionsSubjectOverviewComponent', () => {
  let component: ClassAssessmentPredictionsSubjectOverviewComponent;
  let fixture: ComponentFixture<ClassAssessmentPredictionsSubjectOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAssessmentPredictionsSubjectOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAssessmentPredictionsSubjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
