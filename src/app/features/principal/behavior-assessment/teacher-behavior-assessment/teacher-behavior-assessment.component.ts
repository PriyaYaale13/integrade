import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { BehaviorSubject, catchError, combineLatest, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { BehaviorFilters, BehaviorRecord } from '../../../../models/behavior.model';
import { KpiData } from '../../../../models/dashboard.model';
import { DataService } from '../../../../services/data.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { SidebarComponent,MenuItem } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-teacher-behavior-assessment',
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule, MatPaginatorModule, KpiCardComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatCheckbox, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, SidebarComponent
  ],
  templateUrl: './teacher-behavior-assessment.component.html',
  styleUrl: './teacher-behavior-assessment.component.scss'
})
export class TeacherBehaviorAssessmentComponent implements OnInit {
  dataService = inject(DataService);

  private filterSubject = new BehaviorSubject<BehaviorFilters>({ semester: 'all', grade: 'all', class: 'all' }); // Default semester from page 15/18
  filters$ = this.filterSubject.asObservable();

  // Combined observable for table and side charts
  teachersBehaviorData$!: Observable<{
    records: BehaviorRecord[],
    kpis: KpiData[],
  }>;
  isLoading = true;
  error: string | null = null;
  currentFilters: BehaviorFilters = { semester: 'all', interventionType: 'all', searchTerm: '', grade: 'all', class: 'all' };
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  classes$: Observable<string[]> = this.dataService.getClassList();
  // Columns based on Page 15/18
  displayedColumns: string[] = ['studentName', 'teacherName', 'gradeLevel', 'class', 'attendance', 'tardinessCount', 'absentDays', 'earlyDismissalCount', 'warnings', 'status'];
  semesters$: Observable<string[]> = of(['Winter', 'Fall', 'Spring']); // Simplified semesters for this view
  dataSource = new MatTableDataSource<any>(); // Adjust with your model
  @ViewChild('teacherBehaviorPagination') paginator!: MatPaginator;
  // Navigation menu items for sidebar
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
    this.teachersBehaviorData$ = this.filters$.pipe(
      startWith(this.currentFilters),
      switchMap(filters => {
        return combineLatest({
          records: this.dataService.getTeachersBehaviorAssessments(filters).pipe(
            catchError(error => {
              return of([]);
            })
          ),
          kpis: this.dataService.getStudentBehaviorKpis(filters).pipe(
            catchError(error => {
              return of([]);
            })
          )
        })
      }),
      tap((teacherBehavior) => {
        this.isLoading = false;
        teacherBehavior.kpis[0].value = teacherBehavior.records.length.toString();
        teacherBehavior.kpis = this.dataService.updateKpiData(teacherBehavior.kpis, teacherBehavior.records);
        console.log("target reached teacherBehavior.records: ", teacherBehavior.records);
        this.dataSource = new MatTableDataSource<any>(teacherBehavior.records);
        this.dataSource.paginator = this.paginator;
        this.setPaginationData();
      }),
      catchError(error => {
        this.isLoading = false;
        this.error = 'Failed to load behavior data. Please try again.';
        return of({ records: [], kpis: [] });
      })
    );
  }


  applyFilters(): void {
    this.filterSubject.next({ ...this.currentFilters });
  }

  clearSearch(): void {
    this.currentFilters.searchTerm = '';
    this.applyFilters();
  }

  setPaginationData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  exportToExcel(): void {
    const dataToExport = this.dataSource.data.map(({ id, ...rest }) => rest); // Remove id
    const csv = Papa.unparse(dataToExport); // Convert JSON to CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Teachers.csv');
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
