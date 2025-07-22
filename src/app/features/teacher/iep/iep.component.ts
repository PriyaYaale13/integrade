import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';
import { MatCardModule } from '@angular/material/card';

import { saveAs } from 'file-saver';
import Papa from 'papaparse';

// App Components
import { HeaderComponent } from '../../../shared/components/header/header.component';

// Models and Services
import { DataService } from '../../../services/data.service';
import { BehaviorSubject, catchError, combineLatest, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { IepFilters, IepStudent } from '../../../models/iep.model';
import { KpiData } from '../../../models/dashboard.model';
@Component({
  selector: 'app-iep',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatMenuModule,
    MatCardModule,
    KpiCardComponent,
    SidebarComponent
  ],
  templateUrl: './iep.component.html',
  styleUrls: ['./iep.component.scss']
})
export class IepComponent implements OnInit {
  private dataService = inject(DataService);

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
      icon: 'fa-solid fa-school',
      route: '/teacher/students-details-page',
    }
  ];

  teachersIepData$!: Observable<{
    records: IepStudent[],
    kpis: KpiData[],
  }>;
  isLoading = true;
  error: string | null = null;

  currentFilters: IepFilters = { grade: 'all', iepCategory: 'all', searchTerm: '', progressStatus: 'all' };
  grades$: Observable<string[]> = this.dataService.getStudentsGrade();
  iepCategoryList$: Observable<string[]> = this.dataService.getStudentsIepCategoryList();
  progressStatusList$: Observable<string[]> = this.dataService.getStudentsIepProgressStatus();
  private filterSubject = new BehaviorSubject<IepFilters>({
    grade: 'all',
    iepCategory: 'all',
    progressStatus: 'all',
    searchTerm: ''
  });
  filters$ = this.filterSubject.asObservable();
  dataSource = new MatTableDataSource<any>();
  @ViewChild('teacherIepPagination') paginator!: MatPaginator;
  private searchSubject = new Subject<string>();


  displayedColumns: string[] = ['name', 'grade', 'category', 'progress', 'goalsMet', 'nextReview'];

  currentPage = 1;
  totalPages = 9;

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    this.teachersIepData$ = this.filters$.pipe(
      startWith(this.currentFilters),
      switchMap(filters => {
        return combineLatest({
          records: this.dataService.getStudentIepList(filters).pipe(
            catchError(error => {
              return of([]);
            })
          ),
          kpis: this.dataService.getTeachersIepKpis(filters).pipe(
            catchError(error => {
              return of([]);
            })
          )
        })
      }),
      tap((teacherIep) => {
        if (Array.isArray(teacherIep.kpis) && teacherIep.kpis.length > 0) {
          teacherIep.kpis[0].value = teacherIep.records.length.toString();
        } else {
          teacherIep.kpis = []; // Initialize as an empty array if undefined or null
        }
        teacherIep.kpis = this.dataService.updateKpiData(teacherIep.kpis, teacherIep.records);
        this.isLoading = false;
        const transformedRecords = (teacherIep.records || []).map(record => {
          let progressClass = '';
          if (record.progress < 30) {
            progressClass = 'progress-low';      // Red
          } else if (record.progress < 50) {
            progressClass = 'progress-medium';   // Orange/Yellow
          } else {
            progressClass = 'progress-high';     // Green
          }
          return { ...record, progressClass };
        });

        this.dataSource = new MatTableDataSource<any>(transformedRecords);
        this.dataSource.paginator = this.paginator;
        this.setPaginationData();
      }),
      catchError(error => {
        this.isLoading = false;
        this.error = 'Failed to load Iep data. Please try again.';
        return of({ kpis: [], records: [] });
      })
    );
  }

  setPaginationData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
    this.applyFilters();
  }

  applyFilters(): void {
    this.filterSubject.next({ ...this.currentFilters });
  }

  clearSearch(): void {
    this.currentFilters.searchTerm = '';
    this.applyFilters();
  }

  viewStudentChart(student: IepStudent): void {
    console.log('Viewing chart for student:', student.name);
  }

  editStudentIEP(student: IepStudent): void {
    console.log('Editing IEP for student:', student.name);
  }

  exportReport(): void {
    console.log('Exporting IEP report');
  }

  getProgressColorClass(progress: number): string {
    if (progress >= 70) return 'bg-[#4caf50]';
    if (progress >= 40) return 'bg-[#ff9800]';
    return 'bg-[#f44336]';
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  exportToExcel(): void {
    const dataToExport = this.dataSource.data.map(({ id, ...rest }) => rest); // Remove id
    const csv = Papa.unparse(dataToExport); // Convert JSON to CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Students.csv');
  }
} 