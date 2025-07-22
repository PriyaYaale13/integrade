import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsToolFactorsGuideComponent } from './predictions-tool-factors-guide.component';

describe('PredictionsToolFactorsGuideComponent', () => {
  let component: PredictionsToolFactorsGuideComponent;
  let fixture: ComponentFixture<PredictionsToolFactorsGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsToolFactorsGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictionsToolFactorsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
