import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtRiskStudentDetailComponent } from './at-risk-student-detail.component';

describe('AtRiskStudentDetailComponent', () => {
  let component: AtRiskStudentDetailComponent;
  let fixture: ComponentFixture<AtRiskStudentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtRiskStudentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtRiskStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
