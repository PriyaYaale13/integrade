import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


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
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { KpiData } from '../../../models/dashboard.model';
import { DataService } from '../../../services/data.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';

import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';
import { BehaviorAssessmentFilterTableComponent } from '../../teachers/components/behavioral-assessment/behavior-assessment-filter-table/behavior-assessment-filter-table.component';

import { BehaviorAssessmentTableChartsComponent } from '../../teachers/components/behavioral-assessment/behavior-assessment-table-charts/behavior-assessment-table-charts.component';
import { BehaviorAssessmentService } from '../../../services/behavior-assessment.service';
import { BehaviorAssessment, MonthlyBehavior } from '../../../models/behavior-assessment.model';
import { BehaviorAssessmentKpiCardComponent } from '../../teachers/components/behavioral-assessment/behavior-assessment-kpi-card/behavior-assessment-kpi-card.component';

interface BehaviorFilters {
  searchTerm?: string;
  semester?: string;
  interventionType?: string;
  grade?: string;
  class?: string; // Added class property
}

@Component({
  selector: 'app-behavior-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule, MatPaginatorModule, BehaviorAssessmentFilterTableComponent, BehaviorAssessmentTableChartsComponent,
    MatTableModule, MatFormFieldModule, MatInputModule, BehaviorAssessmentKpiCardComponent, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, SidebarComponent],
  templateUrl: './behavior-assessment.component.html',
  styleUrls: ['./behavior-assessment.component.scss']
})
export class BehaviorAssessmentComponent implements OnInit {
  dataService = inject(DataService);
  totalStudents = 0;
  totalAttendance = 0;
  totalTardiness = 0;
  totalWarnings = 0;
  totalabsentDays = 0;
  totalmales = 5;
  totalfemales = 5;
  totalerlyDismissalCount = 0;
  attendanceComparison = 0;
  tardinessComparison = 0;
  warningsComparison = 0;
  absentDaysComparison = 0;
  earlyDismissalComparison = 0;

  private filterSubject = new BehaviorSubject<BehaviorFilters>({ semester: 'all', grade: 'all', class: 'all' }); // Default semester from page 15/18
  filters$ = this.filterSubject.asObservable();

  // Combined observable for table and side charts
  teachersBehaviorData$!: Observable<{
    records: MonthlyBehavior[],
    kpis: KpiData[],
  }>;
  isLoading = true;
  error: string | null = null;
  currentFilters: BehaviorFilters = { semester: 'all', interventionType: 'all', searchTerm: '', grade: 'all', class: 'all' };
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  classes$: Observable<string[]> = this.dataService.getClassList();
  // Columns based on Page 15/18
  displayedColumns: string[] = ['studentName', 'gradeLevel', 'attendance', 'tardinessCount', 'absentDays', 'earlyDismissalCount', 'warnings', 'status'];
  semesters$: Observable<string[]> = of(['Winter', 'Fall', 'Spring']); // Simplified semesters for this view
  dataSource = new MatTableDataSource<any>(); // Adjust with your model
  @ViewChild('teacherBehaviorPagination') paginator!: MatPaginator;
  // Navigation menu items for sidebar
  sidebarMenuItems: MenuItem[] = [
    {
      label: 'At Risk',
      icon: 'fa-solid fa-triangle-exclamation',
      route: '/teacher/at-risk'
    },
    {
      label: 'Interventions',
      icon: 'fa-solid fa-hands-holding-child',
      route: '/teacher/teacher-interventions'
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
  behaviorAssessmentService = inject(BehaviorAssessmentService);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;

    this.teachersBehaviorData$ = this.filters$.pipe(
      switchMap(filters =>
        this.behaviorAssessmentService.getDataForMay().pipe(
          map((students: BehaviorAssessment[]) => {
            let records = students.flatMap(student =>
              student.data.map((entry: MonthlyBehavior) => ({
                studentName: student.studentName,
                gradeLevel: student.gradeLevel,
                semester: student.semester,
                ...entry
              }))
            );


            if (filters.searchTerm) {
              const term = filters.searchTerm.toLowerCase();
              records = records.filter(r =>
                r.studentName.toLowerCase().includes(term)
              );
            }


            if (filters.semester && filters.semester !== 'all') {
              records = records.filter(r => r.semester === filters.semester);
            }


            this.calculateKpis(records);
            const comparisons = this.compareBehaviorData([], records);
            if (comparisons.length > 0) {
              const {
                attendanceComparison,
                tardinessComparison,
                warningsComparison,
                absentDaysComparison,
                earlyDismissalComparison
              } = comparisons[0];

              this.attendanceComparison = attendanceComparison;
              this.tardinessComparison = tardinessComparison;
              this.warningsComparison = warningsComparison;
              this.absentDaysComparison = absentDaysComparison;
              this.earlyDismissalComparison = earlyDismissalComparison;
            }

            return {
              records,
              kpis: []
            };
          }),
          tap(result => {
            this.isLoading = false;
            this.dataSource.data = result.records;
          }),
          catchError(() => {
            this.isLoading = false;
            this.error = 'Failed to load behavior data for May. Please try again.';
            return of({ records: [], kpis: [] });
          })
        )
      )
    );
  }

  compareBehaviorData(previousMonthData: MonthlyBehavior[], currentMonthData: MonthlyBehavior[]): any[] {
    return currentMonthData.map((currentRecord, index) => {

      const previousRecord = previousMonthData[index] || {};

      const attendanceComparison = +(currentRecord.attendance - (previousRecord.attendance || 0)).toFixed(1);
      const tardinessComparison = currentRecord.tardinessCount - (previousRecord.tardinessCount || 0);
      const warningsComparison = currentRecord.warnings - (previousRecord.warnings || 0);
      const absentDaysComparison = currentRecord.absentDays - (previousRecord.absentDays || 0);
      const earlyDismissalComparison = currentRecord.disciplinaryActions - (previousRecord.disciplinaryActions || 0);


      return {
        attendanceComparison,
        tardinessComparison,
        warningsComparison,
        absentDaysComparison,
        earlyDismissalComparison,
      };
    });
  }



  calculateChange(previous: number, current: number): { value: number, direction: 'up' | 'down', color: string } {
    const change = current - previous;
    const direction: 'up' | 'down' = change >= 0 ? 'up' : 'down';
    const color = change >= 0 ? 'green' : 'red';

    return {
      value: change,
      direction,
      color,
    };
  }


  calculateKpis(records: MonthlyBehavior[]): void {

    this.totalStudents = records.length;


    this.totalAttendance = records.reduce((acc, record) => acc + (record.attendance || 0), 0);
    this.totalAttendance = (this.totalAttendance / records.length) || 0;
    this.totalAttendance = parseFloat(this.totalAttendance.toFixed(1));






    this.totalmales = parseFloat(this.totalmales.toFixed(1));
    this.totalTardiness = records.reduce((acc, record) => acc + (record.tardinessCount || 0), 0);
    this.totalTardiness = (this.totalTardiness / records.length) || 0;
    this.totalTardiness = parseFloat(this.totalTardiness.toFixed(1));


    this.totalWarnings = records.reduce((acc, record) => acc + (record.warnings || 0), 0);
    this.totalWarnings = (this.totalWarnings / records.length) || 0;
    this.totalWarnings = parseFloat(this.totalWarnings.toFixed(1));


    this.totalabsentDays = records.reduce((acc, record) => acc + (record.absentDays || 0), 0);
    this.totalabsentDays = (this.totalabsentDays / records.length) || 0;
    this.totalabsentDays = parseFloat(this.totalabsentDays.toFixed(1));


    this.totalerlyDismissalCount = records.reduce((acc, record) => acc + (record.disciplinaryActions || 0), 0);
    this.totalerlyDismissalCount = (this.totalerlyDismissalCount / records.length) || 0;
    this.totalerlyDismissalCount = parseFloat(this.totalerlyDismissalCount.toFixed(1));
  }








  applyFilters(): void {
    this.filterSubject.next({ ...this.currentFilters });
  }
  onFiltersChanged(updatedFilters: BehaviorFilters): void {
    this.currentFilters = { ...updatedFilters };
    this.applyFilters();
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
    const dataToExport = this.dataSource.data.map(({ id, ...rest }) => rest);
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Teachers.csv');
  }



  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }
}