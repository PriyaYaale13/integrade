import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoologyViewComponent } from './schoology-view.component';

describe('SchoologyViewComponent', () => {
  let component: SchoologyViewComponent;
  let fixture: ComponentFixture<SchoologyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoologyViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoologyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
