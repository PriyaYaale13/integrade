import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { BehaviorSubject, Observable, Subject, combineLatest, startWith, switchMap, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Angular Material Modules
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

// App Components (Ensure paths are correct after moving)
import { StateAssessmentGridComponent } from '../../../shared/components/charts/state-assessment-grid/state-assessment-grid.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
// REMOVED: Unused import
// import { StudentDetailTableComponent } from '../../../shared/components/student-detail-table/student-detail-table.component'; 

// Services and Models
import { KpiData, StateAssessmentPerformanceData } from '../../../models/dashboard.model';
import { Student } from '../../../models/student-details-page.model';
import { DataService } from '../../../services/data.service';
import { UtilsService } from '../../../services/utils.service';

// Extended interfaces
interface ExtendedKpiData extends KpiData {
  trendValue?: string;
  comparison?: string;
  icon?: string;
  iconClass?: string;
  progressValue?: number;
  progressBarClass?: string;
}

interface Filters {
  date?: Date | null;
  semester?: string;
  course?: string;
  program?: string;
  searchTerm?: string;
}

// Extended student interface with display properties
interface StudentWithDisplay extends Student {
  displayName: string;
  displayInfo: string;
}

@Component({
  selector: 'app-teacher-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Use ReactiveFormsModule if forms get complex
    RouterModule, // Add RouterModule
    HeaderComponent,
    StateAssessmentGridComponent,
    SidebarComponent,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatCardModule, MatDividerModule, MatBadgeModule, MatTooltipModule, MatProgressSpinnerModule,
    MatMenuModule
  ],
  templateUrl: './teacher-landing.component.html',
  styleUrls: ['./teacher-landing.component.scss']
})
export class TeacherLandingComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private utilsService = inject(UtilsService)

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

  // Filter Observables & State
  private filterSubject = new BehaviorSubject<Filters>({
    semester: 'Winter Semester', // Default value
    course: 'All',
    program: 'All',
    searchTerm: ''
  });
  filters$ = this.filterSubject.asObservable();

  // Data Observables - Driven by filters
  dashboardData$!: Observable<{
    kpis: KpiData[],
    assessments: StateAssessmentPerformanceData[]
  }>;
  significantDrop$!: Observable<boolean>;

  // Mock options for filters (fetch from service if dynamic)
  semesters$: Observable<string[]> = this.dataService.getSemesters();
  courses$: Observable<string[]> = this.dataService.getCourses();
  programs$: Observable<string[]> = this.dataService.getPrograms();

  // Notification state
  hasNotification = false;

  // Filter model for ngModel
  currentFilters: Filters = { semester: 'Winter', course: 'All', program: 'All', searchTerm: '' };

  // Search term handling with debounce
  private searchSubject = new Subject<string>();

  // Student data
  students: Student[] = [];
  searchResults: StudentWithDisplay[] = [];
  showSearchResults = false;

  ngOnInit(): void {
    this.setupSearchDebounce();
    this.loadData();
    this.loadStudents();

    this.significantDrop$ = this.dataService.hasSignificantDrop().pipe(
      tap(hasDrop => this.hasNotification = hasDrop)
    );
  }

  private loadStudents(): void {
    this.http.get<Student[]>('assets/data/students.json')
      .subscribe(students => {
        this.students = students;
      });
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(400), // Wait for 400ms pause in typing
      distinctUntilChanged() // Only emit if value changed
    ).subscribe(searchTerm => {
      this.currentFilters.searchTerm = searchTerm;
      this.applyFilters();
      this.searchStudents(searchTerm);
    });
  }

  private searchStudents(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.searchResults = [];
      this.showSearchResults = false;
      return;
    }

    // Filter students based on search term
    const term = searchTerm.toLowerCase().trim();
    this.searchResults = this.students
      .filter(student =>
        student.full_name.toLowerCase().includes(term) ||
        student.teacher.toLowerCase().includes(term) ||
        student.Academy.toLowerCase().includes(term) ||
        student.grade.toLowerCase().includes(term) ||
        student.ethnicity.toLowerCase().includes(term)
      )
      .map(student => {
        // Create a displayable version of the student with additional properties
        return {
          ...student,
          displayName: student.full_name, // Use the actual student name
          displayInfo: `${student.age_gender}, ${student.grade}, ${student.Academy}`
        };
      });

    this.showSearchResults = this.searchResults.length > 0;
  }

  loadData(): void {
    this.dashboardData$ = this.filters$.pipe(
      startWith(this.currentFilters), // Emit initial filters
      switchMap(filters => {
        // Combine multiple API calls based on filters
        return combineLatest({
          kpis: this.dataService.getKpis(filters),
          assessments: this.dataService.getStateAssessmentsPerformance(filters)
        });
      })
    );
  }

  applyFilters(): void {
    // Push the current filter values onto the subject
    this.filterSubject.next({ ...this.currentFilters });
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  clearSearch(): void {
    this.currentFilters.searchTerm = '';
    this.searchSubject.next(''); // Trigger update
    this.applyFilters();
    this.showSearchResults = false;
    this.searchResults = [];
  }

  onKpiClick(kpi: KpiData): void {
    if (kpi.navigateTo) {
      this.router.navigate([kpi.navigateTo]);
    } else {
      console.log(`KPI Clicked: ${kpi.title} (No navigation)`);
      // Could potentially filter main view based on KPI click if needed
    }
  }

  // New UI helper methods for KPI cards
  getKpiIconClass(kpi: KpiData): string {
    const extendedKpi = kpi as ExtendedKpiData;
    if (extendedKpi.iconClass) {
      return extendedKpi.iconClass;
    }

    // Default styling based on KPI title
    switch (kpi.title.toLowerCase()) {
      case 'absentee':
      case 'absentees':
        return 'bg-[#F44336]/10';
      case 'attendance':
      case 'attendance rate':
        return 'bg-[#4CAF50]/10';
      case 'tardiness':
        return 'bg-[#FFC107]/10';
      case 'warnings':
        return 'bg-[#FF5722]/10';
      case 'disciplinary action':
      case 'disciplinary actions':
        return 'bg-[#1976D2]/10';
      case 'intervention program':
      case 'interventions':
        return 'bg-[#9C27B0]/10';
      case 'class avg. math':
      case 'math':
        return 'bg-[#00BCD4]/10';
      case 'class avg. ela':
      case 'ela':
        return 'bg-[#FF9800]/10';
      default:
        return 'bg-primary/10';
    }
  }

  getKpiIcon(kpi: KpiData): string {
    const extendedKpi = kpi as ExtendedKpiData;
    if (extendedKpi.icon) {
      return extendedKpi.icon;
    }

    // Default icons based on KPI title
    switch (kpi.title.toLowerCase()) {
      case 'absentee':
      case 'absentees':
        return 'fa-solid fa-user-xmark text-[#F44336] text-xl';
      case 'attendance':
      case 'attendance rate':
        return 'fa-solid fa-user-check text-[#4CAF50] text-xl';
      case 'tardiness':
        return 'fa-solid fa-clock text-[#FFC107] text-xl';
      case 'warnings':
        return 'fa-solid fa-triangle-exclamation text-[#FF5722] text-xl';
      case 'disciplinary action':
      case 'disciplinary actions':
        return 'fa-solid fa-gavel text-[#1976D2] text-xl';
      case 'intervention program':
      case 'interventions':
        return 'fa-solid fa-hands-holding-child text-[#9C27B0] text-xl';
      case 'class avg. math':
      case 'math':
        return 'fa-solid fa-square-root-variable text-[#00BCD4] text-xl';
      case 'class avg. ela':
      case 'ela':
        return 'fa-solid fa-book text-[#FF9800] text-xl';
      default:
        return 'fa-solid fa-chart-line text-primary text-xl';
    }
  }

  getTrendClass(kpi: KpiData): string {
    if (kpi.trend === 'up') {
      // For most metrics, up is good (except absentees/warnings)
      if (kpi.title.toLowerCase().includes('absent') ||
        kpi.title.toLowerCase().includes('warning') ||
        kpi.title.toLowerCase().includes('disciplinary')) {
        return 'text-[#F44336]'; // Red for negative trend
      }
      return 'text-[#4CAF50]'; // Green for positive trend
    }
    else if (kpi.trend === 'down') {
      // For absentees/warnings, down is good
      if (kpi.title.toLowerCase().includes('absent') ||
        kpi.title.toLowerCase().includes('warning') ||
        kpi.title.toLowerCase().includes('disciplinary')) {
        return 'text-[#4CAF50]'; // Green for positive trend
      }
      return 'text-[#F44336]'; // Red for negative trend
    }
    return 'text-[#FFC107]'; // Yellow for neutral/no trend
  }

  getTrendIcon(kpi: KpiData): string {
    if (kpi.trend === 'up') {
      return 'fa-solid fa-arrow-up';
    }
    else if (kpi.trend === 'down') {
      return 'fa-solid fa-arrow-down';
    }
    return 'fa-solid fa-equals';
  }

  getProgressBarClass(kpi: KpiData): string {
    const extendedKpi = kpi as ExtendedKpiData;
    if (extendedKpi.progressBarClass) {
      return extendedKpi.progressBarClass;
    }

    // Default colors based on KPI title
    switch (kpi.title.toLowerCase()) {
      case 'absentee':
      case 'absentees':
        return 'bg-[#F44336]';
      case 'attendance':
      case 'attendance rate':
        return 'bg-[#4CAF50]';
      case 'tardiness':
        return 'bg-[#FFC107]';
      case 'warnings':
        return 'bg-[#FF5722]';
      case 'disciplinary action':
      case 'disciplinary actions':
        return 'bg-[#1976D2]';
      case 'intervention program':
      case 'interventions':
        return 'bg-[#9C27B0]';
      case 'class avg. math':
      case 'math':
        return 'bg-[#00BCD4]';
      case 'class avg. ela':
      case 'ela':
        return 'bg-[#FF9800]';
      default:
        return 'bg-primary';
    }
  }

  getProgressWidth(kpi: KpiData): string {
    return this.utilsService.getProgressWidth(kpi);
  }

  // Helper methods to safely access extended properties
  getTrendValue(kpi: KpiData): string {
    return this.utilsService.getTrendValue(kpi);
  }

  getComparison(kpi: KpiData): string {
    return this.utilsService.getComparison(kpi);
  }

  navigateToStudentDetails(student: StudentWithDisplay): void {
    this.router.navigate(['/teacher/students-details-page', student.student_id]);
    this.clearSearch();
  }
}
