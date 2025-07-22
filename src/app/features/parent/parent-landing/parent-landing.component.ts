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
    SidebarComponent,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatCardModule, MatDividerModule, MatBadgeModule, MatTooltipModule, MatProgressSpinnerModule,
    MatMenuModule,
    StudentAcademicPerformanceComponent
  ],
  templateUrl: './parent-landing.component.html',
  styleUrls: ['./parent-landing.component.scss']
})

export class ParentStudentLandingComponent implements OnInit {
  parentId!: number;
  studentId!: number;

  students: Student[] = [];
  student!: Student;

  sidebarMenuItems: MenuItem[] = [];
  private data = inject(AcademicPerformanceService);
  
  // Flag to track when data is loaded
  dataLoaded = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}
  
  ngOnInit(): void {
    // Initialize assessments with defaults
    
    
    this.route.paramMap.subscribe(params => {
      this.parentId = +params.get('parentId')!;
      this.studentId = +params.get('studentId')!;
  
      this.sidebarMenuItems = [
        {
          label: 'Assessment',
          icon: 'fa-solid fa-book-open-reader',
          route: `/parent/${this.parentId}/${this.studentId}/assessment`
        }
      ];
      
      // Ensure data is loaded before rendering components that need it
   
      // Load academic performance data
     
      
      // Load student list
      this.loadStudents();
    });
  }

  loadStudents(): void {
    this.http.get<Student[]>('assets/data/students.json').subscribe(data => {
      this.students = data.filter(s => s.parent_id === this.parentId);
      this.student = this.students.find(s => s.student_id === this.studentId)!;
    });
  }
  
  onStudentSelected(studentId: number): void {
    this.students.forEach(item => {
      item.selected = item.student_id === studentId;
    });
  
    this.studentId = studentId;
    this.student = this.students.find(s => s.student_id === studentId)!;
  
    this.router.navigate([`/parent/${this.parentId}/${studentId}`]);
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