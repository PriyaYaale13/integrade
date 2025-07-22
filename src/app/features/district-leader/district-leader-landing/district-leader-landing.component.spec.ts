import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictLeaderComponent } from './district-leader-landing.component';

describe('DistrictLeaderComponent', () => {
  let component: DistrictLeaderComponent;
  let fixture: ComponentFixture<DistrictLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictLeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
