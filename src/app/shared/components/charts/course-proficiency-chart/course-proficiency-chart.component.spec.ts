import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProficiencyChartComponent } from './course-proficiency-chart.component';

describe('CourseProficiencyChartComponent', () => {
  let component: CourseProficiencyChartComponent;
  let fixture: ComponentFixture<CourseProficiencyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseProficiencyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseProficiencyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
