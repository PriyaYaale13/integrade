import { Component } from '@angular/core';


// import { PredictionModule } from '../../../../models/prediction.model';

import { PerdictionService } from '../../../../services/prediction.service';
import { MenuItem, SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

import { MatIcon } from '@angular/material/icon';
import { StateAssessmentPredictionsStudentInformationComponent } from '../../../teachers/components/state-assessment-predictions-components/state-assessment-predictions-student-information/state-assessment-predictions-student-information.component';
import { studentDetails } from '../../../../models/predictionTool.model';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-state-assessment-predictions',
  imports: [CommonModule,HeaderComponent,MatProgressSpinnerModule, SidebarComponent, StateAssessmentPredictionsStudentInformationComponent,MatIcon],
  templateUrl: './state-assessment-predictions.component.html',
  styleUrl: './state-assessment-predictions.component.scss'
})
export class StateAssessmentPredictionsComponent {
  sidebarMenuItems: MenuItem[] = [
      {
        label: 'At Risk Students',
        icon: 'fa-solid fa-triangle-exclamation',
        route: '/teacher/at-risk'
      },
      {
        label: 'Interventions',
        icon: 'fa-solid fa-hands-holding-child',
        route: '/teacher/interventions'
      },
      {
        label: 'Behavior Assessment',
        icon: 'fa-solid fa-clipboard-check',
        route: '/teacher/behavior'
      },
      {
        label: 'IEP',
        icon: 'fa-solid fa-file-contract',
        route: '/teacher/iep'
      },
      {
        label: 'Academic Growth',
        icon: 'fa-solid fa-chart-line',
        route: '/teacher/growth'
      },
      {
        label: 'Prediction Tool',
        icon: 'fa-solid fa-lightbulb',
        route: '/teacher/predict'
      },
      {
        label: 'Course Proficiency',
        icon: 'fa-solid fa-graduation-cap',
        route: '/teacher/course-proficiency'
      },
      {
        label: 'State Assessment',
        icon: 'fa-solid fa-chart-bar',
        route: '/teacher/assessment/state'
      },
      {
        label: 'SAT/ACT',
        icon: 'fa-solid fa-chart-line',
        route: '/teacher/assessment/sat-act'
      },
      {
        label: 'Students Details Page',
        icon: 'fa-solid fa-school',
        route: '/teacher/students-details-page',
      }
    ];
 
  student!: studentDetails;
  title = '';
// predictionSubject: PredictionModule[] = [];

  constructor(private predictionService: PerdictionService) {}
isLoading = false;
 
 async ngOnInit(): Promise<void> {
  this.isLoading = true;
  
  const studentData = localStorage.getItem('selectedStudent');
  const titleData = localStorage.getItem('predictionTitle');

  
  if (studentData && titleData) {
    this.student = JSON.parse(studentData);
    this.title = titleData;
    this.isLoading = false;
  } else {
   
    this.isLoading = false;
    alert('No data found. Please return to the prediction tool.');
  }
}

}