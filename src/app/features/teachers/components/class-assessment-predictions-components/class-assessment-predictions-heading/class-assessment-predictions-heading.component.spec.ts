import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAssessmentPredictionsHeadingComponent } from './class-assessment-predictions-heading.component';

describe('ClassAssessmentPredictionsHeadingComponent', () => {
  let component: ClassAssessmentPredictionsHeadingComponent;
  let fixture: ComponentFixture<ClassAssessmentPredictionsHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAssessmentPredictionsHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAssessmentPredictionsHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
