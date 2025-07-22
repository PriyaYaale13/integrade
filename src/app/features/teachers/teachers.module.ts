import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersDashboardComponent } from './containers/teachers-dashboard/teachers-dashboard.component';
import { ClassReportComponent } from './components/class-report/class-report.component';
import { CourseProficiencyComponent } from './components/course-proficiency/course-proficiency.component';
import { StateAssessmentComponent } from './components/state-assessment/state-assessment.component';
import { AtRiskStudentsComponent } from './components/at-risk-students/at-risk-students.component';
import { SpecialInterventionComponent } from './components/special-intervention/special-intervention.component';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    // No declared components - all are standalone
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Standalone components
    TeachersDashboardComponent,
    ClassReportComponent,
    CourseProficiencyComponent,
    StateAssessmentComponent,
    AtRiskStudentsComponent,
    SpecialInterventionComponent,
    // Angular Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatTabsModule
  ]
})
export class TeachersModule { }
