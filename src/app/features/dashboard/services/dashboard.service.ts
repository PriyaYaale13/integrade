// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import { 
//   DashboardSummary, 
//   RecentActivity, 
//   UpcomingEvent, 
//   CourseProgress,
//   Notification
// } from '../../shared/models/dashboard.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   /**
//    * Fetches the dashboard summary data
//    */
//   getDashboardSummary(): Observable<DashboardSummary> {
//     return this.http.get<DashboardSummary>(`${this.apiUrl}/dashboard/summary`);
//   }

//   /**
//    * Fetches recent activities for the current user
//    */
//   getRecentActivities(): Observable<RecentActivity[]> {
//     return this.http.get<RecentActivity[]>(`${this.apiUrl}/dashboard/activities`);
//   }

//   /**
//    * Fetches upcoming events for the current user
//    */
//   getUpcomingEvents(): Observable<UpcomingEvent[]> {
//     return this.http.get<UpcomingEvent[]>(`${this.apiUrl}/dashboard/events`);
//   }

//   /**
//    * Fetches course progress data for the current user
//    */
//   getCourseProgress(): Observable<CourseProgress[]> {
//     return this.http.get<CourseProgress[]>(`${this.apiUrl}/dashboard/progress`);
//   }

//   /**
//    * Fetches notifications for the current user
//    */
//   getNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.apiUrl}/dashboard/notifications`);
//   }

//   /**
//    * Marks a notification as read
//    * @param id The ID of the notification to mark as read
//    */
//   markNotificationAsRead(id: string): Observable<void> {
//     return this.http.patch<void>(`${this.apiUrl}/dashboard/notifications/${id}`, { read: true });
//   }

//   /**
//    * Dismisses a notification
//    * @param id The ID of the notification to dismiss
//    */
//   dismissNotification(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/dashboard/notifications/${id}`);
//   }
// }


// Code With Mock Data

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { 
  DashboardSummary, 
  RecentActivity, 
  UpcomingEvent, 
  CourseProgress,
  Notification,
  AtRiskStudent,
  ClassAverage,
  DashboardData
} from '../../../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetches the dashboard summary data
   */
  getDashboardSummary(): Observable<DashboardSummary> {
    // Mock data
    const mockSummary: DashboardSummary = {
      totalCourses: 6,
      completedCourses: 2,
      inProgressCourses: 4,
      averageScore: 87.5,
      totalAssignments: 24,
      pendingAssignments: 7
    };
    
    return of(mockSummary);
    // Uncomment below for actual API call
    // return this.http.get<DashboardSummary>(`${this.apiUrl}/dashboard/summary`);
  }

  /**
   * Fetches recent activities for the current user
   */
  getRecentActivities(): Observable<RecentActivity[]> {
    // Mock data
    const mockActivities: RecentActivity[] = [
      {
        id: '1',
        type: 'assignment_submission',
        title: 'Assignment Submitted',
        description: 'You submitted "Data Structures Final Project"',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        courseId: 'cs101',
        courseName: 'Introduction to Computer Science'
      },
      {
        id: '2',
        type: 'quiz_completion',
        title: 'Quiz Completed',
        description: 'You scored 92% on "JavaScript Fundamentals Quiz"',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        courseId: 'js202',
        courseName: 'Advanced JavaScript'
      },
      {
        id: '3',
        type: 'course_access',
        title: 'Course Accessed',
        description: 'You accessed "Database Design Principles"',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        courseId: 'db303',
        courseName: 'Database Design Principles'
      },
      {
        id: '4',
        type: 'forum_post',
        title: 'Forum Post',
        description: 'You replied to "Help with React Hooks"',
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        courseId: 'react404',
        courseName: 'React Development'
      }
    ];
    
    return of(mockActivities);
    // Uncomment below for actual API call
    // return this.http.get<RecentActivity[]>(`${this.apiUrl}/dashboard/activities`);
  }

  /**
   * Fetches upcoming events for the current user
   */
  getUpcomingEvents(): Observable<UpcomingEvent[]> {
    // Mock data
    const mockEvents: UpcomingEvent[] = [
      {
        id: '1',
        title: 'Final Project Submission',
        description: 'Submit your final project for Data Structures',
        startDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
        endDate: new Date(Date.now() + 345600000).toISOString(), // 4 days from now
        type: 'deadline',
        courseId: 'cs101',
        courseName: 'Introduction to Computer Science'
      },
      {
        id: '2',
        title: 'JavaScript Quiz',
        description: 'Complete the quiz on JavaScript Fundamentals',
        startDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        endDate: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
        type: 'quiz',
        courseId: 'js202',
        courseName: 'Advanced JavaScript'
      },
      {
        id: '3',
        title: 'Database Design Live Session',
        description: 'Join the live session on Database Normalization',
        startDate: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
        endDate: new Date(Date.now() + 435600000).toISOString(), // 5 days + 1 hour from now
        type: 'live_session',
        courseId: 'db303',
        courseName: 'Database Design Principles'
      },
      {
        id: '4',
        title: 'React Hooks Assignment',
        description: 'Complete the assignment on React Hooks',
        startDate: new Date(Date.now() + 518400000).toISOString(), // 6 days from now
        endDate: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
        type: 'assignment',
        courseId: 'react404',
        courseName: 'React Development'
      }
    ];
    
    return of(mockEvents);
    // Uncomment below for actual API call
    // return this.http.get<UpcomingEvent[]>(`${this.apiUrl}/dashboard/events`);
  }

  /**
   * Fetches course progress data for the current user
   */
  getCourseProgress(): Observable<CourseProgress[]> {
    // Mock data
    const mockProgress: CourseProgress[] = [
      {
        id: 'cs101',
        name: 'Introduction to Computer Science',
        progress: 0.75, // 75% complete
        totalModules: 12,
        completedModules: 9,
        lastAccessed: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: 'js202',
        name: 'Advanced JavaScript',
        progress: 0.6, // 60% complete
        totalModules: 10,
        completedModules: 6,
        lastAccessed: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: 'db303',
        name: 'Database Design Principles',
        progress: 0.3, // 30% complete
        totalModules: 8,
        completedModules: 2.4,
        lastAccessed: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      },
      {
        id: 'react404',
        name: 'React Development',
        progress: 0.9, // 90% complete
        totalModules: 15,
        completedModules: 13.5,
        lastAccessed: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
      }
    ];
    
    return of(mockProgress);
    // Uncomment below for actual API call
    // return this.http.get<CourseProgress[]>(`${this.apiUrl}/dashboard/progress`);
  }

  /**
   * Fetches notifications for the current user
   */
  getNotifications(): Observable<Notification[]> {
    // Mock data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Assignment Graded',
        message: 'Your assignment "Data Structures Project" has been graded. You received 92%.',
        type: 'success',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: false,
        actionUrl: '/courses/cs101/assignments/123',
        courseId: 'cs101'
      },
      {
        id: '2',
        title: 'New Assignment',
        message: 'A new assignment "JavaScript Frameworks" has been posted.',
        type: 'info',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: true,
        actionUrl: '/courses/js202/assignments/456',
        courseId: 'js202'
      },
      {
        id: '3',
        title: 'Deadline Approaching',
        message: 'The deadline for "Database Design Project" is in 2 days.',
        type: 'warning',
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        read: false,
        actionUrl: '/courses/db303/assignments/789',
        courseId: 'db303'
      },
      {
        id: '4',
        title: 'Quiz Results',
        message: 'You scored 85% on "React Fundamentals Quiz".',
        type: 'info',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        read: false,
        actionUrl: '/courses/react404/quizzes/101',
        courseId: 'react404'
      },
      {
        id: '5',
        title: 'System Maintenance',
        message: 'The system will be down for maintenance on Sunday from 2-4 AM.',
        type: 'warning',
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        read: true
      }
    ];
    
    return of(mockNotifications);
    // Uncomment below for actual API call
    // return this.http.get<Notification[]>(`${this.apiUrl}/dashboard/notifications`);
  }

  /**
   * Marks a notification as read
   * @param id The ID of the notification to mark as read
   */
  markNotificationAsRead(id: string): Observable<void> {
    console.log(`Marking notification ${id} as read`);
    return of(undefined);
    // Uncomment below for actual API call
    // return this.http.patch<void>(`${this.apiUrl}/dashboard/notifications/${id}`, { read: true });
  }

  /**
   * Dismisses a notification
   * @param id The ID of the notification to dismiss
   */
  dismissNotification(id: string): Observable<void> {
    console.log(`Dismissing notification ${id}`);
    return of(undefined);
    // Uncomment below for actual API call
    // return this.http.delete<void>(`${this.apiUrl}/dashboard/notifications/${id}`);
  }

  /**
   * Fetches at-risk students data for instructors
   * @param courseId Optional course ID to filter students by course
   */
  getAtRiskStudents(courseId?: string): Observable<AtRiskStudent[]> {
    // Mock data
    const mockAtRiskStudents: AtRiskStudent[] = [
      {
        id: 'student1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        courseId: 'cs101',
        courseName: 'Introduction to Computer Science',
        riskLevel: 'high',
        riskFactors: [
          { factor: 'attendance', value: 0.65, threshold: 0.8 },
          { factor: 'assignment_completion', value: 0.5, threshold: 0.7 },
          { factor: 'quiz_scores', value: 0.62, threshold: 0.7 }
        ],
        lastActivity: new Date(Date.now() - 604800000).toISOString() // 7 days ago
      },
      {
        id: 'student2',
        name: 'Emily Johnson',
        email: 'emily.johnson@example.com',
        courseId: 'js202',
        courseName: 'Advanced JavaScript',
        riskLevel: 'medium',
        riskFactors: [
          { factor: 'attendance', value: 0.75, threshold: 0.8 },
          { factor: 'assignment_completion', value: 0.8, threshold: 0.7 },
          { factor: 'quiz_scores', value: 0.68, threshold: 0.7 }
        ],
        lastActivity: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      },
      {
        id: 'student3',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        courseId: 'db303',
        courseName: 'Database Design Principles',
        riskLevel: 'high',
        riskFactors: [
          { factor: 'attendance', value: 0.6, threshold: 0.8 },
          { factor: 'assignment_completion', value: 0.4, threshold: 0.7 },
          { factor: 'quiz_scores', value: 0.55, threshold: 0.7 }
        ],
        lastActivity: new Date(Date.now() - 864000000).toISOString() // 10 days ago
      },
      {
        id: 'student4',
        name: 'Sarah Davis',
        email: 'sarah.davis@example.com',
        courseId: 'react404',
        courseName: 'React Development',
        riskLevel: 'medium',
        riskFactors: [
          { factor: 'attendance', value: 0.78, threshold: 0.8 },
          { factor: 'assignment_completion', value: 0.65, threshold: 0.7 },
          { factor: 'quiz_scores', value: 0.72, threshold: 0.7 }
        ],
        lastActivity: new Date(Date.now() - 345600000).toISOString() // 4 days ago
      }
    ];
    
    // Filter by courseId if provided
    const filteredStudents = courseId 
      ? mockAtRiskStudents.filter(student => student.courseId === courseId)
      : mockAtRiskStudents;
    
    return of(filteredStudents);
    // Uncomment below for actual API call
    // const url = courseId 
    //   ? `${this.apiUrl}/dashboard/at-risk-students?courseId=${courseId}`
    //   : `${this.apiUrl}/dashboard/at-risk-students`;
    // return this.http.get<AtRiskStudent[]>(url);
  }

  /**
   * Fetches class average data for instructors
   * @param courseId Optional course ID to filter by course
   */
  getClassAverage(courseId?: string): Observable<ClassAverage[]> {
    // Mock data
    const mockClassAverages: ClassAverage[] = [
      {
        courseId: 'cs101',
        courseName: 'Introduction to Computer Science',
        overallAverage: 0.78,
        metrics: [
          { name: 'Assignments', average: 0.82 },
          { name: 'Quizzes', average: 0.76 },
          { name: 'Participation', average: 0.85 },
          { name: 'Final Project', average: 0.71 }
        ],
        studentCount: 32,
        passingCount: 28,
        average: undefined
      },
      {
        courseId: 'js202',
        courseName: 'Advanced JavaScript',
        overallAverage: 0.81,
        metrics: [
          { name: 'Assignments', average: 0.79 },
          { name: 'Quizzes', average: 0.83 },
          { name: 'Participation', average: 0.88 },
          { name: 'Final Project', average: 0.77 }
        ],
        studentCount: 24,
        passingCount: 22,
        average: undefined
      },
      {
        courseId: 'db303',
        courseName: 'Database Design Principles',
        overallAverage: 0.72,
        metrics: [
          { name: 'Assignments', average: 0.68 },
          { name: 'Quizzes', average: 0.74 },
          { name: 'Participation', average: 0.81 },
          { name: 'Final Project', average: 0.69 }
        ],
        studentCount: 28,
        passingCount: 22,
        average: undefined
      },
      {
        courseId: 'react404',
        courseName: 'React Development',
        overallAverage: 0.85,
        metrics: [
          { name: 'Assignments', average: 0.87 },
          { name: 'Quizzes', average: 0.82 },
          { name: 'Participation', average: 0.89 },
          { name: 'Final Project', average: 0.84 }
        ],
        studentCount: 20,
        passingCount: 19,
        average: undefined
      }
    ];
    
    // Filter by courseId if provided
    const filteredAverages = courseId 
      ? mockClassAverages.filter(avg => avg.courseId === courseId)
      : mockClassAverages;
    
    return of(filteredAverages);
    // Uncomment below for actual API call
    // const url = courseId 
    //   ? `${this.apiUrl}/dashboard/class-averages?courseId=${courseId}`
    //   : `${this.apiUrl}/dashboard/class-averages`;
    // return this.http.get<ClassAverage[]>(url);
  }

  /**
   * Fetches comprehensive dashboard data for the current user
   * Combines multiple data sources into a single response
   */
  getDashboardData(filters: any): Observable<DashboardData> {
    // Mock data
    const mockDashboardData: DashboardData = {
      summary: {
        totalCourses: 6,
        completedCourses: 2,
        inProgressCourses: 4,
        averageScore: 87.5,
        totalAssignments: 24,
        pendingAssignments: 7
      },
      performanceSummaries: {
        totalCourses: 6,
        completedCourses: 2,
        inProgressCourses: 4,
        averageScore: 87.5,
        totalAssignments: 24,
        pendingAssignments: 7
      },
      studentPerformances: {
        totalStudents: 100,
        completedStudents: 75,
        inProgressStudents: 20,
        averageScore: 85.0,
        totalAssignments: 150
      },
      riskSummary: {
        totalStudents: 100,
        atRiskStudents: 20,
        riskLevel: 'high',
        riskFactors: ['attendance', 'assignment_completion', 'quiz_scores']
      },
      recentActivities: [
        {
          id: '1',
          type: 'assignment_submission',
          title: 'Assignment Submitted',
          description: 'You submitted "Data Structures Final Project"',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          courseId: 'cs101',
          courseName: 'Introduction to Computer Science'
        },
        {
          id: '2',
          type: 'quiz_completion',
          title: 'Quiz Completed',
          description: 'You scored 92% on "JavaScript Fundamentals Quiz"',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          courseId: 'js202',
          courseName: 'Advanced JavaScript'
        }
      ],
      upcomingEvents: [
        {
          id: '1',
          title: 'Final Project Submission',
          description: 'Submit your final project for Data Structures',
          startDate: new Date(Date.now() + 259200000).toISOString(),
          endDate: new Date(Date.now() + 345600000).toISOString(),
          type: 'deadline',
          courseId: 'cs101',
          courseName: 'Introduction to Computer Science'
        },
        {
          id: '2',
          title: 'JavaScript Quiz',
          description: 'Complete the quiz on JavaScript Fundamentals',
          startDate: new Date(Date.now() + 86400000).toISOString(),
          endDate: new Date(Date.now() + 172800000).toISOString(),
          type: 'quiz',
          courseId: 'js202',
          courseName: 'Advanced JavaScript'
        }
      ],
      courseProgress: [
        {
          id: 'cs101',
          name: 'Introduction to Computer Science',
          progress: 0.75,
          totalModules: 12,
          completedModules: 9,
          lastAccessed: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'js202',
          name: 'Advanced JavaScript',
          progress: 0.6,
          totalModules: 10,
          completedModules: 6,
          lastAccessed: new Date(Date.now() - 172800000).toISOString()
        }
      ],
      notifications: [
        {
          id: '1',
          title: 'Assignment Graded',
          message: 'Your assignment "Data Structures Project" has been graded. You received 92%.',
          type: 'success',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: false,
          actionUrl: '/courses/cs101/assignments/123',
          courseId: 'cs101'
        },
        {
          id: '3',
          title: 'Deadline Approaching',
          message: 'The deadline for "Database Design Project" is in 2 days.',
          type: 'warning',
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          read: false,
          actionUrl: '/courses/db303/assignments/789',
          courseId: 'db303'
        }
      ],
      // Only included for instructor role
      atRiskStudents: [
        {
          id: 'student1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          courseId: 'cs101',
          courseName: 'Introduction to Computer Science',
          riskLevel: 'high',
          riskFactors: [
            { factor: 'attendance', value: 0.65, threshold: 0.8 },
            { factor: 'assignment_completion', value: 0.5, threshold: 0.7 }
          ],
          lastActivity: new Date(Date.now() - 604800000).toISOString()
        }
      ],
      // Only included for instructor role
      classAverages: [
        {
          courseId: 'cs101',
          courseName: 'Introduction to Computer Science',
          overallAverage: 0.78,
          metrics: [
            { name: 'Assignments', average: 0.82 },
            { name: 'Quizzes', average: 0.76 }
          ],
          studentCount: 32,
          passingCount: 28,
          average: undefined
        }
      ],
      userRole: 'instructor', // or 'student'
      lastUpdated: new Date().toISOString()
    };
    
    return of(mockDashboardData);
    // Uncomment below for actual API call
    // return this.http.get<DashboardData>(`${this.apiUrl}/dashboard/data`);
  }
}