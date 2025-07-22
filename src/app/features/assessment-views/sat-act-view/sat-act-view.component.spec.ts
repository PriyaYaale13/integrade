import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatActViewComponent } from './sat-act-view.component';

describe('SatActViewComponent', () => {
  let component: SatActViewComponent;
  let fixture: ComponentFixture<SatActViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatActViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatActViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
