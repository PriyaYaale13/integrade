import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAssessmentComponent } from './state-assessment.component';

describe('StateAssessmentComponent', () => {
  let component: StateAssessmentComponent;
  let fixture: ComponentFixture<StateAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
