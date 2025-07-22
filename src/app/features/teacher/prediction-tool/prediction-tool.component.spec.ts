import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionToolComponent } from './prediction-tool.component';

describe('PredictionToolComponent', () => {
  let component: PredictionToolComponent;
  let fixture: ComponentFixture<PredictionToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
