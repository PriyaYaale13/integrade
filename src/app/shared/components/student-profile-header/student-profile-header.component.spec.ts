import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileHeaderComponent } from './student-profile-header.component';

describe('StudentProfileHeaderComponent', () => {
  let component: StudentProfileHeaderComponent;
  let fixture: ComponentFixture<StudentProfileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
