// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-intervention-detail',
//   imports: [],
//   templateUrl: './intervention-detail.component.html',
//   styleUrl: './intervention-detail.component.scss'
// })
// export class InterventionDetailComponent {

// }

//testing phase

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Session {
  id: string;
  date: string;
  duration: number;
  notes: string;
  outcome: 'Positive' | 'Negative' | 'Neutral';
}

@Component({
  selector: 'app-intervention-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="back-link">
        <a routerLink="/intervention">← Back to Interventions</a>
      </div>
      
      <div class="intervention-header">
        <h2>{{ intervention.type }} Intervention for {{ intervention.student.name }}</h2>
        <div [ngClass]="'status-badge status-' + intervention.status.toLowerCase().replace(' ', '-')">
          {{ intervention.status }}
        </div>
      </div>
      
      <div class="details-section">
        <div class="student-info">
          <h3>Student Information</h3>
          <div class="details-grid">
            <div class="detail">
              <span class="label">Name:</span>
              <span>{{ intervention.student.name }}</span>
            </div>
            <div class="detail">
              <span class="label">Grade:</span>
              <span>{{ intervention.student.grade }}</span>
            </div>
            <div class="detail">
              <span class="label">Risk Level:</span>
              <span [ngClass]="'risk-' + intervention.student.riskLevel">
                {{ intervention.student.riskLevel | titlecase }}
              </span>
            </div>
            <div class="detail">
              <span class="label">ID:</span>
              <span>{{ intervention.student.id }}</span>
            </div>
          </div>
        </div>
        
        <div class="intervention-info">
          <h3>Intervention Details</h3>
          <div class="details-grid">
            <div class="detail">
              <span class="label">Type:</span>
              <span>{{ intervention.type }}</span>
            </div>
            <div class="detail">
              <span class="label">Start Date:</span>
              <span>{{ intervention.startDate }}</span>
            </div>
            <div class="detail">
              <span class="label">End Date:</span>
              <span>{{ intervention.endDate || 'Ongoing' }}</span>
            </div>
            <div class="detail">
              <span class="label">Assigned To:</span>
              <span>{{ intervention.assignedTo }}</span>
            </div>
            <div class="detail">
              <span class="label">Effectiveness:</span>
              <div *ngIf="intervention.effectiveness !== undefined" class="effectiveness-rating">
                <div class="rating-bars">
                  <div *ngFor="let i of [1, 2, 3, 4, 5]" 
                       [ngClass]="{'filled': i <= intervention.effectiveness}"></div>
                </div>
                <span>{{ intervention.effectiveness }}/5</span>
              </div>
              <span *ngIf="intervention.effectiveness === undefined">N/A</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="description-section">
        <h3>Intervention Description</h3>
        <p>{{ intervention.description }}</p>
      </div>
      
      <div class="goals-section">
        <h3>Goals</h3>
        <ul>
          <li *ngFor="let goal of intervention.goals">{{ goal }}</li>
        </ul>
      </div>
      
      <div class="sessions-section">
        <h3>Sessions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>
              <th>Notes</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let session of intervention.sessions">
              <td>{{ session.date }}</td>
              <td>{{ session.duration }} min</td>
              <td>{{ session.notes }}</td>
              <td [ngClass]="'outcome-' + session.outcome.toLowerCase()">
                {{ session.outcome }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="progress-section">
        <h3>Progress Tracking</h3>
        <div class="placeholder-chart">[Progress Chart Over Time]</div>
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
    
    .intervention-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .status-badge {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      color: white;
    }
    
    .status-planned {
      background-color: #2196f3;
    }
    
    .status-in-progress {
      background-color: #ff9800;
    }
    
    .status-completed {
      background-color: #4caf50;
    }
    
    .status-canceled {
      background-color: #f44336;
    }
    
    .details-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .student-info, .intervention-info {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .detail {
      display: flex;
      flex-direction: column;
    }
    
    .label {
      font-weight: 600;
      margin-bottom: 0.25rem;
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
    
    .effectiveness-rating {
      display: flex;
      align-items: center;
    }
    
    .rating-bars {
      display: flex;
      margin-right: 0.5rem;
    }
    
    .rating-bars div {
      width: 8px;
      height: 16px;
      background-color: #e0e0e0;
      margin-right: 2px;
    }
    
    .rating-bars div.filled {
      background-color: #3f51b5;
    }
    
    .description-section, .goals-section, .sessions-section, .progress-section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    ul {
      padding-left: 1.5rem;
      margin-top: 1rem;
    }
    
    li {
      margin-bottom: 0.5rem;
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
    
    .outcome-positive {
      color: #4caf50;
    }
    
    .outcome-negative {
      color: #f44336;
    }
    
    .outcome-neutral {
      color: #9e9e9e;
    }
    
    .placeholder-chart {
      background-color: #f5f5f5;
      border: 1px dashed #9e9e9e;
      border-radius: 4px;
      padding: 2rem;
      margin-top: 1rem;
      text-align: center;
      color: #616161;
    }
  `]
})
export class InterventionDetailComponent implements OnInit {
  interventionId: string = '';
  
  intervention: any = {
    id: '1',
    student: {
      id: '1',
      name: 'John Smith',
      grade: '10th',
      riskLevel: 'high'
    },
    type: 'Academic',
    startDate: '2023-09-15',
    status: 'In Progress',
    assignedTo: 'Mrs. Johnson',
    effectiveness: 3,
    description: 'This intervention focuses on improving John\'s algebra skills and overall mathematics performance. Weekly tutoring sessions will be provided, along with additional practice materials and regular progress assessments.',
    goals: [
      'Improve algebra test scores from F to C or better by the end of the semester',
      'Complete at least 85% of assigned homework on time',
      'Develop stronger study habits and note-taking skills',
      'Increase class participation and engagement'
    ],
    sessions: [
      {
        id: '1',
        date: '2023-09-15',
        duration: 45,
        notes: 'Initial assessment conducted. John struggles with basic algebraic concepts. Started with review of fundamental concepts.',
        outcome: 'Neutral'
      },
      {
        id: '2',
        date: '2023-09-22',
        duration: 60,
        notes: 'Focused on linear equations and graphing. John completed practice problems with assistance but showed improvement.',
        outcome: 'Positive'
      },
      {
        id: '3',
        date: '2023-09-29',
        duration: 45,
        notes: 'Reviewed homework and addressed specific questions. John completed 70% of the assigned homework, which is an improvement.',
        outcome: 'Positive'
      },
      {
        id: '4',
        date: '2023-10-06',
        duration: 60,
        notes: 'John missed the session. Follow-up required.',
        outcome: 'Negative'
      },
      {
        id: '5',
        date: '2023-10-13',
        duration: 60,
        notes: 'Discussed missed session and barriers to attendance. Reviewed quadratic equations and factoring. John struggled with the concepts.',
        outcome: 'Neutral'
      }
    ]
  };
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.interventionId = params['id'];
      console.log(`Loading intervention with ID: ${this.interventionId}`);
      // In a real app, you would fetch the intervention data based on the ID
      // For now, we're using mock data
    });
  }
}