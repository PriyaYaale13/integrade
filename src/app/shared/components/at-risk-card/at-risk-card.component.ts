import { Component, Input } from '@angular/core';
import { stateAtRiskCart } from '../../../models/subject-selector.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-at-rick-card',
  imports: [CommonModule],
  templateUrl: './at-risk-card.component.html',
  styleUrl: './at-risk-card.component.scss'
})
export class AtRickCardComponent {
  @Input() stateAtRiskCart: stateAtRiskCart[] = [];
  
}