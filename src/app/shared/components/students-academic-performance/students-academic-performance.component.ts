import { Component, inject, Input, OnInit } from '@angular/core';
import { StateStudentAcademicPerformance } from '../../../models/student-details-page.model';
import { CommonModule } from '@angular/common';

import { AcademicPerformanceService } from '../../../services/academicPerformance.service';

@Component({
  selector: 'app-student-academic-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students-academic-performance.component.html',
  styleUrls: ['./students-academic-performance.component.scss']
})
export class StudentAcademicPerformanceComponent implements OnInit {
  @Input() studentAcademicPerformance: StateStudentAcademicPerformance[] = [];
  data = inject(AcademicPerformanceService);

  ngOnInit(): void {
    if (!this.studentAcademicPerformance || this.studentAcademicPerformance.length === 0) {
      this.data.getStudentAcademicPerformance().subscribe((result) => {
        this.studentAcademicPerformance = result;
      });
    }
  }
  

  getGradeColor(grade: string): string {
    if (grade.startsWith('A')) return 'text-[#4caf50]';
    if (grade.startsWith('B')) return 'text-[#ff9800]';
    if (grade.startsWith('C')) return 'text-[#f44336]';
    return 'text-[#757575]';
  }

  getGradeColorCode(grade: string): string {
    if (grade.startsWith('A')) return '#4caf50';
    if (grade.startsWith('B')) return '#ff9800';
    if (grade.startsWith('C')) return '#f44336';
    return '#757575';
  }

  getTrendIcon(trend: string): string {
    switch (trend.toLowerCase().trim()) {
      case 'improving':
        return 'fa-solid fa-arrow-trend-up';
      case 'stable':
        return 'fa-solid fa-equals';
      case 'declining':
        return 'fa-solid fa-arrow-trend-down';
      default:
        return 'fa-solid fa-question';
    }
  }

  getTrendColor(trend: string): string {
    switch (trend.toLowerCase().trim()) {
      case 'improving':
        return 'text-[#4caf50]';
      case 'stable':
        return 'text-[#757575]';
      case 'declining':
        return 'text-[#f44336]';
      default:
        return 'text-[#9e9e9e]';
    }
  }


}