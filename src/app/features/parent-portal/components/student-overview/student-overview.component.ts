// src/app/features/parent-portal/components/student-overview/student-overview.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrls: ['./student-overview.component.scss']
})
export class StudentOverviewComponent implements OnChanges {
  @Input() studentId: string = '';
  
  // Mock student data
  student = {
    id: 'mark-felton',
    name: 'Mark Felton',
    grade: '5th',
    photo: null,
    school: 'Providence Creek Academy',
    teacher: 'Ms. Johnson',
    gpa: 3.8,
    attendance: 90,
    behavioral: {
      warnings: 1,
      disciplinaryActions: 0
    },
    interventions: [
      {
        type: 'Reading',
        status: 'Not On Track'
      },
      {
        type: 'Emotional Intelligence',
        status: 'On Track'
      }
    ]
  };

  isLoading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentId']) {
      this.loadStudentData();
    }
  }

  loadStudentData(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, this would fetch data for the selected student
      this.isLoading = false;
    }, 500);
  }
}
