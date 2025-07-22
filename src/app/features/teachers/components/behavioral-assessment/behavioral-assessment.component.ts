import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

interface Student {
  name: string;
  attendance: number;
  absentDays: number;
  tardiness: number;
  earlyDismissal: number;
  disciplinaryActions: string;
  suspension: string;
  intervention: string;
  atRisk: string;
  iep: string;
  seasons: string[];
}

@Component({
  selector: 'app-behavioral-assessment',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    SidebarComponent,
    DataTableComponent
  ],
  templateUrl: './behavioral-assessment.component.html',
  styleUrl: './behavioral-assessment.component.scss'
})
export class BehavioralAssessmentComponent implements OnInit {
  students: Student[] = [];
  
  // Data table configuration
  tableColumns = [
    { name: 'Student name', property: 'name', type: 'text' as 'text' },
    { name: 'Attendance', property: 'attendance', type: 'text' as 'text' },
    { name: 'Absent days', property: 'absentDays', type: 'text' as 'text' },
    { name: 'Tardiness', property: 'tardiness', type: 'text' as 'text' },
    { name: 'Early Dismissal', property: 'earlyDismissal', type: 'text' as 'text' },
    { name: 'Disciplinary actions', property: 'disciplinaryActions', type: 'text' as 'text' },
    { name: 'Suspension', property: 'suspension', type: 'text' as 'text' },
    { name: 'Intervention', property: 'intervention', type: 'text' as 'text' },
    { name: 'At Risk', property: 'atRisk', type: 'text' as 'text' },
    { name: 'IEP', property: 'iep', type: 'text' as 'text' }
  ];

  // Assessment data for charts
  stateAssessments = {
    el: {
      value: 75,
      stateAvg: 58,
      classAvg: 64,
      min: 0,
      max: 80
    },
    math: {
      value: 65,
      stateAvg: 58,
      classAvg: 64,
      min: 0,
      max: 80
    }
  };

  satAssessments = {
    verbal: {
      value: 70,
      stateAvg: 58,
      classAvg: 64,
      min: 0,
      max: 80
    },
    maths: {
      value: 68,
      stateAvg: 58,
      classAvg: 64,
      min: 0,
      max: 80
    }
  };
  
  sidebarCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadStudentData();
  }

  loadStudentData() {
    // Mock data based on the image
    this.students = [
      {
        name: 'Matthew Wang',
        attendance: 0,
        absentDays: 0,
        tardiness: 0,
        earlyDismissal: 0,
        disciplinaryActions: '',
        suspension: 'No',
        intervention: 'Yes',
        atRisk: 'Yes',
        iep: 'Yes',
        seasons: ['Winter', 'Fall', 'Spring']
      },
      {
        name: 'Kris Tobin',
        attendance: 0,
        absentDays: 0,
        tardiness: 0,
        earlyDismissal: 0,
        disciplinaryActions: '',
        suspension: '',
        intervention: '',
        atRisk: '',
        iep: '',
        seasons: ['Winter', 'Fall', 'Spring']
      },
      {
        name: 'James Kross',
        attendance: 0,
        absentDays: 0,
        tardiness: 0,
        earlyDismissal: 0,
        disciplinaryActions: '',
        suspension: '',
        intervention: '',
        atRisk: '',
        iep: '',
        seasons: []
      }
    ];
  }

  onSidebarCollapsed(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  goBack() {
    this.router.navigate(['/teachers']);
  }
}
