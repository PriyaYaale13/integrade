import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonGaugeComponent } from './comparison-gauge.component';

describe('ComparisonGaugeComponent', () => {
  let component: ComparisonGaugeComponent;
  let fixture: ComponentFixture<ComparisonGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
