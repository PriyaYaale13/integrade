import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAssessmentPredictionsComponent } from './state-assessment-predictions.component';

describe('StateAssessmentPredictionsComponent', () => {
  let component: StateAssessmentPredictionsComponent;
  let fixture: ComponentFixture<StateAssessmentPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAssessmentPredictionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAssessmentPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
