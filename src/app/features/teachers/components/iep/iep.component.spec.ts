import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IepComponent } from './iep.component';

describe('IepComponent', () => {
  let component: IepComponent;
  let fixture: ComponentFixture<IepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
