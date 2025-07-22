// src/app/features/student-portal/containers/student-dashboard/student-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  date = new Date();
  
  // Student data
  student = {
    id: 'mark-felton',
    name: 'Mark Felton',
    grade: '5th',
    photo: null,
    school: 'Providence Creek Academy',
    teacher: 'Ms. Johnson'
  };
  
  // Upcoming assignments/tests
  upcomingItems = [
    {
      type: 'assignment',
      title: 'Math Homework - Chapter 7',
      subject: 'Mathematics',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      status: 'not-started'
    },
    {
      type: 'test',
      title: 'Vocabulary Quiz',
      subject: 'ELA',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      status: 'upcoming'
    },
    {
      type: 'project',
      title: 'Science Fair Project',
      subject: 'Science',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      status: 'in-progress'
    }
  ];

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.user$;
  }

  ngOnInit(): void {
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'not-started':
        return 'status-not-started';
      case 'in-progress':
        return 'status-in-progress';
      case 'upcoming':
        return 'status-upcoming';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'not-started':
        return 'pending';
      case 'in-progress':
        return 'hourglass_top';
      case 'upcoming':
        return 'event';
      case 'completed':
        return 'task_alt';
      default:
        return 'help';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'assignment':
        return 'assignment';
      case 'test':
        return 'quiz';
      case 'project':
        return 'science';
      default:
        return 'description';
    }
  }
}
