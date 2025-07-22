import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicGrowthComponent } from './academic-growth.component';

describe('AcademicGrowthComponent', () => {
  let component: AcademicGrowthComponent;
  let fixture: ComponentFixture<AcademicGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicGrowthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
