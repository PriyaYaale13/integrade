import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Teacher } from '../../../models/dashboard.model';
import { InterventionFilters } from '../../../models/intervention.model';
import { DataService } from '../../../services/data.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-teachers-intervention-progress',
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule, MatPaginatorModule,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, SidebarComponent
  ],
  templateUrl: './teachers-intervention-progress.component.html',
  styleUrl: './teachers-intervention-progress.component.scss'
})
export class TeachersInterventionProgressComponent {
  dataService = inject(DataService);
  router = inject(Router);

  private filterSubject = new BehaviorSubject<InterventionFilters>({ semester: 'all', grade: '' });
  filters$ = this.filterSubject.asObservable();
  interventionData$!: Observable<any>;
  currentFilters: InterventionFilters = { semester: 'all', interventionType: 'all', grade: 'all' };
  showSearchResults = false;
  private searchTerms = new BehaviorSubject<string>('');
  isLoading = true;
  error: string | null = null;
  displayedColumns: string[] = ['studentName', 'teacher', 'grade', 'type', 'startDate', 'duration', 'status', 'progress', 'actions'];
  semesters$: Observable<string[]> = of(['Winter', 'Fall', 'Spring']); // Simplified semesters for this view
  interventionTypes$: Observable<string[]> = of(['Math', 'Literacy', 'Emotional Management', 'Attendance']);
  effectivenessData = {
    highImpact: { percentage: 0, color: '#4CAF50' },
    mediumImpact: { percentage: 0, color: '#FFC107' },
    lowImpact: { percentage: 0, color: '#F44336' }
  };
  teachersList$!: Observable<{ teachers: Teacher[] }>;
  dataSource = new MatTableDataSource<any>(); // Adjust with your model
  @ViewChild('teacherInterventionPagination') paginator!: MatPaginator;
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  // Navigation menu items for sidebar
  sidebarMenuItems: MenuItem[] = [
    {
      label: 'At Risk Students',
      icon: 'fa-solid fa-triangle-exclamation',
      route: '/principal/principal-at-risk'
    },
    {
      label: 'Interventions',
      icon: 'fa-solid fa-hands-holding-child',
      route: '/principal/teacher-interventions'
    },
    {
      label: 'Behavior Assessment',
      icon: 'fa-solid fa-clipboard-check',
      route: '/principal/teacher-behavior'
    },
    {
      label: 'IEP',
      icon: 'fa-solid fa-file-contract',
      route: '/principal/teacher-iep'
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
      label: 'Assessment Views',
      icon: 'fa-solid fa-chart-bar',
      route: '/teacher/assessment/state'
    },
    {
      label: 'SAT/ACT',
      icon: 'fa-solid fa-chart-line',
      route: '/principal/teacher-sat-act'
    },
    {
      label: 'Students Details Page',
      icon: 'fa-solid fa-chalkboard-teacher',
      route: '/teacher/students-details-page/1',
    }
  ];

  ngOnInit(): void {
    this.loadData();
    // Setup search functionality
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    // UPDATED: Observable type changed to InterventionProgressPageData
    this.interventionData$ = this.filters$.pipe(
      startWith(this.currentFilters),
      switchMap(filters => combineLatest({
        rawProgress: this.dataService.getTeachersIntervenionProgress(filters).pipe(
          catchError(error => {
            console.error('Error fetching intervention progress:', error);
            return of([]);
          })
        ),
        // Fetch summary data (used for both effectiveness and summary report)
        summary: this.dataService.getTeachersInterventionSummary(filters).pipe(
          catchError(error => {
            console.error('Error fetching intervention summary:', error);
            return of([]);
          })
        )
      })),
      map(({ rawProgress, summary }) => {
        // Populate effectivenessData (using placeholder values or calculation)
        this.effectivenessData.highImpact.percentage = 65;
        this.effectivenessData.mediumImpact.percentage = 25;
        this.effectivenessData.lowImpact.percentage = 10;
        // ---- TODO: Replace above with actual calculation from summary data ----
        // Transform progress data for the table
        const transformedProgress = rawProgress.map(item => {
          let badgeClass = '';
          let progressPercent = 0;

          if (item.status === 'On Track') {
            badgeClass = 'status-on-track';
            progressPercent = 75;
          } else if (item.status === 'Not On Track') {
            badgeClass = 'status-not-on-track';
            progressPercent = 25;
          }
          return {
            teacher: {
              name: item.teacherName,
              avatarUrl: 'assets/default-avatar.png',
              id: item.id,
              isWinter: item.isWinter,
              isFall: item.isFall,
              isSpring: item.isSpring,
            },
            student: {
              name: item.studentName
            },
            grade: item.grade,
            type: item.interventionType,
            startValue: item.startValue,
            currentValue: item.currentValue,
            status: { text: item.status, badgeClass: badgeClass },
            progress: progressPercent,
            originalData: item
          };
        });

        // ---- ADDED: Transform summary data for the Summary Report section ----
        const transformedSummaryReport = summary.map(s => {
          // Calculate not-on-track percentage
          const onTrack = s.onTrackPercentage ?? 0;
          const notOnTrack = 100 - onTrack;
          return {
            title: s.interventionType, // e.g., 'Reading Support'
            onTrackPercent: onTrack,
            notOnTrackPercent: notOnTrack
          };
        });

        // Return the combined structure
        return {
          progress: transformedProgress,
          summaryReport: transformedSummaryReport
        };
      }),
      tap((teachersIntervention) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<any>(teachersIntervention.progress);
        this.dataSource.paginator = this.paginator;
        this.setPaginationData();
      }),
      catchError(error => {
        this.isLoading = false;
        this.error = 'Failed to load intervention data. Please try again.';
        // UPDATED: Return empty structure matching InterventionProgressPageData
        return of({ progress: [], summaryReport: [] });
      })
    );
  }

  applyFilters(): void {
    this.filterSubject.next({ ...this.currentFilters });
  }

  clearSearch(inputType: string): void {
    if (inputType === 'studentSearch') {
      this.currentFilters.searchStudent = '';
    } else if (inputType === 'teacherSearch') {
      this.currentFilters.searchTeacher = '';
    }
    this.searchTerms.next('');
    this.showSearchResults = false;
    this.applyFilters();
  }

  // New methods for search functionality
  onSearchTermChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerms.next(input.value);
    this.applyFilters();
  }

  setPaginationData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  // Need to navigate to the student intervention page
  viewStudentDetails(element: any, event: Event): void {
    event.preventDefault();  // Prevent default anchor behavior
    // add fucntionality here if needed
    this.navigateToStudentDetails(element.originalData.id);
    if (element.student?.id) {
    } else {
      console.log('View details for:', element.student?.name, element);
    }
  }

  navigateToStudentDetails(student_id: any): void {
    this.router.navigate(['/principal/student-intervention', student_id]);
  }
}
