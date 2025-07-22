import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInterventionsComponent } from './student-interventions.component';

describe('StudentInterventionsComponent', () => {
  let component: StudentInterventionsComponent;
  let fixture: ComponentFixture<StudentInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInterventionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
