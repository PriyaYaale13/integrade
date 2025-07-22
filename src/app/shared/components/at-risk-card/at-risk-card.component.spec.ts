import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtRiskCardComponent } from './at-risk-card.component';

describe('AtRiskCardComponent', () => {
  let component: AtRiskCardComponent;
  let fixture: ComponentFixture<AtRiskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtRiskCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtRiskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
