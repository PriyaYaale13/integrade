import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './containers/student-list/student-list.component';
import { StudentDetailComponent } from './containers/student-detail/student-detail.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
