import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBandPieChartComponent } from './score-band-pie-chart.component';

describe('ScoreBandPieChartComponent', () => {
  let component: ScoreBandPieChartComponent;
  let fixture: ComponentFixture<ScoreBandPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreBandPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreBandPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
