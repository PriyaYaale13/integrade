import { Component,Input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { studentDetails } from '../../../../../models/prediction.model';
@Component({
  selector: 'app-state-assessment-predictions-student-information',
  imports: [RouterLink],
  templateUrl: './state-assessment-predictions-student-information.component.html',
  styleUrl: './state-assessment-predictions-student-information.component.scss'
})
export class StateAssessmentPredictionsStudentInformationComponent {
  @Input() student!: studentDetails;
  @Input() title="";
}
