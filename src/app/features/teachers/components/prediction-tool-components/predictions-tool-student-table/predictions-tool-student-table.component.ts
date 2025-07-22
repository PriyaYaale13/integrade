import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MatIcon } from '@angular/material/icon';
import { studentDetails } from '../../../../../models/predictionTool.model';


@Component({
  selector: 'app-predictions-tool-student-table',
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './predictions-tool-student-table.component.html',
  styleUrl: './predictions-tool-student-table.component.scss'
})
export class PredictionsToolStudentTableComponent {
  @Input() studentDetails: studentDetails[] = [];
  @Input() currentPage = 1;
  @Input() itemsPerPage = 5;
  @Input() title='';
@Input() count=0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() studentPredict = new EventEmitter<studentDetails>();
  @Input() categoryCounts!: {
    present: number;
    aboveAverage: number;
    needSupport: number;
    atRisk: number;
  };
  
  @Output() filterCategory = new EventEmitter<'present' | 'aboveAverage' | 'needSupport' | 'atRisk'>();
 
  get paginatedStudentDetails() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.studentDetails.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }

  get totalPages() {
    return Math.ceil(this.studentDetails.length / this.itemsPerPage);
  }


  emitPredict(details: studentDetails) {
  
    this.studentPredict.emit(details);
  

   
  }
}