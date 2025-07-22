import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionToolFilterStudentComponent } from './prediction-tool-filter-student.component';

describe('PredictionToolFilterStudentComponent', () => {
  let component: PredictionToolFilterStudentComponent;
  let fixture: ComponentFixture<PredictionToolFilterStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionToolFilterStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionToolFilterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
