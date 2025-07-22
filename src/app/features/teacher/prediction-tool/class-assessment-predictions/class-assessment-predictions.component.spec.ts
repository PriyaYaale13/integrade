import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAssessmentPredictionsComponent } from './class-assessment-predictions.component';

describe('ClassAssessmentPredictionsComponent', () => {
  let component: ClassAssessmentPredictionsComponent;
  let fixture: ComponentFixture<ClassAssessmentPredictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAssessmentPredictionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAssessmentPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
