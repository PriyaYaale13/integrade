// src/app/features/parent-portal/parent-portal.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ParentDashboardComponent } from './containers/parent-dashboard/parent-dashboard.component';
import { StudentSelectComponent } from './components/student-select/student-select.component';
import { StudentOverviewComponent } from './components/student-overview/student-overview.component';
import { AcademicProgressComponent } from './components/academic-progress/academic-progress.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { BehaviorReportComponent } from './components/behavior-report/behavior-report.component';

const routes: Routes = [
  {
    path: '',
    component: ParentDashboardComponent
  }
];

@NgModule({
  declarations: [
    ParentDashboardComponent,
    StudentSelectComponent,
    StudentOverviewComponent,
    AcademicProgressComponent,
    AttendanceReportComponent,
    BehaviorReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ParentPortalModule { }































