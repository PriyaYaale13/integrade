import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAcademicPerformanceComponent } from './students-academic-performance.component';

describe('StudentsAcademicPerformanceComponent', () => {
  let component: StudentsAcademicPerformanceComponent;
  let fixture: ComponentFixture<StudentsAcademicPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsAcademicPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsAcademicPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
