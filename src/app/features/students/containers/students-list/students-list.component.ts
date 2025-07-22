// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-students-list',
//   imports: [],
//   templateUrl: './students-list.component.html',
//   styleUrl: './students-list.component.scss'
// })
// export class StudentsListComponent {

// }

//testing phase
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Student {
  id: string;
  name: string;
  grade: string;
  gender: string;
  attendance: number;
  gpa: number;
  performanceIndex: number;
  riskLevel: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Students</h2>
      
      <div class="filters">
        <div class="search">
          <input type="text" placeholder="Search students...">
        </div>
        <div class="filter-buttons">
          <button>All</button>
          <button>High Risk</button>
          <button>Medium Risk</button>
          <button>Low Risk</button>
        </div>
      </div>
      
      <table class="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Gender</th>
            <th>Attendance</th>
            <th>GPA</th>
            <th>Performance</th>
            <th>Risk Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let student of students">
            <td>{{ student.name }}</td>
            <td>{{ student.grade }}</td>
            <td>{{ student.gender }}</td>
            <td>{{ student.attendance }}%</td>
            <td>{{ student.gpa }}</td>
            <td>{{ student.performanceIndex }}%</td>
            <td [ngClass]="'risk-' + student.riskLevel">{{ student.riskLevel | titlecase }}</td>
            <td>
              <button class="action-btn" (click)="viewStudent(student.id)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination">
        <button>Previous</button>
        <span>Page 1 of 5</span>
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
    
    .filter-buttons button:hover {
      background-color: #e0e0e0;
    }
    
    .students-table {
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
export class StudentsListComponent implements OnInit {
  students: Student[] = [
    { id: '1', name: 'John Smith', grade: '10th', gender: 'Male', attendance: 65, gpa: 2.4, performanceIndex: 58, riskLevel: 'high' },
    { id: '2', name: 'Emily Johnson', grade: '9th', gender: 'Female', attendance: 72, gpa: 2.8, performanceIndex: 64, riskLevel: 'medium' },
    { id: '3', name: 'Michael Brown', grade: '11th', gender: 'Male', attendance: 68, gpa: 2.6, performanceIndex: 62, riskLevel: 'high' },
    { id: '4', name: 'Jessica Williams', grade: '9th', gender: 'Female', attendance: 75, gpa: 3.0, performanceIndex: 69, riskLevel: 'medium' },
    { id: '5', name: 'David Miller', grade: '10th', gender: 'Male', attendance: 70, gpa: 2.7, performanceIndex: 61, riskLevel: 'medium' },
    { id: '6', name: 'Sarah Davis', grade: '11th', gender: 'Female', attendance: 88, gpa: 3.6, performanceIndex: 83, riskLevel: 'low' },
    { id: '7', name: 'James Wilson', grade: '9th', gender: 'Male', attendance: 92, gpa: 3.8, performanceIndex: 87, riskLevel: 'low' },
    { id: '8', name: 'Olivia Thompson', grade: '10th', gender: 'Female', attendance: 85, gpa: 3.4, performanceIndex: 79, riskLevel: 'low' },
    { id: '9', name: 'Daniel Martinez', grade: '11th', gender: 'Male', attendance: 78, gpa: 3.2, performanceIndex: 75, riskLevel: 'medium' },
    { id: '10', name: 'Sophia Anderson', grade: '9th', gender: 'Female', attendance: 90, gpa: 3.7, performanceIndex: 85, riskLevel: 'low' }
  ];
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    console.log('Students list component initialized');
  }
  
  viewStudent(id: string) {
    this.router.navigate(['/students', id]);
  }
}