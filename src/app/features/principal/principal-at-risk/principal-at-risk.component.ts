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
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { KpiData } from '../../../models/dashboard.model';
import { AtRiskFilters, AtRiskStudent } from '../../../models/risk.models';
import { DataService } from '../../../services/data.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-principal-at-risk',
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule, MatPaginatorModule, KpiCardComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, SidebarComponent
  ],
  templateUrl: './principal-at-risk.component.html',
  styleUrl: './principal-at-risk.component.scss'
})
export class PrincipalAtRiskComponent implements OnInit {
  private dataService = inject(DataService);
  router = inject(Router);

  principalAtRiskData$!: Observable<{
    records: AtRiskStudent[],
    kpis: KpiData[],
  }>;
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  classes$: Observable<string[]> = this.dataService.getClassList();
  riskLevelList$: Observable<string[]> = this.dataService.getAlRiskLevelList();
  private searchSubject = new Subject<string>();
  currentFilters: AtRiskFilters = { grade: 'all', class: 'all', searchStudent: '', searchTeacher: '', riskLevel: 'all' };
  private filterSubject = new BehaviorSubject<AtRiskFilters>({
    grade: 'all',
    class: 'all',
    riskLevel: 'all',
    searchStudent: '',
    searchTeacher: ''
  });
  isLoading = true;
  error: string | null = null;
  filters$ = this.filterSubject.asObservable();
  displayedColumns: string[] = ['studentName', 'teacherName', 'gradeLevel', 'class', 'riskLevel', 'riskFactors', 'currentGPA', 'attendance', 'actions'];
  dataSource = new MatTableDataSource<any>(); // Adjust with your model
  @ViewChild('principalAtRiskPagination') paginator!: MatPaginator;

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
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    this.principalAtRiskData$ = this.filters$.pipe(
      startWith(this.currentFilters),
      switchMap(filters => {
        return combineLatest({
          records: this.dataService.getAtRiskStudentsList(filters).pipe(
            catchError(error => {
              return of([]);
            })
          ),
          kpis: this.dataService.getStudentAtRiskKpis(filters).pipe(
            catchError(error => {
              return of([]);
            })
          )
        })
      }),
      tap((principalAtRisk) => {
        principalAtRisk.kpis[0].value = principalAtRisk.records.length.toString();
        principalAtRisk.kpis = this.dataService.updateKpiData(principalAtRisk.kpis, principalAtRisk.records);
        console.log("target reached principalAtRisk.kpis: ", principalAtRisk.kpis);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<any>(principalAtRisk.records);
        this.dataSource.paginator = this.paginator;
        this.setPaginationData();
      }),
      catchError(error => {
        this.isLoading = false;
        this.error = 'Failed to load Iep data. Please try again.';
        return of({ records: [], kpis: [] });
      })
    );
  }


  setPaginationData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  clearSearch(): void {
    this.currentFilters.searchTeacher = '';
    this.currentFilters.searchStudent = '';
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

  viewStudentDetails(element: any, event: Event): void {
    event.preventDefault();  // Prevent default anchor behavior
    this.router.navigate(['/principal/at-risk-student-detail', element?.studentId.toString()])
  }
}
