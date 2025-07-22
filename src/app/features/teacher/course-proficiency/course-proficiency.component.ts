import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

// App Components
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';
import { ProficiencyCardComponent } from '../../../shared/components/proficiency-card/proficiency-card.component';
import { CourseBreakdownComponent } from '../../../shared/components/course-breakdown/course-breakdown.component';
import { HistoricalTrendComponent } from '../../../shared/components/historical-trend/historical-trend.component';
import { StudentProficiencyTableComponent } from '../../../shared/components/student-proficiency-table/student-proficiency-table.component';

// Services and Models
import { DataService } from '../../../services/data.service';
import { CourseProficiencyResponse, CourseBreakdownItem, ProficiencyOverview, CourseBreakdown, HistoricalTrend, StudentProficiencyDetail } from '../../../models/dashboard.model';

@Component({
  selector: 'app-course-proficiency',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    ProficiencyCardComponent,
    CourseBreakdownComponent,
    HistoricalTrendComponent,
    StudentProficiencyTableComponent,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatCardModule, MatDividerModule, MatProgressSpinnerModule, MatMenuModule
  ],
  template: `
    <app-header></app-header>
    
    <div class="min-h-screen bg-[#F5F7FA] pt-2">
      <div class="page-layout-container">
        <!-- Use the reusable Sidebar component -->
        <app-sidebar 
          title="Quick Links" 
          [menuItems]="sidebarMenuItems" 
          [useCustomIcons]="true">
        </app-sidebar>
        
        <!-- Main Content using Global Class -->
        <main class="app-main-content">
          <!-- Page Title and Actions - Improved for mobile -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 mt-8 gap-4">
            <h1 class="page-title">Course Proficiency Dashboard</h1>
            <div class="flex flex-wrap items-center gap-3">
              <select class="border rounded-lg px-3 py-2 text-sm max-w-[200px]" [(ngModel)]="selectedAcademicYear" (change)="loadData()">
                <option value="2024-2025">2024-2025 Academic Year</option>
                <option value="2023-2024">2023-2024 Academic Year</option>
                <option value="2022-2023">2022-2023 Academic Year</option>
              </select>
              <button mat-raised-button color="primary" class="flex items-center text-sm py-1 px-3 whitespace-nowrap">
                <i class="fa-solid fa-download mr-2"></i>
                Export Report
              </button>
            </div>
          </div>

          <ng-container *ngIf="proficiencyData$ | async as proficiencyData; else loading">
            <!-- Proficiency Overview -->
            <section id="proficiency-overview" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <app-proficiency-card title="Advanced" [data]="proficiencyData.proficiencyOverview.advanced"></app-proficiency-card>
              <app-proficiency-card title="Proficient" [data]="proficiencyData.proficiencyOverview.proficient"></app-proficiency-card>
              <app-proficiency-card title="Basic" [data]="proficiencyData.proficiencyOverview.basic"></app-proficiency-card>
              <app-proficiency-card title="Below Basic" [data]="proficiencyData.proficiencyOverview.belowBasic"></app-proficiency-card>
            </section>

            <!-- Course Breakdown and Historical Trend -->
            <section id="course-proficiency" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <app-course-breakdown [courses]="proficiencyData.courseBreakdown" (courseClick)="onCourseClick($event)"></app-course-breakdown>
              <app-historical-trend [historicalData]="proficiencyData.historicalTrend"></app-historical-trend>
            </section>

            <!-- Student Proficiency Table -->
            <app-student-proficiency-table [students]="proficiencyData.studentDetails" (viewStudentDetails)="onViewStudentDetails($event)"></app-student-proficiency-table>
          </ng-container>

          <!-- Loading/Error Template -->
          <ng-template #loading>
            <div class="loading-error-container">
              <mat-spinner diameter="40" class="mb-4"></mat-spinner>
              <p class="text-[#757575]">Loading course proficiency data...</p>
            </div>
          </ng-template>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      padding-top: 0;
    }

    .loading-error-container {
      background-color: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: #212121;
      margin-top: 10px;
    }
    
    /* Mobile Responsiveness */
    @media (max-width: 640px) {
      .page-title {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }
      
      /* Adjust padding for better mobile experience */
      .app-main-content {
        padding: 12px !important;
      }
    }
  `]
})
export class CourseProficiencyComponent implements OnInit {
  private dataService = inject(DataService);
  
  // Data Observables
  proficiencyData$!: Observable<CourseProficiencyResponse>;
  
  // UI state
  selectedAcademicYear = '2024-2025';
  hasError = false;
  
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

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Apply any filters based on selected academic year
    const filters = { academicYear: this.selectedAcademicYear };
    
    this.proficiencyData$ = this.dataService.getCourseProficiencyDashboard(filters).pipe(
      catchError(error => {
        console.error('Error loading proficiency data:', error);
        this.hasError = true;
        return of({} as CourseProficiencyResponse);
      })
    );
  }
  
  onCourseClick(course: CourseBreakdownItem): void {
    console.log('Course clicked:', course);
    // You could navigate to a course detail page or show a modal with more details
  }
  
  onViewStudentDetails(student: StudentProficiencyDetail): void {
    console.log('View student details:', student);
    // You could navigate to a student detail page
  }
} 