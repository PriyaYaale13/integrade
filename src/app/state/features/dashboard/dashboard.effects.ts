import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as DashboardActions from './dashboard.action';
import { selectDashboardFilters } from './dashboard.selectors';
import { DashboardService } from '../../../features/dashboard/services/dashboard.service';

@Injectable()
export class DashboardEffects {
  
  loadDashboardData$ = createEffect(() => this.actions$.pipe(
    ofType(DashboardActions.loadDashboardData),
    switchMap(({ filters }) => {
      return this.dashboardService.getDashboardData(filters).pipe(
        map(data => DashboardActions.loadDashboardDataSuccess({
          performanceSummaries: [data.performanceSummaries],
          studentPerformances: [data.studentPerformances], 
          riskSummary: data.riskSummary
        })),
        catchError(error => of(DashboardActions.loadDashboardDataFailure({ error })))
      );
    })
  ));

  loadClassAverages$ = createEffect(() => this.actions$.pipe(
    ofType(DashboardActions.loadClassAverages),
    switchMap(({ filters }) => {
      return this.dashboardService.getClassAverage(filters.toString()).pipe(
        map(averages => {
          // Convert array to object with courseId as key
          const averagesObj = averages.reduce((acc, avg) => ({
            ...acc,
            [avg.courseId]: avg.average
          }), {});
          return DashboardActions.loadClassAveragesSuccess({ averages: averagesObj });
        }),
        catchError(error => of(DashboardActions.loadClassAveragesFailure({ error })))
      );
    })
  ));

  loadAtRiskStudents$ = createEffect(() => this.actions$.pipe(
    ofType(DashboardActions.loadAtRiskStudents),
    withLatestFrom(this.store.select(selectDashboardFilters)),
    switchMap(([_, filters]) => {
      return this.dashboardService.getAtRiskStudents(filters).pipe(
        map(atRiskStudents => DashboardActions.loadAtRiskStudentsSuccess({ atRiskStudents })),
        catchError(error => of(DashboardActions.loadAtRiskStudentsFailure({ error })))
      );
    })
  ));

  filterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(DashboardActions.updateDashboardFilters),
    map(({ filters }) => DashboardActions.loadDashboardData({ filters }))
  ));

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private store: Store<AppState>
  ) {}
}