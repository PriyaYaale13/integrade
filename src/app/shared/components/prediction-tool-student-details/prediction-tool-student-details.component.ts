import { Component ,EventEmitter,Input, Output} from '@angular/core';


import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { studentDetails } from '../../../models/prediction.model';

@Component({
  selector: 'app-prediction-tool-student-details',
  imports: [CommonModule,MatIcon],
  templateUrl: './prediction-tool-student-details.component.html',
  styleUrl: './prediction-tool-student-details.component.scss'
})
export class PredictionToolStudentDetailsComponent {
@Input() studentDetails:studentDetails[]=[];
@Input() currentPage = 1;
@Input() itemsPerPage = 5;

@Output() pageChange = new EventEmitter<number>();

// Get the current page's student details
get paginatedStudentDetails() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.studentDetails.slice(startIndex, endIndex);
}

// Change page when next or previous is clicked
changePage(page: number) {
  this.pageChange.emit(page);
}

// Get total number of pages
get totalPages() {
  return Math.ceil(this.studentDetails.length / this.itemsPerPage);
}

}