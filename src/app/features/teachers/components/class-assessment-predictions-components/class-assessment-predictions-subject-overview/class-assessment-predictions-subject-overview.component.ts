import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { subjectoverview } from '../../../../../models/predictionTool.model';

@Component({
  selector: 'app-class-assessment-predictions-subject-overview',
  imports: [CommonModule],
  templateUrl: './class-assessment-predictions-subject-overview.component.html',
  styleUrl: './class-assessment-predictions-subject-overview.component.scss'
})
export class ClassAssessmentPredictionsSubjectOverviewComponent {
  @Input() subjectOverview:subjectoverview[]=[];
}
