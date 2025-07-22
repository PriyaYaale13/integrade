// student-detail.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student, StateStudentAcademicPerformance } from '../../../models/student-details-page.model';
import { StateAssessmentPerformanceData } from '../../../models/dashboard.model';
import { AcademicPerformanceService } from '../../../services/academicPerformance.service';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { StudentAcademicPerformanceComponent } from "../../../shared/components/students-academic-performance/students-academic-performance.component";
import { StateAssessmentGridComponent } from '../../../shared/components/charts/state-assessment-grid/state-assessment-grid.component';

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

@Component({
  selector: 'app-parent-students-details-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    StateAssessmentGridComponent,
    SidebarComponent,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatCardModule, MatDividerModule, MatBadgeModule, MatTooltipModule, MatProgressSpinnerModule,
    MatMenuModule,
    StudentAcademicPerformanceComponent
  ],
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  parentId!: number;
  studentId!: number;

  students: Student[] = [];
  student!: Student;

  assessments: StateAssessmentPerformanceData[] = [];
  studentAcademicPerformance: StateStudentAcademicPerformance[] = [];
  sidebarMenuItems: MenuItem[] = [];
  filteredAcademicPerformance: StateStudentAcademicPerformance[] = [];

  selectedSemester = '';
  selectedYear = '';
  selectedSubject = '';

  semesters: string[] = ['Fall', 'Spring', 'Summer'];
  years: string[] = ['2023', '2024', '2025'];
  subjects: string[] = [];

  private data = inject(AcademicPerformanceService);
  dataLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = +params.get('studentId')!;
      this.sidebarMenuItems = [];

      this.data.getStudentAcademicPerformance().subscribe(
        (result) => {
          this.studentAcademicPerformance = result;
          this.emitFilters(); // Initialize filtered data
          this.extractSubjects(); // Populate subject options
        },
        (error) => {
          console.error('Error loading student academic performance.', error);
        }
      );

      this.assessments = this.getDefaultAssessments();
      this.loadStudents();
    });
  }

  loadStudents(): void {
    this.http.get<Student[]>('assets/data/students.json').subscribe(data => {
      this.students = data;
      const student = data.find(s => s.student_id === this.studentId);
      if (student) {
        this.student = student;
      } else {
        console.warn('Student not found');
      }
    });
  }

  emitFilters(): void {
    this.filteredAcademicPerformance = this.studentAcademicPerformance.filter(perf => {
      const matchSubject = this.selectedSubject ? perf.subject === this.selectedSubject : true;
      const matchSemester = this.selectedSemester ? perf.semester === this.selectedSemester : true;
      const matchYear = this.selectedYear ? perf.year === this.selectedYear : true;
      return  matchSubject && matchSemester && matchYear;
    });
  }

  extractSubjects(): void {
    const subjectsSet = new Set<string>();
    this.studentAcademicPerformance.forEach(perf => {
      if (perf.subject) {
        subjectsSet.add(perf.subject);
      }
    });
    this.subjects = Array.from(subjectsSet);
  }

  onStudentSelected(studentId: number): void {
    this.students.forEach(item => {
      item.selected = item.student_id === studentId;
    });

    this.studentId = studentId;
    this.student = this.students.find(s => s.student_id === studentId)!;

    this.router.navigate([`/parent/${this.parentId}/${studentId}`]);
    this.emitFilters();
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
