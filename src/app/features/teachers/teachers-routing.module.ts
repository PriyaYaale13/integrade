import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersDashboardComponent } from './containers/teachers-dashboard/teachers-dashboard.component';
import { AtRiskStudentsComponent } from './components/at-risk-students/at-risk-students.component';
import { SpecialInterventionComponent } from './components/special-intervention/special-intervention.component';
import { BehavioralAssessmentComponent } from './components/behavioral-assessment/behavioral-assessment.component';
import { IepComponent } from './components/iep/iep.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersDashboardComponent
  },
  {
    path: 'at-risk-students',
    component: AtRiskStudentsComponent
  },
  {
    path: 'special-intervention',
    component: SpecialInterventionComponent
  },
  {
    path: 'behavioral-assessment',
    component: BehavioralAssessmentComponent
  },
  {
    path: 'iep',
    component: IepComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
