import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionToolGuideCartComponent } from './prediction-tool-guide-cart.component';

describe('PredictionToolGuideCartComponent', () => {
  let component: PredictionToolGuideCartComponent;
  let fixture: ComponentFixture<PredictionToolGuideCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionToolGuideCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionToolGuideCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
