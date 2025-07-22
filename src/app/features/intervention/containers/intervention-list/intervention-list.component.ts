// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-intervention-list',
//   imports: [],
//   templateUrl: './intervention-list.component.html',
//   styleUrl: './intervention-list.component.scss'
// })
// export class InterventionListComponent {

// }

//testing phase

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Intervention {
  id: string;
  student: {
    id: string;
    name: string;
    grade: string;
    riskLevel: 'high' | 'medium' | 'low';
  };
  type: 'Academic' | 'Behavioral' | 'Attendance' | 'Social-Emotional';
  startDate: string;
  endDate?: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Canceled';
  assignedTo: string;
  effectiveness?: number;
}

@Component({
  selector: 'app-intervention-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Interventions</h2>
      
      <div class="filters">
        <div class="search">
          <input type="text" placeholder="Search interventions...">
        </div>
        <div class="filter-buttons">
          <button>All Types</button>
          <button>Academic</button>
          <button>Behavioral</button>
          <button>Attendance</button>
          <button>Social-Emotional</button>
        </div>
      </div>
      
      <table class="interventions-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Risk Level</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Effectiveness</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let intervention of interventions">
            <td>{{ intervention.student.name }}</td>
            <td [ngClass]="'risk-' + intervention.student.riskLevel">
              {{ intervention.student.riskLevel | titlecase }}
            </td>
            <td>{{ intervention.type }}</td>
            <td>{{ intervention.startDate }}</td>
            <td>{{ intervention.endDate || 'Ongoing' }}</td>
            <td [ngClass]="'status-' + intervention.status.toLowerCase().replace(' ', '-')">
              {{ intervention.status }}
            </td>
            <td>{{ intervention.assignedTo }}</td>
            <td>
              <div *ngIf="intervention.effectiveness !== undefined" class="effectiveness-rating">
                <div class="rating-bars">
                  <div *ngFor="let i of [1, 2, 3, 4, 5]" 
                       [ngClass]="{'filled': i <= intervention.effectiveness}"></div>
                </div>
                <span>{{ intervention.effectiveness }}/5</span>
              </div>
              <span *ngIf="intervention.effectiveness === undefined">N/A</span>
            </td>
            <td>
              <button class="action-btn" (click)="viewIntervention(intervention.id)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination">
        <button>Previous</button>
        <span>Page 1 of 2</span>
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
    
    .interventions-table {
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
    
    .status-planned {
      color: #2196f3;
    }
    
    .status-in-progress {
      color: #ff9800;
    }
    
    .status-completed {
      color: #4caf50;
    }
    
    .status-canceled {
      color: #f44336;
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
export class InterventionListComponent implements OnInit {
  interventions: Intervention[] = [
    {
      id: '1',
      student: { id: '1', name: 'John Smith', grade: '10th', riskLevel: 'high' },
      type: 'Academic',
      startDate: '2023-09-15',
      status: 'In Progress',
      assignedTo: 'Mrs. Johnson',
      effectiveness: 3
    },
    {
      id: '2',
      student: { id: '2', name: 'Emily Johnson', grade: '9th', riskLevel: 'medium' },
      type: 'Attendance',
      startDate: '2023-09-20',
      status: 'In Progress',
      assignedTo: 'Mr. Williams',
      effectiveness: 4
    },
    {
      id: '3',
      student: { id: '3', name: 'Michael Brown', grade: '11th', riskLevel: 'high' },
      type: 'Behavioral',
      startDate: '2023-09-10',
      endDate: '2023-10-10',
      status: 'Completed',
      assignedTo: 'Dr. Davis',
      effectiveness: 2
    },
    {
      id: '4',
      student: { id: '4', name: 'Jessica Williams', grade: '9th', riskLevel: 'medium' },
      type: 'Social-Emotional',
      startDate: '2023-09-25',
      status: 'In Progress',
      assignedTo: 'Ms. Thompson',
      effectiveness: 3
    },
    {
      id: '5',
      student: { id: '5', name: 'David Miller', grade: '10th', riskLevel: 'medium' },
      type: 'Academic',
      startDate: '2023-10-01',
      status: 'Planned',
      assignedTo: 'Mrs. Johnson'
    },
    {
      id: '6',
      student: { id: '9', name: 'Daniel Martinez', grade: '11th', riskLevel: 'medium' },
      type: 'Attendance',
      startDate: '2023-09-05',
      endDate: '2023-09-30',
      status: 'Completed',
      assignedTo: 'Mr. Williams',
      effectiveness: 5
    },
    {
      id: '7',
      student: { id: '11', name: 'William Taylor', grade: '10th', riskLevel: 'high' },
      type: 'Academic',
      startDate: '2023-09-18',
      endDate: '2023-09-25',
      status: 'Canceled',
      assignedTo: 'Mrs. Johnson'
    }
  ];
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    console.log('Intervention list component initialized');
  }
  
  viewIntervention(id: string) {
    this.router.navigate(['/intervention', id]);
  }
}