// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-assessment-list',
//   imports: [],
//   templateUrl: './assessment-list.component.html',
//   styleUrl: './assessment-list.component.scss'
// })
// export class AssessmentListComponent {

// }

//testing phase

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Assessment {
  id: string;
  name: string;
  type: 'Quiz' | 'Test' | 'Assignment' | 'Project';
  subject: string;
  grade: string;
  dateAssigned: string;
  dateDue: string;
  status: 'Assigned' | 'In Progress' | 'Completed' | 'Graded';
  averageScore?: number;
}

@Component({
  selector: 'app-assessment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Assessments</h2>
      
      <div class="filters">
        <div class="search">
          <input type="text" placeholder="Search assessments...">
        </div>
        <div class="filter-buttons">
          <button>All Types</button>
          <button>Quizzes</button>
          <button>Tests</button>
          <button>Assignments</button>
          <button>Projects</button>
        </div>
      </div>
      
      <table class="assessments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Date Assigned</th>
            <th>Date Due</th>
            <th>Status</th>
            <th>Avg. Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let assessment of assessments">
            <td>{{ assessment.name }}</td>
            <td>{{ assessment.type }}</td>
            <td>{{ assessment.subject }}</td>
            <td>{{ assessment.grade }}</td>
            <td>{{ assessment.dateAssigned }}</td>
            <td>{{ assessment.dateDue }}</td>
            <td [ngClass]="'status-' + assessment.status.toLowerCase().replace(' ', '-')">
              {{ assessment.status }}
            </td>
            <td>{{ assessment.averageScore ? assessment.averageScore + '%' : 'N/A' }}</td>
            <td>
              <button class="action-btn" (click)="viewAssessment(assessment.id)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination">
        <button>Previous</button>
        <span>Page 1 of 3</span>
        <button>Next</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1.5rem;
    }
    
    .filters {
      display: flex;
      justify-content: space-between;
      margin: 1.5rem 0;
    }
    
    .search input {
      padding: 0.5rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      width: 300px;
    }
    
    .filter-buttons button {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .assessments-table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: 600;
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
    
    .action-btn {
      padding: 0.25rem 0.75rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5rem;
    }
    
    .pagination button {
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .pagination span {
      margin: 0 1rem;
    }
  `]
})
export class AssessmentListComponent implements OnInit {
  assessments: Assessment[] = [
    { id: '1', name: 'Algebra Mid-Term', type: 'Test', subject: 'Mathematics', grade: '10th', dateAssigned: '2023-10-01', dateDue: '2023-10-15', status: 'Graded', averageScore: 72 },
    { id: '2', name: 'Literary Analysis Essay', type: 'Assignment', subject: 'English', grade: '10th', dateAssigned: '2023-10-05', dateDue: '2023-10-20', status: 'Graded', averageScore: 78 },
    { id: '3', name: 'Chemical Reactions Lab', type: 'Project', subject: 'Science', grade: '10th', dateAssigned: '2023-10-10', dateDue: '2023-10-25', status: 'In Progress' },
    { id: '4', name: 'World History Quiz', type: 'Quiz', subject: 'History', grade: '10th', dateAssigned: '2023-10-12', dateDue: '2023-10-18', status: 'Assigned' },
    { id: '5', name: 'Spanish Vocabulary Test', type: 'Test', subject: 'Spanish', grade: '10th', dateAssigned: '2023-10-15', dateDue: '2023-10-22', status: 'Assigned' },
    { id: '6', name: 'Geometry Problems', type: 'Assignment', subject: 'Mathematics', grade: '9th', dateAssigned: '2023-10-02', dateDue: '2023-10-16', status: 'Graded', averageScore: 85 },
    { id: '7', name: 'Biology Ecosystem Project', type: 'Project', subject: 'Science', grade: '9th', dateAssigned: '2023-09-25', dateDue: '2023-10-20', status: 'Completed', averageScore: 89 },
    { id: '8', name: 'Poetry Analysis', type: 'Assignment', subject: 'English', grade: '11th', dateAssigned: '2023-10-07', dateDue: '2023-10-21', status: 'In Progress' }
  ];
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    console.log('Assessment list component initialized');
  }
  
  viewAssessment(id: string) {
    this.router.navigate(['/assessment', id]);
  }
}