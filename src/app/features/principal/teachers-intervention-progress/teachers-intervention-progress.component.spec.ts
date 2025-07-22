import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersInterventionProgressComponent } from './teachers-intervention-progress.component';

describe('TeachersInterventionProgressComponent', () => {
  let component: TeachersInterventionProgressComponent;
  let fixture: ComponentFixture<TeachersInterventionProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersInterventionProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersInterventionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
