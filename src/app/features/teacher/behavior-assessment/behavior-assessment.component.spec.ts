import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorAssessmentComponent } from './behavior-assessment.component';

describe('BehaviorAssessmentComponent', () => {
  let component: BehaviorAssessmentComponent;
  let fixture: ComponentFixture<BehaviorAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehaviorAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
