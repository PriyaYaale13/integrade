import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IepComponent } from './iep.component';
import { provideHttpClient } from '@angular/common/http';

describe('IepComponent', () => {
  let component: IepComponent;
  let fixture: ComponentFixture<IepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IepComponent, NoopAnimationsModule],
      providers: [provideHttpClient()]
    }).compileComponents();
    
    fixture = TestBed.createComponent(IepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display IEP student tracking title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('IEP Student Tracking');
  });

  it('should apply filters when button is clicked', () => {
    spyOn(console, 'log');
    component.applyFilters();
    expect(console.log).toHaveBeenCalled();
  });

  it('should have correct progress color class based on progress value', () => {
    expect(component.getProgressColorClass(75)).toBe('bg-[#4caf50]');
    expect(component.getProgressColorClass(45)).toBe('bg-[#ff9800]');
    expect(component.getProgressColorClass(30)).toBe('bg-[#f44336]');
  });
}); 