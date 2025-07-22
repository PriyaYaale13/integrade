// src/app/features/students/containers/students-list/students-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import * as StudentsActions from '../../../../state/students/students.actions';
import * as StudentsSelectors from '../../../../state/students/students.selectors';
import { Student } from '../../../../models';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  students$: Observable<Student[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  
  displayedColumns: string[] = [
    'name', 'grade', 'riskStatus', 'riskScore', 'actions'
  ];

  constructor(private store: Store<AppState>) {
    this.students$ = this.store.select(StudentsSelectors.selectAllStudents);
    this.loading$ = this.store.select(StudentsSelectors.selectStudentsLoading);
    this.error$ = this.store.select(StudentsSelectors.selectStudentsError);
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  getFullName(student: Student): string {
    return `${student.firstName} ${student.lastName}`;
  }

  getRiskStatusText(atRisk: boolean): string {
    return atRisk ? 'At Risk' : 'Normal';
  }

  getRiskStatusClass(atRisk: boolean): string {
    return atRisk ? 'risk-status-at-risk' : 'risk-status-normal';
  }
}
