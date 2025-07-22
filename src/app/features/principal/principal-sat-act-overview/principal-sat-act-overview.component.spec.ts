import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalSatActOverviewComponent } from './principal-sat-act-overview.component';

describe('PrincipalSatActOverviewComponent', () => {
  let component: PrincipalSatActOverviewComponent;
  let fixture: ComponentFixture<PrincipalSatActOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalSatActOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalSatActOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
