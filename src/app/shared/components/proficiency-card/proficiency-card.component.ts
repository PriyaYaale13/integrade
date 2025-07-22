import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProficiencyLevel } from '../../../models/dashboard.model';

@Component({
  selector: 'app-proficiency-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-sm text-gray-600">{{ title }}</h3>
        <span [ngStyle]="{'color': data.color}" class="text-2xl font-bold">{{ data.percentage }}%</span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-2">
        <div [ngStyle]="{'width': data.percentage + '%', 'background-color': data.color}" class="h-2 rounded-full"></div>
      </div>
      <p class="text-sm text-gray-500 mt-2">{{ data.students }} Students</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProficiencyCardComponent {
  @Input() title: string = '';
  @Input() data!: ProficiencyLevel;
} 