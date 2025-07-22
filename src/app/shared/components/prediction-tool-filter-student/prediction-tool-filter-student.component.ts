import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { studentDetails } from '../../../models/prediction.model';

@Component({
  selector: 'app-prediction-tool-filter-student',
  imports: [CommonModule,FormsModule],
  templateUrl: './prediction-tool-filter-student.component.html',
  styleUrl: './prediction-tool-filter-student.component.scss'
})
export class PredictionToolFilterStudentComponent {
  @Input() studentDetails: studentDetails[] = []; 
  @Output() searchQueryChange = new EventEmitter<string>(); 

  searchQuery= '';

  
  onSearch() {
    this.searchQueryChange.emit(this.searchQuery);
  }

  
}