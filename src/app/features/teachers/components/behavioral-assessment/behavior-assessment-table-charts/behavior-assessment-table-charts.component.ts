import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { BehaviorRecord } from '../../../../../models/behavior.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-behavior-assessment-table-charts',
  imports: [CommonModule, MatCard, MatCardContent, MatCheckbox, MatTableModule, MatPaginatorModule],
  templateUrl: './behavior-assessment-table-charts.component.html',
  styleUrls: ['./behavior-assessment-table-charts.component.scss']
})
export class BehaviorAssessmentTableChartsComponent implements  AfterViewInit {
  @Input() dataSource!: MatTableDataSource<BehaviorRecord>;
  @Input() displayedColumns: string[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
  
    this.dataSource.paginator = this.paginator;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'excellent':
        return 'bg-green-200 text-green-800';
      case 'good':
        return 'bg-blue-200 text-blue-800';
      case 'average':
        return 'bg-yellow-200 text-yellow-800';
      case 'poor':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }
}
