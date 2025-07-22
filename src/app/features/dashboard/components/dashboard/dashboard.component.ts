// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   imports: [],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent {

// }

//testing phase
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent, BarChartData } from '../../../../shared/components/charts/bar-chart/bar-chart.component';

interface PerformanceMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface Student {
  id: string;
  name: string;
  grade: string;
  attendance: number;
  performanceIndex: number;
  riskLevel: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BarChartComponent],
  template: `
    <div class="dashboard-container">
      <h2>Education Analytics Dashboard</h2>
      
      <div class="metrics-grid">
        <div *ngFor="let metric of performanceMetrics" class="metric-card">
          <h3>{{ metric.name }}</h3>
          <div class="metric-value">{{ metric.value }}%</div>
          <div class="metric-change" [ngClass]="metric.trend">
            {{ metric.change > 0 ? '+' : '' }}{{ metric.change }}%
          </div>
        </div>
      </div>
      
      <div class="dashboard-sections">
        <section class="at-risk-students">
          <h3>At-Risk Students</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Attendance</th>
                <th>Performance</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let student of atRiskStudents">
                <td>{{ student.name }}</td>
                <td>{{ student.grade }}</td>
                <td>{{ student.attendance }}%</td>
                <td>{{ student.performanceIndex }}%</td>
                <td [ngClass]="'risk-' + student.riskLevel">{{ student.riskLevel | titlecase }}</td>
              </tr>
            </tbody>
          </table>
        </section>
        
        <section class="recent-assessments">
          <h3>Recent Assessments</h3>
          <div class="assessment-chart">
          <app-bar-chart
              [data]="assessmentData"
              [width]="500"
              [height]="300"
              [title]="'Recent Assessment Results'"
              [xAxisLabel]="'Subject'"
              [yAxisLabel]="'Average Score'"
              [showTooltip]="true"
              [showLegend]="false"
              [colors]="['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8E24AA']"
            ></app-bar-chart>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 1.5rem;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 1.5rem 0;
    }
    
    .metric-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      text-align: center;
    }
    
    .metric-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }
    
    .metric-change {
      font-size: 0.9rem;
    }
    
    .up {
      color: #4caf50;
    }
    
    .down {
      color: #f44336;
    }
    
    .neutral {
      color: #9e9e9e;
    }
    
    .dashboard-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1rem;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    
    th {
      font-weight: 600;
      color: #616161;
    }
    
    .risk-high {
      color: #f44336;
      font-weight: bold;
    }
    
    .risk-medium {
      color: #ff9800;
    }
    
    .risk-low {
      color: #4caf50;
    }
    
    .chart-placeholder {
      background-color: #f5f5f5;
      border: 1px dashed #9e9e9e;
      border-radius: 4px;
      padding: 2rem;
      text-align: center;
      color: #616161;
    }
  `]
})
export class DashboardComponent implements OnInit {
  performanceMetrics: PerformanceMetric[] = [
    { name: 'Overall Attendance', value: 92, change: 1.5, trend: 'up' },
    { name: 'Assignment Completion', value: 87, change: -2.3, trend: 'down' },
    { name: 'Average Grade', value: 82, change: 3.7, trend: 'up' },
    { name: 'Student Engagement', value: 78, change: 0, trend: 'neutral' }
  ];
  
  atRiskStudents: Student[] = [
    { id: '1', name: 'John Smith', grade: '10th', attendance: 65, performanceIndex: 58, riskLevel: 'high' },
    { id: '2', name: 'Emily Johnson', grade: '9th', attendance: 72, performanceIndex: 64, riskLevel: 'medium' },
    { id: '3', name: 'Michael Brown', grade: '11th', attendance: 68, performanceIndex: 62, riskLevel: 'high' },
    { id: '4', name: 'Jessica Williams', grade: '9th', attendance: 75, performanceIndex: 69, riskLevel: 'medium' },
    { id: '5', name: 'David Miller', grade: '10th', attendance: 70, performanceIndex: 61, riskLevel: 'medium' }
  ];

  // Mock data for the assessment chart
  assessmentData: BarChartData[] = [
    { label: 'Math', value: 78, color: '#4285F4' },
    { label: 'Science', value: 82, color: '#34A853' },
    { label: 'English', value: 75, color: '#FBBC05' },
    { label: 'History', value: 68, color: '#EA4335' },
    { label: 'Art', value: 90, color: '#8E24AA' }
  ];
  
  constructor() {}
  
  ngOnInit() {
    console.log('Dashboard component initialized');
  }
}
