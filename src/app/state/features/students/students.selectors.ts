import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentState>('students');

export const selectAllStudents = createSelector(
  selectStudentsState,
  (state: StudentState) => state.students
);

export const selectSelectedStudentId = createSelector(
  selectStudentsState,
  (state: StudentState) => state.selectedStudentId
);

export const selectSelectedStudent = createSelector(
  selectAllStudents,
  selectSelectedStudentId,
  (students, id) => id ? students.find(student => student.id === id) : null
);

export const selectStudentPerformances = createSelector(
  selectStudentsState,
  (state: StudentState) => state.performances
);

export const selectStudentInterventions = createSelector(
  selectStudentsState,
  (state: StudentState) => state.interventions
);

export const selectStudentsLoading = createSelector(
  selectStudentsState,
  (state: StudentState) => state.loading
);

export const selectStudentsError = createSelector(
  selectStudentsState,
  (state: StudentState) => state.error
);