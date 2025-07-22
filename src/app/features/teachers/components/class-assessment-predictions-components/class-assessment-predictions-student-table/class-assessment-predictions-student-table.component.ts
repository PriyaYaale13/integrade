import { Component, EventEmitter, Input, Output } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { studentDetails } from '../../../../../models/predictionTool.model';


@Component({
  selector: 'app-class-assessment-predictions-student-table',
  imports: [CommonModule,FormsModule],
  templateUrl: './class-assessment-predictions-student-table.component.html',
  styleUrl: './class-assessment-predictions-student-table.component.scss'
})
export class ClassAssessmentPredictionsStudentTableComponent {
  @Input() student:studentDetails[]=[];
  @Input() currentPage = 1;
  @Input() itemsPerPage = 5;
  
  @Output() searchQueryChange = new EventEmitter<string>(); 
  @Output() pageChange = new EventEmitter<number>();
  @Output() scoreFilterChange = new EventEmitter<string>();
  scoreFilter = '';
  
  applyScoreFilter() {
    this.scoreFilterChange.emit(this.scoreFilter);
  }
  

  get paginatedStudentDetails() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.student.slice(startIndex, endIndex);
  }
  searchQuery= '';
  onSearch() {
    this.searchQueryChange.emit(this.searchQuery);
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }
  

  get totalPages() {
    return Math.ceil(this.student.length / this.itemsPerPage);
  }
   
}