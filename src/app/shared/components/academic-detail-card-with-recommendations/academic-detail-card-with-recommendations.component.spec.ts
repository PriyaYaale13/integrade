import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicDetailCardWithRecommendationsComponent } from './academic-detail-card-with-recommendations.component';

describe('AcademicDetailCardWithRecommendationsComponent', () => {
  let component: AcademicDetailCardWithRecommendationsComponent;
  let fixture: ComponentFixture<AcademicDetailCardWithRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicDetailCardWithRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicDetailCardWithRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
