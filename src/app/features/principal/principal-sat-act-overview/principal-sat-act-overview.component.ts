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
import { RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { AssessmentScoreRecord, StateAssessmentScoreDistributionData } from '../../../models/assessment.model';
import { KpiData, StateAssessmentPerformanceData } from '../../../models/dashboard.model';
import { SatActFilters } from '../../../models/general.model';
import { DataService } from '../../../services/data.service';
import { StateAssessmentChartComponent } from '../../../shared/components/charts/state-assessment-chart/state-assessment-chart.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-principal-sat-act-overview',
  imports: [CommonModule, FormsModule, HeaderComponent, StateAssessmentChartComponent, RouterModule, MatPaginatorModule,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, SidebarComponent],
  templateUrl: './principal-sat-act-overview.component.html',
  styleUrl: './principal-sat-act-overview.component.scss'
})
export class PrincipalSatActOverviewComponent {
  dataService = inject(DataService);

  private filterSubject = new BehaviorSubject<SatActFilters>({ semester: 'all', grade: 'all', class: 'all' }); // Default semester from page 15/18
  filters$ = this.filterSubject.asObservable();
  isLoading = true;
  error: string | null = null;
  // Combined observable for table and side charts
  satActBehaviourData$!: Observable<{
    records: { scores: AssessmentScoreRecord[], distribution: StateAssessmentScoreDistributionData[] }
    performanceOverview: StateAssessmentPerformanceData[]
  }>;
  currentFilters: SatActFilters = { semester: 'all', class: 'all', searchStudent: '', grade: 'all', searchTeacher: '' };
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  classes$: Observable<string[]> = this.dataService.getClassList();
  semesters$: Observable<string[]> = this.dataService.getSemesters();
  performanceOverview: StateAssessmentPerformanceData[] = [];
  displayedColumns: string[] = ['studentName', 'grade', 'semester', 'mathematics', 'verbal', 'status'];
  dataSource = new MatTableDataSource<any>(); // Adjust with your model
  @ViewChild('satActPagination') paginator!: MatPaginator;

  sidebarMenuItems: MenuItem[] = [
    {
      label: 'At Risk',
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
      label: 'State Assessment',
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
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    // Get overview bars (could be filtered or static context)
    this.satActBehaviourData$ = this.filters$.pipe(
      startWith(this.currentFilters),
      switchMap(filters => {
        return this.dataService.getSatActViewData(filters).pipe(
          catchError(error => of({ scores: [], distribution: [] })),
          switchMap(({ scores, distribution }) => {
            return combineLatest({
              records: of({ scores, distribution }),
              performanceOverview: of(this.calculatePerformanceOverview(scores))
            });
          })
        );
      }),
      tap((satActOverview) => {
        this.isLoading = false;
        this.performanceOverview = satActOverview.performanceOverview || [];
        this.dataSource = new MatTableDataSource<any>(satActOverview.records.scores);
        this.dataSource.paginator = this.paginator;
        this.setPaginationData();
      }),
      catchError(error => {
        this.isLoading = false;
        this.error = 'Failed to load behavior data. Please try again.';
        return of({
          records: { scores: [], distribution: [] },
          performanceOverview: []
        });
      })
    );

  }

  calculatePerformanceOverview(scores: AssessmentScoreRecord[]): StateAssessmentPerformanceData[] {
    const subjects = ['Math', 'Verbal'];
    return subjects.map(subject => {
      let key = subject === 'Math' ? 'mathScore' : 'verbalScore';
      const subjectScores = scores.map(s => s[key as keyof AssessmentScoreRecord] as number).filter(score => typeof score === 'number');
      if (!subjectScores.length) {
        return {
          subject,
          stateAverage: 0,
          classAverage: 0,
          minScale: 0,
          maxScale: 100,
          performanceLevels: { belowBasic: 0, basic: 0, proficient: 0, advanced: 0 }
        };
      }
      const total = subjectScores.reduce((a, b) => a + b, 0);
      const avg = total / subjectScores.length;
      // Create mock performance bands
      const performanceLevels = {
        belowBasic: Math.round((subjectScores.filter(score => score < 500).length / subjectScores.length) * 100),
        basic: Math.round((subjectScores.filter(score => score >= 500 && score < 600).length / subjectScores.length) * 100),
        proficient: Math.round((subjectScores.filter(score => score >= 600 && score < 700).length / subjectScores.length) * 100),
        advanced: Math.round((subjectScores.filter(score => score >= 700).length / subjectScores.length) * 100)
      };
      return {
        subject,
        stateAverage: Math.round(avg - 5), // mock state avg slightly lower
        classAverage: Math.round(avg),
        minScale: 400,
        maxScale: 800,
        performanceLevels
      };
    });
  }

  setPaginationData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  applyFilters(): void {
    this.filterSubject.next({ ...this.currentFilters });
  }


  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'excellent':
        return 'bg-green-200 text-green-800';  // Light green background for excellent
      case 'good':
        return 'bg-blue-200 text-blue-800';    // Light blue background for good
      case 'average':
        return 'bg-yellow-200 text-yellow-800'; // Light yellow background for average
      case 'poor':
        return 'bg-red-200 text-red-800';    // Light red background for poor
      default:
        return 'bg-gray-200 text-gray-800';   // Light gray background for other statuses
    }
  }

  clearSearch(): void {
    this.currentFilters.searchStudent = '';
    this.applyFilters();
  }
}
