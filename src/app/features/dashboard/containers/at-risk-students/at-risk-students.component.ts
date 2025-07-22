// src/app/features/dashboard/containers/at-risk-students/at-risk-students.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import * as DashboardActions from '../../../../state/dashboard/dashboard.actions';
import * as DashboardSelectors from '../../../../state/dashboard/dashboard.selectors';

@Component({
  selector: 'app-at-risk-students',
  templateUrl: './at-risk-students.component.html',
  styleUrls: ['./at-risk-students.component.scss']
})
export class AtRiskStudentsComponent implements OnInit {
  atRiskStudents$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  
  displayedColumns: string[] = [
    'studentName', 
    'absenteeism', 
    'tardiness', 
    'elaScore', 
    'mathsScore', 
    'scienceScore', 
    'disciplinaryActions', 
    'suspension', 
    'riskScore', 
    'suggestedInterventions',
    'actions'
  ];
  
  pieChartData: any[] = [];

  constructor(private store: Store<AppState>) {
    this.atRiskStudents$ = this.store.select(DashboardSelectors.selectAtRiskStudents);
    this.loading$ = this.store.select(DashboardSelectors.selectDashboardLoading);
    this.error$ = this.store.select(DashboardSelectors.selectDashboardError);
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadAtRiskStudents());
    this.updateChartData();
  }

  private updateChartData(): void {
    this.pieChartData = [
      { label: 'High Risk', value: 60, color: '#e53935' },
      { label: 'Medium Risk', value: 10, color: '#fb8c00' },
      { label: 'Low Risk', value: 30, color: '#43a047' }
    ];
  }

  getStudentName(student: any): string {
    return `${student.firstName} ${student.lastName}`;
  }

  formatAbsenteeism(value: number | null): string {
    return value !== null ? `${value} days` : '-';
  }

  formatTardiness(value: number | null): string {
    return value !== null ? `${value} times` : '-';
  }

  getScoreClass(score: number | null): string {
    if (score === null) return '';
    
    if (score < 70) {
      return 'score-danger';
    } else if (score < 80) {
      return 'score-warning';
    }
    
    return '';
  }

  getRiskScoreClass(score: number | null): string {
    if (score === null) return '';
    
    if (score >= 90) {
      return 'risk-high';
    } else if (score >= 80) {
      return 'risk-medium';
    }
    
    return 'risk-low';
  }
}
