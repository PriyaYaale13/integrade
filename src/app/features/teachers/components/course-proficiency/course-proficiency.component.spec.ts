import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProficiencyComponent } from './course-proficiency.component';

describe('CourseProficiencyComponent', () => {
  let component: CourseProficiencyComponent;
  let fixture: ComponentFixture<CourseProficiencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseProficiencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseProficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
