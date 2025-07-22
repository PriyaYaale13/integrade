import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtRiskComponent } from './at-risk.component';

describe('AtRiskComponent', () => {
  let component: AtRiskComponent;
  let fixture: ComponentFixture<AtRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtRiskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
