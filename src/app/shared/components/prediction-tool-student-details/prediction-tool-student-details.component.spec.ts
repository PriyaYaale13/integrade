import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionToolStudentDetailsComponent } from './prediction-tool-student-details.component';

describe('PredictionToolStudentDetailsComponent', () => {
  let component: PredictionToolStudentDetailsComponent;
  let fixture: ComponentFixture<PredictionToolStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionToolStudentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionToolStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
