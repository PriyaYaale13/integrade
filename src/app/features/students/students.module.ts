import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { studentsReducer } from '../../state/features/students/students.reducer';
import { StudentsEffects } from '../../state/features/students/students.effects';

import { StudentsListComponent } from './containers/student-list/student-list.component';
import { StudentDetailComponent } from './containers/student-detail/student-detail.component';
import { StudentPerformanceComponent } from './components/student-performance/student-performance.component';
import { StudentInterventionsComponent } from './components/student-interventions/student-interventions.component';
import { StudentBehaviorComponent } from './components/student-behavior/student-behavior.component';
import { StudentAssessmentsComponent } from './components/student-assessments/student-assessments.component';
import { StudentInfoCardComponent } from './components/student-info-card/student-info-card.component';
import { StudentGrowthChartComponent } from './components/student-growth-chart/student-growth-chart.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent
  },
  {
    path: ':id',
    component: StudentDetailComponent
  }
];

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailComponent,
    StudentPerformanceComponent,
    StudentInterventionsComponent,
    StudentBehaviorComponent,
    StudentAssessmentsComponent,
    StudentInfoCardComponent,
    StudentGrowthChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('students', studentsReducer),
    EffectsModule.forFeature([StudentsEffects])
  ]
})
export class StudentsModule { }
