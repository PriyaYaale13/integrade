import { DashboardState } from './features/dashboard/dashboard.reducer';
import { StudentState } from './features/students/students.reducer';
//import { AssessmentState } from './features/assessment/assessment.reducer';
//import { InterventionState } from './features/intervention/intervention.reducer';

export interface AppState {
  dashboard: DashboardState;
  students: StudentState;
  //assessment: AssessmentState;
  //intervention: InterventionState;
}