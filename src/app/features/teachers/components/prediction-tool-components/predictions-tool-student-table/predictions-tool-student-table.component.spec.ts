import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsToolStudentTableComponent } from './predictions-tool-student-table.component';

describe('PredictionsToolStudentTableComponent', () => {
  let component: PredictionsToolStudentTableComponent;
  let fixture: ComponentFixture<PredictionsToolStudentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsToolStudentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionsToolStudentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
