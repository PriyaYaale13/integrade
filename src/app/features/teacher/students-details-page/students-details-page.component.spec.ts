import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDetailsPageComponent } from './students-details-page.component';

describe('StudentsDetailsPageComponent', () => {
  let component: StudentsDetailsPageComponent;
  let fixture: ComponentFixture<StudentsDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
