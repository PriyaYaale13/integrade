import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSelectComponent } from './student-select.component';

describe('StudentSelectComponent', () => {
  let component: StudentSelectComponent;
  let fixture: ComponentFixture<StudentSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
