import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDirectoryComponent } from './teacher-directory.component';

describe('TeacherDirectoryComponent', () => {
  let component: TeacherDirectoryComponent;
  let fixture: ComponentFixture<TeacherDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
