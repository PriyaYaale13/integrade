import { createReducer, on } from '@ngrx/store';
import * as StudentsActions from './students.actions';
import { Student, StudentPerformance, Intervention } from '../../../models/student.model';

export interface StudentState {
  students: Student[];
  selectedStudentId: string | null;
  performances: StudentPerformance[];
  interventions: Intervention[];
  loading: boolean;
  error: any;
}

export const initialState: StudentState = {
  students: [],
  selectedStudentId: null,
  performances: [],
  interventions: [],
  loading: false,
  error: null
};

export const studentsReducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false
  })),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(StudentsActions.loadStudentPerformances, (state, { studentId }) => ({
    ...state,
    selectedStudentId: studentId,
    loading: true,
    error: null
  })),
  on(StudentsActions.loadStudentPerformancesSuccess, (state, { performances }) => ({
    ...state,
    performances,
    loading: false
  })),
  on(StudentsActions.loadStudentPerformancesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(StudentsActions.loadStudentInterventions, (state, { studentId }) => ({
    ...state,
    selectedStudentId: studentId,
    loading: true,
    error: null
  })),
  on(StudentsActions.loadStudentInterventionsSuccess, (state, { interventions }) => ({
    ...state,
    interventions,
    loading: false
  })),
  on(StudentsActions.loadStudentInterventionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);