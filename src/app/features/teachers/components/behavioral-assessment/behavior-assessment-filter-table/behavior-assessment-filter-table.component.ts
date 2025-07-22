import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorFilters } from '../../../../../models/behavior.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-behavior-assessment-filter-table',
  imports: [FormsModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, CommonModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './behavior-assessment-filter-table.component.html',
  styleUrl: './behavior-assessment-filter-table.component.scss'
})
export class  BehaviorAssessmentFilterTableComponent {
  @Input() grades: string[] = [];
  @Input() semesters: string[] = [];
  @Input() currentFilters!: BehaviorFilters;
  
  @Output() filtersChanged = new EventEmitter<BehaviorFilters>();
  @Output() searchCleared = new EventEmitter<void>();
  
  
clearSearch(): void {
  this.currentFilters.searchTerm = '';
  this.applyFilters();
}

applyFilters(): void {
  this.filtersChanged.emit(this.currentFilters);
}
}
