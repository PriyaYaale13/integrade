// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-assessment-detail',
//   imports: [],
//   templateUrl: './assessment-detail.component.html',
//   styleUrl: './assessment-detail.component.scss'
// })
// export class AssessmentDetailComponent {

// }

//testing phase

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface StudentResult {
  id: string;
  name: string;
  score: number;
  grade: string;
  submissionDate: string;
  status: 'Submitted' | 'Late' | 'Missing';
}

@Component({
  selector: 'app-assessment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="back-link">
        <a routerLink="/assessment">← Back to Assessments</a>
      </div>
      
      <div class="assessment-header">
        <h2>{{ assessment.name }}</h2>
        <div class="assessment-meta">
          <span class="badge">{{ assessment.type }}</span>
          <span class="badge">{{ assessment.subject }}</span>
          <span class="badge">{{ assessment.grade }}</span>
        </div>
      </div>
      
      <div class="assessment-details">
        <div class="detail-section">
          <h3>Assessment Details</h3>
          <div class="details-grid">
            <div class="detail">
              <span class="label">Date Assigned:</span>
              <span>{{ assessment.dateAssigned }}</span>
            </div>
            <div class="detail">
              <span class="label">Date Due:</span>
              <span>{{ assessment.dateDue }}</span>
            </div>
            <div class="detail">
              <span class="label">Status:</span>
              <span [ngClass]="'status-' + assessment.status.toLowerCase().replace(' ', '-')">
                {{ assessment.status }}
              </span>
            </div>
            <div class="detail">
              <span class="label">Average Score:</span>
              <span>{{ assessment.averageScore }}%</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>Description</h3>
          <p>{{ assessment.description }}</p>
        </div>
      </div>
      
      <div class="metrics-section">
        <div class="metric-card">
          <h3>Completion Rate</h3>
          <div class="metric-value">{{ assessment.completionRate }}%</div>
          <div class="progress-bar">
            <div class="progress" [style.width.%]="assessment.completionRate"></div>
          </div>
        </div>
        
        <div class="metric-card">
          <h3>Average Score</h3>
          <div class="metric-value">{{ assessment.averageScore }}%</div>
          <div class="progress-bar">
            <div class="progress" [style.width.%]="assessment.averageScore"></div>
          </div>
        </div>
        
        <div class="metric-card">
          <h3>Score Distribution</h3>
          <div class="placeholder-chart">[Score Distribution Chart]</div>
        </div>
      </div>
      
      <div class="student-results">
        <h3>Student Results</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Submission Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let result of studentResults">
              <td>{{ result.name }}</td>
              <td>{{ result.score }}%</td>
              <td>{{ result.grade }}</td>
              <td>{{ result.submissionDate }}</td>
              <td [ngClass]="'status-' + result.status.toLowerCase()">
                {{ result.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1.5rem;
    }
    
    .back-link {
      margin-bottom: 1rem;
    }
    
    .back-link a {
      text-decoration: none;
      color: #3f51b5;
    }
    
    .assessment-header {
      margin-bottom: 1.5rem;
    }
    
    .assessment-meta {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .badge {
      background-color: #e0e0e0;
      padding: 0.25rem 0.75rem;
      border-radius: 16px;
      font-size: 0.85rem;
    }
    
    .assessment-details {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .detail-section {
      margin-bottom: 1.5rem;
    }
    
    .detail-section:last-child {
      margin-bottom: 0;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .detail {
      display: flex;
    }
    
    .label {
      font-weight: 600;
      margin-right: 0.5rem;
      color: #616161;
    }
    
    .status-assigned {
      color: #2196f3;
    }
    
    .status-in-progress {
      color: #ff9800;
    }
    
    .status-completed {
      color: #4caf50;
    }
    
    .status-graded {
      color: #9c27b0;
    }
    
    .status-submitted {
      color: #4caf50;
    }
    
    .status-late {
      color: #ff9800;
    }
    
    .status-missing {
      color: #f44336;
    }
    
    .metrics-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 1.5rem;
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
    
    .progress-bar {
      background-color: #e0e0e0;
      border-radius: 4px;
      height: 8px;
      overflow: hidden;
      margin-top: 0.5rem;
    }
    
    .progress {
      background-color: #3f51b5;
      height: 100%;
    }
    
    .placeholder-chart {
      background-color: #f5f5f5;
      border: 1px dashed #9e9e9e;
      border-radius: 4px;
      padding: 1.5rem;
      margin-top: 0.5rem;
      text-align: center;
      color: #616161;
    }
    
    .student-results {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
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
  `]
})
export class AssessmentDetailComponent implements OnInit {
  assessmentId: string = '';
  
  assessment: any = {
    id: '1',
    name: 'Algebra Mid-Term',
    type: 'Test',
    subject: 'Mathematics',
    grade: '10th',
    dateAssigned: '2023-10-01',
    dateDue: '2023-10-15',
    status: 'Graded',
    averageScore: 72,
    completionRate: 85,
    description: 'This mid-term test covers algebraic expressions, equations, and inequalities. Students should be prepared to solve quadratic equations, work with functions, and graph linear equations. The test consists of 25 multiple-choice questions and 5 short-answer problems.'
  };
  
  studentResults: StudentResult[] = [
    { id: '1', name: 'John Smith', score: 58, grade: 'F', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '2', name: 'Emily Johnson', score: 64, grade: 'D', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '3', name: 'Michael Brown', score: 62, grade: 'D', submissionDate: '2023-10-16', status: 'Late' },
    { id: '4', name: 'Jessica Williams', score: 70, grade: 'C-', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '5', name: 'David Miller', score: 65, grade: 'D', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '6', name: 'Sarah Davis', score: 88, grade: 'B+', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '7', name: 'James Wilson', score: 92, grade: 'A-', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '8', name: 'Olivia Thompson', score: 85, grade: 'B', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '9', name: 'Daniel Martinez', score: 78, grade: 'C+', submissionDate: '2023-10-16', status: 'Late' },
    { id: '10', name: 'Sophia Anderson', score: 90, grade: 'A-', submissionDate: '2023-10-15', status: 'Submitted' },
    { id: '11', name: 'William Taylor', score: 0, grade: 'F', submissionDate: '', status: 'Missing' }
  ];
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.assessmentId = params['id'];
      console.log(`Loading assessment with ID: ${this.assessmentId}`);
      // In a real app, you would fetch the assessment data based on the ID
      // For now, we're using mock data
    });
  }
}