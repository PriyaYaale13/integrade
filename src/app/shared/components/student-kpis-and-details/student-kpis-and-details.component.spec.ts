import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentKpisAndDetailsComponent } from './student-kpis-and-details.component';

describe('StudentKpisAndDetailsComponent', () => {
  let component: StudentKpisAndDetailsComponent;
  let fixture: ComponentFixture<StudentKpisAndDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentKpisAndDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentKpisAndDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
