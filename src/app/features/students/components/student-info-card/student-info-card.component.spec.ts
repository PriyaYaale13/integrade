import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoCardComponent } from './student-info-card.component';

describe('StudentInfoCardComponent', () => {
  let component: StudentInfoCardComponent;
  let fixture: ComponentFixture<StudentInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
