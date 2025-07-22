// // src/app/features/parent-portal/containers/parent-dashboard/parent-dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from '../../../../core/auth/auth.service';
// import { User } from '../../../../models/user.model';

// @Component({
//   selector: 'app-parent-dashboard',
//   templateUrl: './parent-dashboard.component.html',
//   styleUrls: ['./parent-dashboard.component.scss']
// })
// export class ParentDashboardComponent implements OnInit {
//   currentUser$: Observable<User | null>;
//   selectedStudentId: string = 'mark-felton';
  
//   // Mock student list
//   students = [
//     {
//       id: 'mark-felton',
//       name: 'Mark Felton',
//       grade: '5th',
//       photo: null
//     },
//     {
//       id: 'christopher-felton',
//       name: 'Christopher Felton',
//       grade: '3rd',
//       photo: null
//     }
//   ];

//   constructor(private authService: AuthService) {
//     this.currentUser$ = this.authService.user$;
//   }

//   ngOnInit(): void {
//   }

//   onStudentSelected(studentId: string): void {
//     this.selectedStudentId = studentId;
//   }
// }

//testing phase

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Child {
  id: string;
  name: string;
  grade: string;
  averageGrade: string;
  attendance: number;
  upcomingAssignments: number;
}

interface Assignment {
  id: string;
  name: string;
  subject: string;
  dateDue: string;
  status: 'Pending' | 'Submitted' | 'Late' | 'Graded';
  grade?: string;
}

interface Notification {
  id: string;
  title: string;
  date: string;
  read: boolean;
  type: 'Info' | 'Warning' | 'Alert';
}

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Parent Portal</h2>
      
      <div class="overview-cards">
        <div class="children-card" *ngFor="let child of children">
          <h3>{{ child.name }}</h3>
          <div class="child-details">
            <div class="detail">
              <span class="label">Grade:</span>
              <span>{{ child.grade }}</span>
            </div>
            <div class="detail">
              <span class="label">Avg. Grade:</span>
              <span>{{ child.averageGrade }}</span>
            </div>
            <div class="detail">
              <span class="label">Attendance:</span>
              <span>{{ child.attendance }}%</span>
            </div>
            <div class="detail">
              <span class="label">Upcoming:</span>
              <span>{{ child.upcomingAssignments }} assignments</span>
            </div>
          </div>
          <button class="view-btn">View Details</button>
        </div>
      </div>
      
      <div class="dashboard-sections">
        <section class="assignments-section">
          <h3>Upcoming Assignments</h3>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Assignment</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let assignment of assignments">
                <td>{{ assignment.student }}</td>
                <td>{{ assignment.name }}</td>
                <td>{{ assignment.subject }}</td>
                <td>{{ assignment.dateDue }}</td>
                <td [ngClass]="'status-' + assignment.status.toLowerCase()">
                  {{ assignment.status }}
                </td>
                <td>{{ assignment.grade || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </section>
        
        <section class="notifications-section">
          <h3>Notifications</h3>
          <div class="notification-list">
            <div *ngFor="let notification of notifications" 
                 [ngClass]="{'notification': true, 'unread': !notification.read, 
                            'type-info': notification.type === 'Info',
                            'type-warning': notification.type === 'Warning',
                            'type-alert': notification.type === 'Alert'}">
              <div class="notification-header">
                <h4>{{ notification.title }}</h4>
                <span>{{ notification.date }}</span>
              </div>
              <p>{{ notification.description }}</p>
            </div>
          </div>
        </section>
      </div>
      
      <div class="attendance-section">
        <h3>Attendance Overview</h3>
        <div class="placeholder-chart">[Attendance Chart for All Children]</div>
      </div>
      
      <div class="calendar-section">
        <h3>Upcoming School Events</h3>
        <div class="events-list">
          <div class="event" *ngFor="let event of events">
            <div class="event-date">
              <div class="month">{{ event.month }}</div>
              <div class="day">{{ event.day }}</div>
            </div>
            <div class="event-details">
              <h4>{{ event.title }}</h4>
              <p>{{ event.description }}</p>
              <div class="event-time">{{ event.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1.5rem;
    }
    
    .overview-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 1.5rem 0;
    }
    
    .children-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }
    
    .child-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 1rem 0;
    }
    
    .detail {
      display: flex;
      flex-direction: column;
    }
    
    .label {
      font-size: 0.85rem;
      color: #616161;
      margin-bottom: 0.25rem;
    }
    
    .view-btn {
      padding: 0.5rem 1rem;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    }
    
    .dashboard-sections {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    section {
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
    
    .status-pending {
      color: #2196f3;
    }
    
    .status-submitted {
      color: #4caf50;
    }
    
    .status-late {
      color: #ff9800;
    }
    
    .status-graded {
      color: #9c27b0;
    }
    
    .notification-list {
      margin-top: 1rem;
    }
    
    .notification {
      background-color: #f5f5f5;
      border-left: 4px solid #9e9e9e;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0 4px 4px 0;
    }
    
    .notification.unread {
      background-color: #e8eaf6;
    }
    
    .notification.type-warning {
      border-left-color: #ff9800;
    }
    
    .notification.type-alert {
      border-left-color: #f44336;
    }
    
    .notification.type-info {
      border-left-color: #2196f3;
    }
    
    .notification-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .notification-header h4 {
      margin: 0;
    }
    
    .notification p {
      margin: 0;
      color: #616161;
    }
    
    .attendance-section, .calendar-section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
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
    
    .events-list {
      margin-top: 1rem;
    }
    
    .event {
      display: flex;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .event:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .event-date {
      width: 60px;
      margin-right: 1rem;
      text-align: center;
    }
    
    .month {
      background-color: #3f51b5;
      color: white;
      border-radius: 4px 4px 0 0;
      padding: 0.25rem;
      font-size: 0.8rem;
      text-transform: uppercase;
    }
    
    .day {
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-top: none;
      border-radius: 0 0 4px 4px;
      padding: 0.25rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .event-details {
      flex: 1;
    }
    
    .event-details h4 {
      margin: 0 0 0.5rem 0;
    }
    
    .event-details p {
      margin: 0 0 0.5rem 0;
      color: #616161;
    }
    
    .event-time {
      font-size: 0.85rem;
      color: #9e9e9e;
    }
  `]
})
export class ParentDashboardComponent implements OnInit {
  children: Child[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      grade: '9th',
      averageGrade: 'B+',
      attendance: 95,
      upcomingAssignments: 4
    },
    {
      id: '2',
      name: 'Michael Johnson',
      grade: '6th',
      averageGrade: 'A-',
      attendance: 98,
      upcomingAssignments: 3
    }
  ];
  
  assignments: any[] = [
    {
      student: 'Sarah Johnson',
      name: 'Literary Analysis Essay',
      subject: 'English',
      dateDue: '2023-10-20',
      status: 'Pending'
    },
    {
      student: 'Sarah Johnson',
      name: 'Algebra Mid-Term',
      subject: 'Mathematics',
      dateDue: '2023-10-15',
      status: 'Graded',
      grade: 'B-'
    },
    {
      student: 'Michael Johnson',
      name: 'Science Project',
      subject: 'Science',
      dateDue: '2023-10-25',
      status: 'Pending'
    },
    {
      student: 'Sarah Johnson',
      name: 'History Report',
      subject: 'History',
      dateDue: '2023-10-18',
      status: 'Submitted'
    },
    {
      student: 'Michael Johnson',
      name: 'Multiplication Quiz',
      subject: 'Mathematics',
      dateDue: '2023-10-12',
      status: 'Graded',
      grade: 'A'
    }
  ];
  
  notifications: any[] = [
    {
      id: '1',
      title: 'Parent-Teacher Conference',
      date: '2023-10-10',
      read: false,
      type: 'Info',
      description: 'Parent-Teacher conferences will be held next week. Please sign up for a time slot.'
    },
    {
      id: '2',
      title: 'Missing Assignment',
      date: '2023-10-08',
      read: true,
      type: 'Warning',
      description: 'Sarah has a missing assignment in English class: Book Report due 10/05.'
    },
    {
      id: '3',
      title: 'School Closure',
      date: '2023-10-05',
      read: true,
      type: 'Alert',
      description: 'School will be closed on October 20th for teacher professional development.'
    }
  ];
  
  events: any[] = [
    {
      month: 'Oct',
      day: '15',
      title: 'Fall Festival',
      description: 'Join us for the annual Fall Festival with games, food, and activities.',
      time: '1:00 PM - 5:00 PM'
    },
    {
      month: 'Oct',
      day: '20',
      title: 'Professional Development Day',
      description: 'No school for students. Teachers will be in training.',
      time: 'All Day'
    },
    {
      month: 'Oct',
      day: '25',
      title: 'Parent-Teacher Conferences',
      description: 'Schedule appointments to discuss student progress.',
      time: '3:00 PM - 8:00 PM'
    },
    {
      month: 'Nov',
      day: '01',
      title: 'Science Fair',
      description: 'Students will present their science projects.',
      time: '6:00 PM - 8:00 PM'
    }
  ];
  
  constructor() {}
  
  ngOnInit() {
    console.log('Parent dashboard component initialized');
  }
}