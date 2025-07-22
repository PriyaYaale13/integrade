import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialInterventionComponent } from './special-intervention.component';

describe('SpecialInterventionComponent', () => {
  let component: SpecialInterventionComponent;
  let fixture: ComponentFixture<SpecialInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialInterventionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
