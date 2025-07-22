import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAssessmentChartComponent } from './state-assessment-chart.component';

describe('StateAssessmentChartComponent', () => {
  let component: StateAssessmentChartComponent;
  let fixture: ComponentFixture<StateAssessmentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAssessmentChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAssessmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
