import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardRecognitionComponent } from './award-recognition.component';

describe('AwardRecognitionComponent', () => {
  let component: AwardRecognitionComponent;
  let fixture: ComponentFixture<AwardRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardRecognitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
