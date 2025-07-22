import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface FilterOption {
  label: string;
  value: any;
  selected?: boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'date' | 'search';
  options?: FilterOption[];
  multiple?: boolean;
  placeholder?: string;
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Input() filters: FilterConfig[] = [];
  @Input() showClearButton: boolean = true;
  
  @Output() filterChange = new EventEmitter<{ [key: string]: any }>();
  @Output() clearFilters = new EventEmitter<void>();
  
  activeFilters: { [key: string]: any } = {};
  
  onFilterChange(key: string, value: any): void {
    this.activeFilters[key] = value;
    this.filterChange.emit(this.activeFilters);
  }
  
  onClearFilters(): void {
    this.activeFilters = {};
    this.clearFilters.emit();
  }
  
  trackByFn(index: number, item: FilterConfig): string {
    return item.key;
  }
}