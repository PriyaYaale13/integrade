import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAtRiskComponent } from './principal-at-risk.component';

describe('PrincipalAtRiskComponent', () => {
  let component: PrincipalAtRiskComponent;
  let fixture: ComponentFixture<PrincipalAtRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalAtRiskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalAtRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
