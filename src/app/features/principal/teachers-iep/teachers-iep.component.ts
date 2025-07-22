import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { BehaviorSubject, catchError, combineLatest, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { KpiData } from '../../../models/dashboard.model';
import { IepFilters, IepTeacherWithStudent } from '../../../models/iep.model';
import { DataService } from '../../../services/data.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-teachers-iep',
  imports: [
    CommonModule, FormsModule, HeaderComponent, RouterModule, MatPaginatorModule, KpiCardComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, SidebarComponent
  ],
  templateUrl: './teachers-iep.component.html',
  styleUrl: './teachers-iep.component.scss'
})
export class TeachersIepComponent implements OnInit {
  private dataService = inject(DataService);
  teachersIepData$!: Observable<{
    records: IepTeacherWithStudent[],
    kpis: KpiData[],
  }>;
  isLoading = true;
  error: string | null = null;
  currentFilters: IepFilters = { grade: 'all', iepCategory: 'all', searchTeacher: '', searchStudent: '', progressStatus: 'all' };
  private filterSubject = new BehaviorSubject<IepFilters>({
    grade: 'all',
    iepCategory: 'all',
    progressStatus: 'all',
    searchTeacher: '',
    searchStudent: ''
  });
  private searchSubject = new Subject<string>();
  filters$ = this.filterSubject.asObservable();
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  iepCategoryList$: Observable<string[]> = this.dataService.getTeacherIepCategoryList();
  progressStatusList$: Observable<string[]> = this.dataService.getTeachersIepProgressStatus();
  displayedColumns: string[] = ['studentName', 'teacherName', 'gradeLevel', 'category', 'progress', 'goalsMet', 'nextReview', 'status'];
  dataSource = new MatTableDataSource<any>(); // Adjust with your model
  @ViewChild('teacherIepPagination') paginator!: MatPaginator;
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
    },
    {
      label: 'Awards & Recognition',
      icon: 'fa-solid fa-chalkboard-teacher',
      route: '/principal/award-recognition',
    }
  ];

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
          records: this.dataService.getTeacherIepList(filters).pipe(
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
        // Update total students KPI
        teacherIep.kpis[0].value = teacherIep.records.length.toString();
        // Update other KPIs (On Track, Needs Support, Critical)
        teacherIep.kpis = this.dataService.updateKpiData(teacherIep.kpis, teacherIep.records);
        this.isLoading = false;
        const transformedRecords = (teacherIep.records || []).map(record => {
          let progressClass = '';
          if (record.progress < 50) {
            progressClass = 'progress-low';      // Red
          } else if (record.progress < 75) {
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

  clearSearch(inputType: string): void {
    if (inputType === 'studentSearch') {
      this.currentFilters.searchStudent = '';
    } else if (inputType === 'teacherSearch') {
      this.currentFilters.searchTeacher = '';
    }
    this.currentFilters.searchTeacher = '';
    this.applyFilters();
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
    this.applyFilters();
  }

  applyFilters(): void {
    // Reset teacher if grade changes and selected teacher not in new list? (Add logic if needed)
    this.filterSubject.next({ ...this.currentFilters });
  }

  exportToExcel(): void {
    const dataToExport = this.dataSource.data.map(({ id, ...rest }) => rest); // Remove id
    const csv = Papa.unparse(dataToExport); // Convert JSON to CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Students.csv');
  }

}