import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject, switchMap, startWith, tap, map, of, catchError, debounceTime, distinctUntilChanged } from 'rxjs';
import { delay } from 'rxjs/operators';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

// Shared/App Specific
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';
import { DataService } from '../../../services/data.service';
import { InterventionProgressRecord, InterventionSummaryData } from '../../../models/intervention.model';

// Added interfaces for student search
interface StudentSearchResult {
  id: string;
  displayName: string;
  displayInfo: string;
  image: string;
}

interface InterventionFilters {
    searchTerm?: string;
    semester?: string;
    interventionType?: string;
}

interface TransformedInterventionProgressRecord {
    student?: { name?: string; avatarUrl?: string; id?: string };
    type?: string;
    startValue?: number | string;
    currentValue?: number | string;
    status?: { text?: string; badgeClass?: string };
    progress?: number;
    originalData?: InterventionProgressRecord;
}

// ADDED: Interface for the Summary Report Section
interface InterventionSummaryReportItem {
    title: string;
    onTrackPercent: number;
    notOnTrackPercent: number;
}

// ADDED: Updated interface for the combined data observable
interface InterventionProgressPageData {
    progress: TransformedInterventionProgressRecord[];
    summaryReport: InterventionSummaryReportItem[];
}

@Component({
  selector: 'app-intervention-progress',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent, RouterModule,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule,
    MatMenuModule, SidebarComponent,
    DatePipe
  ],
  templateUrl: './intervention-progress.component.html',
  styleUrls: ['./intervention-progress.component.scss']
})
export class InterventionProgressComponent implements OnInit {
  dataService = inject(DataService);
  router = inject(Router);

  private filterSubject = new BehaviorSubject<InterventionFilters>({ semester: 'Winter Semester' });
  filters$ = this.filterSubject.asObservable();

  // UPDATED: Observable now uses the combined interface
  interventionData$!: Observable<InterventionProgressPageData>;

  effectivenessData = {
    highImpact: { percentage: 0, color: '#4CAF50' },
    mediumImpact: { percentage: 0, color: '#FFC107' },
    lowImpact: { percentage: 0, color: '#F44336' }
  };

  isLoading = true;
  error: string | null = null;
  currentFilters: InterventionFilters = { semester: 'Winter Semester' };

  displayedColumns: string[] = [
    'student',
    'type',
    'startDate',
    'duration',
    'status',
    'progress',
    'actions'
  ];

  semesters$: Observable<string[]> = this.dataService.getSemesters();
  interventionTypes$: Observable<string[]> = of(['All', 'Math', 'Literacy', 'Emotional Management', 'Attendance']);

  // Search functionality
  searchResults: StudentSearchResult[] = [];
  showSearchResults = false;
  private searchTerms = new BehaviorSubject<string>('');

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
      label: 'Assessment Views',
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
    
    // Setup search functionality
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term.trim()) {
          this.showSearchResults = false;
          return of([]);
        }
        return this.dataService.searchStudents(term).pipe(
          catchError(() => of([]))
        );
      })
    ).subscribe(results => {
      this.searchResults = results;
      this.showSearchResults = results.length > 0;
    });
  }

  loadData(): void {
      this.isLoading = true;
      this.error = null;

      // UPDATED: Observable type changed to InterventionProgressPageData
      this.interventionData$ = this.filters$.pipe(
          startWith(this.currentFilters),
          switchMap(filters => combineLatest({
              rawProgress: this.dataService.getInterventionProgress(filters).pipe(
                catchError(error => {
                  console.error('Error fetching intervention progress:', error);
                  return of([]);
                })
              ),
              // Fetch summary data (used for both effectiveness and summary report)
              summary: this.dataService.getInterventionSummary(filters).pipe(
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
                    student: { 
                      name: item.studentName, 
                      avatarUrl: 'assets/default-avatar.png',
                      id: item.id
                    },
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
          tap(() => {
            this.isLoading = false;
          }),
          catchError(error => {
            this.isLoading = false;
            this.error = 'Failed to load intervention data. Please try again.';
            console.error('Error in combined intervention data stream:', error);
            // UPDATED: Return empty structure matching InterventionProgressPageData
            return of({ progress: [], summaryReport: [] }); 
          })
      );
  }

  applyFilters(): void {
    this.filterSubject.next({ ...this.currentFilters });
  }

  clearSearch(): void {
    this.currentFilters.searchTerm = '';
    this.searchTerms.next('');
    this.showSearchResults = false;
    this.applyFilters();
  }

  viewDetails(element: TransformedInterventionProgressRecord): void {
    if (element.student?.id) {
      this.navigateToStudentDetails({ id: element.student.id, displayName: element.student.name || '', displayInfo: element.type || '', image: element.student.avatarUrl || '' });
    } else {
      console.log('View details for:', element.student?.name, element);
    }
  }

  // New methods for search functionality
  onSearchTermChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerms.next(input.value);
  }

  navigateToStudentDetails(student: StudentSearchResult): void {
    this.showSearchResults = false;
    this.router.navigate(['/teacher/students-details-page', student.id]);
  }
}
