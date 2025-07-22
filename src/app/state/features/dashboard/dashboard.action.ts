import { createAction, props } from '@ngrx/store';
import { 
  PerformanceSummary,
  StudentPerformance,
  RiskSummary} from '../../../models/dashboard.model';
import { FilterState } from '../../../models/filter.model';

export const loadDashboardData = createAction(
  '[Dashboard] Load Dashboard Data',
  props<{ filters: FilterState }>()
);

export const loadDashboardDataSuccess = createAction(
  '[Dashboard] Load Dashboard Data Success',
  props<{ 
    performanceSummaries: PerformanceSummary[],
    studentPerformances: StudentPerformance[],
    riskSummary: RiskSummary
  }>()
);

export const loadDashboardDataFailure = createAction(
  '[Dashboard] Load Dashboard Data Failure',
  props<{ error: any }>()
);

export const updateDashboardFilters = createAction(
  '[Dashboard] Update Filters',
  props<{ filters: Partial<FilterState> }>()
);

export const loadClassAverages = createAction(
  '[Dashboard] Load Class Averages',
  props<{ filters: FilterState }>()
);

export const loadClassAveragesSuccess = createAction(
  '[Dashboard] Load Class Averages Success',
  props<{ averages: { [courseId: string]: number } }>()
);

export const loadClassAveragesFailure = createAction(
  '[Dashboard] Load Class Averages Failure',
  props<{ error: any }>()
);

export const loadAtRiskStudents = createAction(
  '[Dashboard] Load At Risk Students'
);

export const loadAtRiskStudentsSuccess = createAction(
  '[Dashboard] Load At Risk Students Success',
  props<{ atRiskStudents: any[] }>()
);

export const loadAtRiskStudentsFailure = createAction(
  '[Dashboard] Load At Risk Students Failure',
  props<{ error: any }>()
);