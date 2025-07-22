import { createAction, props } from '@ngrx/store';
import { Student, StudentPerformance, Intervention } from '../../../models/student.model';

export const loadStudents = createAction(
  '[Students] Load Students'
);

export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: Student[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: any }>()
);

export const loadStudentPerformances = createAction(
  '[Students] Load Student Performances',
  props<{ studentId: string }>()
);

export const loadStudentPerformancesSuccess = createAction(
  '[Students] Load Student Performances Success',
  props<{ performances: StudentPerformance[] }>()
);

export const loadStudentPerformancesFailure = createAction(
  '[Students] Load Student Performances Failure',
  props<{ error: any }>()
);

export const loadStudentInterventions = createAction(
  '[Students] Load Student Interventions',
  props<{ studentId: string }>()
);

export const loadStudentInterventionsSuccess = createAction(
  '[Students] Load Student Interventions Success',
  props<{ interventions: Intervention[] }>()
);

export const loadStudentInterventionsFailure = createAction(
  '[Students] Load Student Interventions Failure',
  props<{ error: any }>()
);