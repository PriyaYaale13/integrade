import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorAssessmentFilterTableComponent } from './behavior-assessment-filter-table.component';

describe('BehaviorAssessmentFilterTabelComponent', () => {
  let component: BehaviorAssessmentFilterTableComponent;
  let fixture: ComponentFixture<BehaviorAssessmentFilterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehaviorAssessmentFilterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorAssessmentFilterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
