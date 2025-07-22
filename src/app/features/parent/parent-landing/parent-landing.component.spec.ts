import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentStudentLandingComponent } from './parent-landing.component';

describe('ParentStudentLandingComponent', () => {
  let component: ParentStudentLandingComponent;
  let fixture: ComponentFixture<ParentStudentLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentStudentLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentStudentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
