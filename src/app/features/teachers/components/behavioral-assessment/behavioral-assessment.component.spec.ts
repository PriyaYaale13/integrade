import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehavioralAssessmentComponent } from './behavioral-assessment.component';

describe('BehavioralAssessmentComponent', () => {
  let component: BehavioralAssessmentComponent;
  let fixture: ComponentFixture<BehavioralAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehavioralAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehavioralAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
