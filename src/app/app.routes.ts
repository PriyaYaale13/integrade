import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { awardRecognitionGuard } from './core/guards/award.recognition.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Teacher' },
    loadComponent: () => import('./features/teacher/teacher-layout/teacher-layout.component').then(m => m.TeacherLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/teacher/teacher-landing/teacher-landing.component').then(m => m.TeacherLandingComponent) },
      { path: 'student/:id', loadComponent: () => import('./features/student/student-detail/student-detail.component').then(m => m.StudentDetailComponent) },
      { path: 'at-risk', loadComponent: () => import('./features/teacher/at-risk/at-risk.component').then(m => m.AtRiskComponent) },
      { path: 'interventions', loadComponent: () => import('./features/teacher/intervention-progress/intervention-progress.component').then(m => m.InterventionProgressComponent) },
      { path: 'behavior', loadComponent: () => import('./features/teacher/behavior-assessment/behavior-assessment.component').then(m => m.BehaviorAssessmentComponent) },
      { path: 'iep', loadComponent: () => import('./features/teacher/iep/iep.component').then(m => m.IepComponent) },
      { path: 'growth', loadComponent: () => import('./features/teacher/academic-growth/academic-growth.component').then(m => m.AcademicGrowthComponent) },
      { path: 'predict', loadComponent: () => import('./features/teacher/prediction-tool/prediction-tool.component').then(m => m.PredictionToolComponent) },
      { path: 'prediction-class', loadComponent: () => import('./features/teacher/prediction-tool/class-assessment-predictions/class-assessment-predictions.component').then(m => m.ClassAssessmentPredictionsComponent) },
      { path: 'prediction-tool-results', loadComponent: () => import('./features/teacher/prediction-tool/state-assessment-predictions/state-assessment-predictions.component').then(m => m.StateAssessmentPredictionsComponent) },
      { path: 'course-proficiency', loadComponent: () => import('./features/teacher/course-proficiency/course-proficiency.component').then(m => m.CourseProficiencyComponent) },
      // Assessment Specific Views (Example - can be nested or flat)
      { path: 'assessment/schoology', loadComponent: () => import('./features/assessment-views/schoology-view/schoology-view.component').then(m => m.SchoologyViewComponent) },
      { path: 'assessment/state', loadComponent: () => import('./features/assessment-views/state-assessment-view/state-assessment-view.component').then(m => m.StateAssessmentViewComponent) },
      { path: 'assessment/sat-act', loadComponent: () => import('./features/assessment-views/sat-act-view/sat-act-view.component').then(m => m.SatActViewComponent) },
      { path: 'students-details-page/:id', loadComponent: () => import('./features/teacher/students-details-page/students-details-page.component').then(m => m.StudentsDetailsPageComponent) },
      { path: 'at-risk/at-risk-student-detail/:id', loadComponent: () => import('./features/teacher/at-risk/at-risk-student-detail/at-risk-student-detail.component').then(m => m.AtRiskStudentDetailComponent) },

    ]
  },
  {
    path: 'principal',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Principal' },
    loadComponent: () => import('./features/principal/principal-layout/principal.layout.component').then(m => m.PrincipalLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/principal/principal-landing/principal-landing.component').then(m => m.PrincipalLandingComponent), pathMatch: 'full' },
      // Principals reuse many teacher views, guards/data service scope data
      { path: 'teacher-interventions', loadComponent: () => import('./features/principal/teachers-intervention-progress/teachers-intervention-progress.component').then(m => m.TeachersInterventionProgressComponent) },
      { path: 'principal-at-risk', loadComponent: () => import('./features/principal/principal-at-risk/principal-at-risk.component').then(m => m.PrincipalAtRiskComponent) },
      { path: 'at-risk-student-detail/:id', loadComponent: () => import('./features/teacher/at-risk/at-risk-student-detail/at-risk-student-detail.component').then(m => m.AtRiskStudentDetailComponent) },
      { path: 'teacher-directory', loadComponent: () => import('./features/teachers/components/teacher-directory/teacher-directory.component').then(m => m.TeacherDirectoryComponent) },
      { path: 'teacher-behavior', loadComponent: () => import('./features/principal/behavior-assessment/teacher-behavior-assessment/teacher-behavior-assessment.component').then(m => m.TeacherBehaviorAssessmentComponent) },
      { path: 'teacher-iep', loadComponent: () => import('./features/principal/teachers-iep/teachers-iep.component').then(m => m.TeachersIepComponent) },
      { path: 'teacher-sat-act', loadComponent: () => import('./features/principal/principal-sat-act-overview/principal-sat-act-overview.component').then(m => m.PrincipalSatActOverviewComponent) },
      { path: 'students-details-page/:id', loadComponent: () => import('./features/teacher/students-details-page/students-details-page.component').then(m => m.StudentsDetailsPageComponent) },
      { path: 'student-intervention/:id', loadComponent: () => import('./features/students/components/student-interventions/student-interventions.component').then(m => m.StudentInterventionsComponent) },
      {
        path: 'award-recognition', canActivate: [awardRecognitionGuard],
        loadComponent: () => import('./features/principal/award-recognition/award-recognition.component').then(m => m.AwardRecognitionComponent),
      },
      // ... add routes for other views accessible by principal
    ]
  },
  {
    path: 'student/:studentId',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Student' },
    children: [
      // Student logs in, sees their own detail page. ID might come from AuthService.
      { path: '', loadComponent: () => import('./features/student/student-detail/student-detail.component').then(m => m.StudentDetailComponent), pathMatch: 'full' },
      // Specific academic view from page 21
      { path: 'academics', loadComponent: () => import('./features/student/student-academic-detail/student-academic-detail.component').then(m => m.StudentAcademicDetailComponent) },
    ]
  },
  {
    path: 'district-leader',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'DistrictLeader' },
    children: [
      { path: '', loadComponent: () => import('./features/district-leader/district-leader-landing/district-leader-landing.component').then(m => m.DistrictLeaderComponent), pathMatch: 'full' },
      { path: 'principal-landing/:id', loadComponent: () => import('./features/principal/principal-landing/principal-landing.component').then(m => m.PrincipalLandingComponent) },
    ]
  },
  {
    path: 'parent/:parentId/:studentId',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Parent' },
    children: [
      { path: '', loadComponent: () => import('./features/parent/parent-landing/parent-landing.component').then(m => m.ParentStudentLandingComponent), pathMatch: 'full' },
      { path: 'assessment', loadComponent: () => import('./shared/components/assessment/assessment.component').then(m => m.AssessmentComponent) },
      
    ]
  },
  {
    path: 'about/data-sources',
    loadComponent: () => import('./features/about/data-sources/data-sources.component').then(m => m.DataSourcesComponent)
  },
  // Redirect logic based on role after login (can be handled in login component or here)
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect
  { path: '**', loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent) }

];