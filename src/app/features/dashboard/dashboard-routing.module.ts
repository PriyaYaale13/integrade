import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AtRiskStudentsComponent } from './containers/at-risk-students/at-risk-students.component';
import { InterventionProgressComponent } from './containers/intervention-progress/intervention-progress.component';
import { PerformanceOverviewComponent } from './containers/performance-overview/performance-overview.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'at-risk',
    component: AtRiskStudentsComponent
  },
  {
    path: 'interventions',
    component: InterventionProgressComponent
  },
  {
    path: 'performance',
    component: PerformanceOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
