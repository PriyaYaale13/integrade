import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectPerformanceSummaries = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.performanceSummaries
);

export const selectStudentPerformances = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.studentPerformances
);

export const selectRiskSummary = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.riskSummary
);

export const selectClassAverages = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.classAverages
);

export const selectAtRiskStudents = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.atRiskStudents
);

export const selectDashboardFilters = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.filters
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.loading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.error
);