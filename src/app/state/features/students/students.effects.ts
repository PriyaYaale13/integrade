// src/app/state/students/students.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as StudentsActions from './students.actions';
import { StudentsService } from '../../features/students/services/students.service';

@Injectable()
export class StudentsEffects {
  
  loadStudents$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.loadStudents),
    switchMap(() => {
      return this.studentsService.getStudents().pipe(
        map(students => StudentsActions.loadStudentsSuccess({ students })),
        catchError(error => of(StudentsActions.loadStudentsFailure({ error })))
      );
    })
  ));

  loadStudentPerformances$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.loadStudentPerformances),
    switchMap(({ studentId }) => {
      return this.studentsService.getStudentPerformances(studentId).pipe(
        map(performances => StudentsActions.loadStudentPerformancesSuccess({ performances })),
        catchError(error => of(StudentsActions.loadStudentPerformancesFailure({ error })))
      );
    })
  ));

  loadStudentInterventions$ = createEffect(() => this.actions$.pipe(
    ofType(StudentsActions.loadStudentInterventions),
    switchMap(({ studentId }) => {
      return this.studentsService.getStudentInterventions(studentId).pipe(
        map(interventions => StudentsActions.loadStudentInterventionsSuccess({ interventions })),
        catchError(error => of(StudentsActions.loadStudentInterventionsFailure({ error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
  ) {}
}