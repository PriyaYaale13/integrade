import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorAssessmentTableChartsComponent } from './behavior-assessment-table-charts.component';

describe('BehaviorAssessmentTableChartsComponent', () => {
  let component: BehaviorAssessmentTableChartsComponent;
  let fixture: ComponentFixture<BehaviorAssessmentTableChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehaviorAssessmentTableChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorAssessmentTableChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
