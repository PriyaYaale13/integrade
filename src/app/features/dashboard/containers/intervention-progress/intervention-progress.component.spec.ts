import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionProgressComponent } from './intervention-progress.component';

describe('InterventionProgressComponent', () => {
  let component: InterventionProgressComponent;
  let fixture: ComponentFixture<InterventionProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
