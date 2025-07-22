// src/app/features/student-portal/student-portal.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { StudentDashboardComponent } from './containers/student-dashboard/student-dashboard.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { GradesComponent } from './components/grades/grades.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent
  }
];

@NgModule({
  declarations: [
    StudentDashboardComponent,
    AssignmentsComponent,
    GradesComponent,
    ScheduleComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentPortalModule { }
