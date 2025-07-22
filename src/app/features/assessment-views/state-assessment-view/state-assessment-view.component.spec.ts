import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAssessmentViewComponent } from './state-assessment-view.component';

describe('StateAssessmentViewComponent', () => {
  let component: StateAssessmentViewComponent;
  let fixture: ComponentFixture<StateAssessmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateAssessmentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateAssessmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
