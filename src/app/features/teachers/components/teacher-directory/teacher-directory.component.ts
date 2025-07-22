import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
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
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { KpiData, Teacher } from '../../../../models/dashboard.model';
import { TeacherDirectoryFilters } from '../../../../models/teacher.model';
import { DataService } from '../../../../services/data.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { SidebarComponent,MenuItem } from '../../../../shared/components/sidebar/sidebar.component';


@Component({
  selector: 'app-teacher-directory',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, RouterModule, HeaderComponent, KpiCardComponent,
    MatButtonModule, MatSelectModule, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatDividerModule, MatBadgeModule, MatTooltipModule, MatProgressSpinnerModule,
    SidebarComponent],
  templateUrl: './teacher-directory.component.html',
  styleUrl: './teacher-directory.component.scss'
})
export class TeacherDirectoryComponent implements OnInit, AfterViewInit, OnDestroy {
  private dataService = inject(DataService);
  departments$: Observable<string[]> = this.dataService.getTeacherDepartments();
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  employmentStatuses$: Observable<string[]> = this.dataService.getEmploymentStatuses();
  currentFilters: TeacherDirectoryFilters = { grade: 'all', department: 'all', employmentStatus: 'all', searchTerm: '' };
  private filterSubject = new BehaviorSubject<TeacherDirectoryFilters>({
    grade: 'all',
    department: 'all',
    employmentStatus: 'all',
    searchTerm: ''
  });
  filters$ = this.filterSubject.asObservable();
  dashboardData$!: Observable<{ kpis: KpiData[] }>;
  teachersList$!: Observable<{ teachers: Teacher[] }>;
  @ViewChild('teacherListPagination') paginator!: MatPaginator;
  private subscriptionList = new Subscription();
  dataSource = new MatTableDataSource<Teacher>(); // Adjust with your model
  // Search term handling with debounce
  private searchSubject = new Subject<string>();

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
      route: '/principal/interventions'
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

  displayedColumns: string[] = ['teacher', 'department', 'gradeLevel', 'experience', 'student', 'performance', 'status'];

  ngOnInit(): void {
    this.setupSearchDebounce();
    this.loadData();
  }

  loadData(): void {
    this.dashboardData$ = this.filters$.pipe(
      startWith(this.currentFilters),
      switchMap(filters => {
        // Use principal-specific methods or pass filters to general methods
        return combineLatest({
          // Note: Using general methods and just passing filters for mock
          kpis: this.dataService.getTeacherDirectoriesKpis(filters),
        });
      }),
      tap(() => {

      })
    );

    this.teachersList$ = this.filters$.pipe(startWith(this.currentFilters),
      switchMap(filters => {
        return combineLatest({
          teachers: this.dataService.getTeachersList(filters),

        });
      }), tap((teacherPerformance) => {
        console.log('this.currentFilters', this.currentFilters)
        this.dataSource = new MatTableDataSource<Teacher>(teacherPerformance.teachers);
        this.dataSource.paginator = this.paginator;
        this.setPaginationData();
      }));
  }

  setPaginationData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  applyFilters(): void {
    this.filterSubject.next({ ...this.currentFilters });
  }

  private setupSearchDebounce(): void {
    this.subscriptionList.add(this.searchSubject.pipe(
      debounceTime(400), // Wait for 400ms pause in typing
      distinctUntilChanged() // Only emit if value changed
    ).subscribe((searchTerm: any) => {
      this.currentFilters.searchTerm = searchTerm;
      this.applyFilters();
      this.searchTeacher(searchTerm);
    }));
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  searchTeacher(searchTerm: any) {
    console.log('coming -->', searchTerm)
  }

  clearSearch(): void {
    this.currentFilters.searchTerm = '';
    this.searchSubject.next(''); // Trigger update
    this.applyFilters();
  }

  exportToExcel(): void {
    const dataToExport = this.dataSource.data.map(({ id, ...rest }) => rest); // Remove id
    const csv = Papa.unparse(dataToExport); // Convert JSON to CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Teachers.csv');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }
}
