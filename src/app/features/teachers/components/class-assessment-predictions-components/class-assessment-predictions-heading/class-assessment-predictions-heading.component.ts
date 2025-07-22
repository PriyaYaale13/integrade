import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-assessment-predictions-heading',
  imports: [RouterLink],
  templateUrl: './class-assessment-predictions-heading.component.html',
  styleUrl: './class-assessment-predictions-heading.component.scss'
})
export class ClassAssessmentPredictionsHeadingComponent {
  @Input() title: string | undefined;
  @Input() count: number | undefined;
}
