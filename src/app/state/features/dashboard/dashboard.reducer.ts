import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.action';
import { 
  PerformanceSummary,
  StudentPerformance,
  RiskSummary,
} from '../../../models/dashboard.model';

export interface DashboardState {
  filters: any;
  performanceSummaries: PerformanceSummary[];
  studentPerformances: StudentPerformance[];
  riskSummary: RiskSummary | null;
  classAverages: { [courseId: string]: number };
  atRiskStudents: any[];
  //filters: FilterState;
  loading: boolean;
  error: any;
}

export const initialState: DashboardState = {
  performanceSummaries: [],
  studentPerformances: [],
  riskSummary: null,
  classAverages: {},
  atRiskStudents: [],
  filters: {
    year: new Date().getFullYear().toString(),
    semester: 'fall'
  },
  loading: false,
  error: null
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboardData, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadDashboardDataSuccess, (state, { performanceSummaries, studentPerformances, riskSummary }) => ({
    ...state,
    performanceSummaries,
    studentPerformances,
    riskSummary,
    loading: false
  })),
  on(DashboardActions.loadDashboardDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DashboardActions.updateDashboardFilters, (state, { filters }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters
    }
  })),
  on(DashboardActions.loadClassAverages, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadClassAveragesSuccess, (state, { averages }) => ({
    ...state,
    classAverages: averages,
    loading: false
  })),
  on(DashboardActions.loadClassAveragesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DashboardActions.loadAtRiskStudents, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadAtRiskStudentsSuccess, (state, { atRiskStudents }) => ({
    ...state,
    atRiskStudents,
    loading: false
  })),
  on(DashboardActions.loadAtRiskStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);