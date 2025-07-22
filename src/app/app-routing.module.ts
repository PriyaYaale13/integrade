// // src/app/app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/auth/auth.guard';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'dashboard',
//     pathMatch: 'full'
//   },
//   {
//     path: 'dashboard',
//     loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
//     canActivate: [AuthGuard],
//     data: { roles: ['teacher', 'admin'] }
//   },
//   {
//     path: 'students',
//     loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule),
//     canActivate: [AuthGuard],
//     data: { roles: ['teacher', 'admin'] }
//   },
//   {
//     path: 'assessment',
//     loadChildren: () => import('./features/assessment/assessment.module').then(m => m.AssessmentModule),
//     canActivate: [AuthGuard],
//     data: { roles: ['teacher', 'admin'] }
//   },
//   {
//     path: 'intervention',
//     loadChildren: () => import('./features/intervention/intervention.module').then(m => m.InterventionModule),
//     canActivate: [AuthGuard],
//     data: { roles: ['teacher', 'admin'] }
//   },
//   {
//     path: 'parent-portal',
//     loadChildren: () => import('./features/parent-portal/parent-portal.module').then(m => m.ParentPortalModule),
//     canActivate: [AuthGuard],
//     data: { roles: ['parent'] }
//   },
//   {
//     path: 'student-portal',
//     loadChildren: () => import('./features/student-portal/student-portal.module').then(m => m.StudentPortalModule),
//     canActivate: [AuthGuard],
//     data: { roles: ['student'] }
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
//   },
//   {
//     path: '**',
//     redirectTo: 'dashboard'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

//For testing phase
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./features/dashboard/containers/dashboard/dashboard.component').then(m => m.DashboardComponent),
  //   title: 'Dashboard'
  // },
  // {
  //   path: 'students',
  //   loadComponent: () => import('./features/students/containers/students-list/students-list.component').then(m => m.StudentsListComponent),
  //   title: 'Students'
  // },
  // {
  //   path: 'students/:id',
  //   loadComponent: () => import('./features/students/containers/student-detail/student-detail.component').then(m => m.StudentDetailComponent),
  //   title: 'Student Details'
  // },
  // // {
  // //   path: 'teachers',
  // //   loadComponent: () => import('./features/teachers/containers/teachers-dashboard/teachers-dashboard.component').then(m => m.TeachersDashboardComponent),
  // //   title: 'Teachers Dashboard'
  // // },
  // {
  //   path: 'teachers',
  //   loadChildren: () => import('./features/teachers/teachers.module').then(m => m.TeachersModule),
  //   title: 'Teachers Dashboard'
  // },
  // {
  //   path: 'assessment',
  //   loadComponent: () => import('./features/assessment/containers/assessment-list/assessment-list.component').then(m => m.AssessmentListComponent),
  //   title: 'Assessments'
  // },
  // {
  //   path: 'assessment/:id',
  //   loadComponent: () => import('./features/assessment/containers/assessment-detail/assessment-detail.component').then(m => m.AssessmentDetailComponent),
  //   title: 'Assessment Details'
  // },
  // {
  //   path: 'intervention',
  //   loadComponent: () => import('./features/intervention/containers/intervention-list/intervention-list.component').then(m => m.InterventionListComponent),
  //   title: 'Interventions'
  // },
  // {
  //   path: 'intervention/:id',
  //   loadComponent: () => import('./features/intervention/containers/intervention-detail/intervention-detail.component').then(m => m.InterventionDetailComponent),
  //   title: 'Intervention Details'
  // },
  // {
  //   path: 'parent-portal',
  //   loadComponent: () => import('./features/parent-portal/containers/parent-dashboard/parent-dashboard.component').then(m => m.ParentDashboardComponent),
  //   title: 'Parent Portal'
  // },
  // {
  //   path: '**',
  //   loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent),
  //   title: 'Page Not Found'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }