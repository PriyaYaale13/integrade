import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateAssessmentChartComponent } from '../state-assessment-chart/state-assessment-chart.component';
import { StateAssessmentPerformanceData } from '../../../../models/dashboard.model';

@Component({
  selector: 'app-state-assessment-grid',
  standalone: true,
  imports: [CommonModule, StateAssessmentChartComponent],
  template: `
    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-medium text-[#212121]">State Assessment Performance</h2>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-gradient-to-r from-[#FF5722] via-[#FFC107] to-[#4CAF50] rounded"></div>
            <span class="text-sm text-[#757575]">Performance Scale</span>
          </div>
        </div>
      </div>
      
      <div class="assessment-charts space-y-8">
        <ng-container *ngFor="let assessment of assessments">
          <div class="assessment-chart-wrapper">
            <app-state-assessment-chart [data]="assessment"></app-state-assessment-chart>
          </div>
        </ng-container>

        <!-- Scale Legend -->
        <div class="flex justify-between text-xs text-[#757575] px-2 mt-6">
          <span>0%</span>
          <span>Below Basic</span>
          <span>Basic</span>
          <span>Proficient</span>
          <span>Advanced</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .bg-gradient-to-r {
      background-image: linear-gradient(to right, #FF5722, #FFC107, #8BC34A, #4CAF50);
    }
    
    .assessment-chart-wrapper {
      margin-bottom: 2rem;
    }
    
    .assessment-charts {
      overflow: visible;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateAssessmentGridComponent implements OnInit {
  @Input() assessments: StateAssessmentPerformanceData[] = [];

  constructor() {}

  ngOnInit(): void {
    // Ensure we have default data if none is provided
    if (!this.assessments || this.assessments.length === 0) {
      this.assessments = this.getDefaultAssessments();
    }
  }

  private getDefaultAssessments(): StateAssessmentPerformanceData[] {
    return [
      {
        subject: 'Mathematics',
        stateAverage: 78,
        classAverage: 85,
        minScale: 0,
        maxScale: 100,
        performanceLevels: {
          belowBasic: 20,
          basic: 30, 
          proficient: 30,
          advanced: 20
        }
      },
      {
        subject: 'English Language Arts (ELA)',
        stateAverage: 75,
        classAverage: 82,
        minScale: 0,
        maxScale: 100,
        performanceLevels: {
          belowBasic: 20,
          basic: 30,
          proficient: 30,
          advanced: 20
        }
      }
    ];
  }
} 