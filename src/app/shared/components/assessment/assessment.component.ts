import { StateStudentAcademicPerformance, Student } from '../../../models/student-details-page.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { StateAssessmentPerformanceData } from '../../../models/dashboard.model';
import { StudentAcademicPerformanceComponent } from "../../../shared/components/students-academic-performance/students-academic-performance.component";
import { StateAssessmentGridComponent } from '../../../shared/components/charts/state-assessment-grid/state-assessment-grid.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { AcademicPerformanceService } from '../../../services/academicPerformance.service';
@Component({
  selector: 'app-parent-students-details-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    StateAssessmentGridComponent,
    CommonModule,
    SidebarComponent,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatCardModule, MatDividerModule, MatBadgeModule, MatTooltipModule, MatProgressSpinnerModule,
    MatMenuModule,
    StudentAcademicPerformanceComponent
],
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})

export class AssessmentComponent  implements OnInit {
  sidebarMenuItems: MenuItem[] = [];

  parentId!: number;
  studentId!: number;

  students: Student[] = [];
  student!: Student;

  assessments: StateAssessmentPerformanceData[] = [];
  studentAcademicPerformance: StateStudentAcademicPerformance[] = [];
  filteredAcademicPerformance: StateStudentAcademicPerformance[] = [];

  selectedSemester = '';
  selectedYear = '';
  selectedSubject = '';

  semesters: string[] = ['Fall', 'Spring', 'Summer'];
  years: string[] = ['2023', '2024', '2025'];
  subjects: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  data = inject(AcademicPerformanceService);ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.parentId = +params.get('parentId')!;
      this.studentId = +params.get('studentId')!;
  
      if (!this.studentAcademicPerformance || this.studentAcademicPerformance.length === 0) {
        this.data.getStudentAcademicPerformance().subscribe((result) => {
          this.studentAcademicPerformance = result;
     this.subjects = [...new Set(this.studentAcademicPerformance.map(p => p.subject))];
       
        });
      } else {
        this.subjects = [...new Set(this.studentAcademicPerformance.map(p => p.subject))];
      }
   if (!this.assessments || this.assessments.length === 0) {
        this.assessments = this.getDefaultAssessments();
      }
  
      this.loadStudents();
    });
  }
  loadStudents(): void {
  this.http.get<Student[]>('assets/data/students.json').subscribe(data => {
    if (this.parentId) {
      this.students = data.filter(s => s.parent_id === this.parentId);
    } else {
      this.students = data; // Student-only route, no parent filter
    }
    this.student = this.students.find(s => s.student_id === this.studentId)!;
  });
}


  emitFilters(): void {
    this.filteredAcademicPerformance = this.studentAcademicPerformance.filter(perf => {
      const matchSubject = this.selectedSubject ? perf.subject === this.selectedSubject : true;
      const matchSemester = this.selectedSemester ? perf.semester === this.selectedSemester : true;
      const matchYear = this.selectedYear ? perf.year === this.selectedYear : true;
      return matchSubject && matchSemester && matchYear;
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


}