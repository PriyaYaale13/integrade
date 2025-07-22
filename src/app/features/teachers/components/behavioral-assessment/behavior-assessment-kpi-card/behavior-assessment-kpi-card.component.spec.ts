import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorAssessmentKpiCardComponent } from './behavior-assessment-kpi-card.component';

describe('BehaviorAssessmentKpiCardComponent', () => {
  let component: BehaviorAssessmentKpiCardComponent;
  let fixture: ComponentFixture<BehaviorAssessmentKpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehaviorAssessmentKpiCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorAssessmentKpiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
