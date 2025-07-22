import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentViewsComponent } from './assessment-views.component';

describe('AssessmentViewsComponent', () => {
  let component: AssessmentViewsComponent;
  let fixture: ComponentFixture<AssessmentViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentViewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
