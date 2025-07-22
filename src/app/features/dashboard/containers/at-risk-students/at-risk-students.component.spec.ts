import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtRiskStudentsComponent } from './at-risk-students.component';

describe('AtRiskStudentsComponent', () => {
  let component: AtRiskStudentsComponent;
  let fixture: ComponentFixture<AtRiskStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtRiskStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtRiskStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
