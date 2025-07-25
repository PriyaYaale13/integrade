import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSelectorComponent } from './subject-selector.component';

describe('SubjectSelectorComponent', () => {
  let component: SubjectSelectorComponent;
  let fixture: ComponentFixture<SubjectSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
