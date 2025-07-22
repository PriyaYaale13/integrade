import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import RouterModule
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { StateAssessmentGridComponent } from '../../../shared/components/charts/state-assessment-grid/state-assessment-grid.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { StudentDetailsCardComponent } from '../../../shared/components/student-details-card/student-details-card.component';
import { StateStudentAcademicPerformance, Student } from '../../../models/student-details-page.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Services and Models
import { DataService } from '../../../services/data.service';
import { StateAssessmentPerformanceData } from '../../../models/dashboard.model';
import { Observable } from 'rxjs/internal/Observable';
import { StudentAcademicPerformanceComponent } from "../../../shared/components/students-academic-performance/students-academic-performance.component";
@Component({
  selector: 'app-students-details-page',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    StateAssessmentGridComponent,
    CommonModule,
    SidebarComponent,
    StudentDetailsCardComponent,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatCardModule, MatDividerModule, MatBadgeModule, MatTooltipModule, MatProgressSpinnerModule,
    MatMenuModule,
    StudentAcademicPerformanceComponent
],
  templateUrl: './students-details-page.component.html',
  styleUrl: './students-details-page.component.scss'
})
export class StudentsDetailsPageComponent {
[x: string]: any;

  // Navigation menu items for sidebar
  sidebarMenuItems: MenuItem[] = [
    {
      label: 'At Risk Students',
      icon: 'fa-solid fa-triangle-exclamation',
      route: '/teacher/at-risk'
    },
    {
      label: 'Interventions',
      icon: 'fa-solid fa-hands-holding-child',
      route: '/teacher/interventions'
    },
    {
      label: 'Behavior Assessment',
      icon: 'fa-solid fa-clipboard-check',
      route: '/teacher/behavior'
    },
    {
      label: 'IEP',
      icon: 'fa-solid fa-file-contract',
      route: '/teacher/iep'
    },
    {
      label: 'Academic Growth',
      icon: 'fa-solid fa-chart-line',
      route: '/teacher/growth'
    },
    {
      label: 'Prediction Tool',
      icon: 'fa-solid fa-lightbulb',
      route: '/teacher/predict'
    },
    {
      label: 'Course Proficiency',
      icon: 'fa-solid fa-graduation-cap',
      route: '/teacher/course-proficiency'
    },
    {
      label: 'State Assessment',
      icon: 'fa-solid fa-chart-bar',
      route: '/teacher/assessment/state'
    },
    {
      label: 'SAT/ACT',
      icon: 'fa-solid fa-chart-line',
      route: '/teacher/assessment/sat-act'
    },
    {
      label: 'Students Details Page',
      icon: 'fa-solid fa-chalkboard-teacher',
      route: '/teacher/students-details-page/1', 
    }
  ];

  studentId!: number;
  student!: Student;
  assessments: StateAssessmentPerformanceData[] = [];
  studentAcademicPerformance: StateStudentAcademicPerformance[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = +params.get('id')!;
      this.getStudentData();
      if (!this.assessments || this.assessments.length === 0) {
        this.assessments = this.getDefaultAssessments();
      }
      this.studentAcademicPerformance = this.getDefaultData();
    });
  }

  getStudentData(): void {
    this.http.get<Student[]>('assets/data/students.json').subscribe(data => {
      this.student = data.find(s => s.student_id === this.studentId)!;
    });
  }

  private getDefaultAssessments(): StateAssessmentPerformanceData[] {
    return [
      {
        subject: 'Mathematics',
        stateAverage: 78,
        classAverage: 85,
        minScale: 0,
        maxScale: 100,
        performanceLevels: {
          belowBasic: 20,
          basic: 30, 
          proficient: 30,
          advanced: 20
        }
      },
      {
        subject: 'English Language Arts (ELA)',
        stateAverage: 75,
        classAverage: 82,
        minScale: 0,
        maxScale: 100,
        performanceLevels: {
          belowBasic: 20,
          basic: 30,
          proficient: 30,
          advanced: 20
        }
      }
    ];
  }
  
  private getDefaultData(): StateStudentAcademicPerformance[] {
    return [
      { subject: 'ELA', currentGrade: 'A-', previousGrade: 'B+', trend: 'Stable', proficiencyPercent: 95, semester: 'Fall', year: '2024' },
      { subject: 'Math', currentGrade: 'A', previousGrade: 'A-', trend: 'Improving', proficiencyPercent: 70, semester: 'Fall', year: '2023' },
      { subject: 'Science', currentGrade: 'B-', previousGrade: 'C+', trend: 'Improving', proficiencyPercent: 70, semester: 'Spring', year: '2024' },
      { subject: 'Music', currentGrade: 'C-', previousGrade: 'B+', trend: 'Improving', proficiencyPercent: 70, semester: 'Summer', year: '2023' },
      { subject: 'Social Studies', currentGrade: 'A', previousGrade: 'A', trend: 'Stable', proficiencyPercent: 70, semester: 'Fall', year: '2023' },
      { subject: 'Dance', currentGrade: 'B+', previousGrade: 'B', trend: 'Improving', proficiencyPercent: 70, semester: 'Spring', year: '2024' },
      { subject: 'Art', currentGrade: 'A', previousGrade: 'A-', trend: 'Improving', proficiencyPercent: 70, semester: 'Summer', year: '2024' },
      { subject: 'Computer', currentGrade: 'A', previousGrade: 'A', trend: 'Stable', proficiencyPercent: 70, semester: 'Fall', year: '2024' },
      { subject: 'Physical Education', currentGrade: 'A', previousGrade: 'A-', trend: 'Improving', proficiencyPercent: 70, semester: 'Spring', year: '2023' }
    ];
  }


}
