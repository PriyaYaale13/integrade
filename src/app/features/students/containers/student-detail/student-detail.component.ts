// // src/app/features/students/containers/student-detail/student-detail.component.ts
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable, Subscription, combineLatest } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
// import { AppState } from '../../../../state/app.state';
// import * as StudentsActions from '../../../../state/students/students.actions';
// import * as StudentsSelectors from '../../../../state/students/students.selectors';
// import { Student, StudentPerformance, Intervention } from '../../../../models';

// @Component({
//   selector: 'app-student-detail',
//   templateUrl: './student-detail.component.html',
//   styleUrls: ['./student-detail.component.scss']
// })
// export class StudentDetailComponent implements OnInit, OnDestroy {
//   student$: Observable<Student | null>;
//   performances$: Observable<StudentPerformance[]>;
//   interventions$: Observable<Intervention[]>;
//   loading$: Observable<boolean>;
//   error$: Observable<any>;
  
//   studentId: string | null = null;
//   private subscription = new Subscription();

//   constructor(
//     private route: ActivatedRoute,
//     private store: Store<AppState>
//   ) {
//     this.student$ = this.store.select(StudentsSelectors.selectSelectedStudent);
//     this.performances$ = this.store.select(StudentsSelectors.selectStudentPerformances);
//     this.interventions$ = this.store.select(StudentsSelectors.selectStudentInterventions);
//     this.loading$ = this.store.select(StudentsSelectors.selectStudentsLoading);
//     this.error$ = this.store.select(StudentsSelectors.selectStudentsError);
//   }

//   ngOnInit(): void {
//     this.subscription.add(
//       this.route.paramMap.subscribe(params => {
//         this.studentId = params.get('id');
//         if (this.studentId) {
//           this.loadStudentData(this.studentId);
//         }
//       })
//     );
//   }

//   loadStudentData(studentId: string): void {
//     this.store.dispatch(StudentsActions.loadStudentPerformances({ studentId }));
//     this.store.dispatch(StudentsActions.loadStudentInterventions({ studentId }));
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }
// }

//testing phase

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  studentId: string = '';
  
  student: any = {
    id: '1',
    name: 'John Smith',
    grade: '10th',
    gender: 'Male',
    dateOfBirth: '2006-05-12',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    attendance: 65,
    gpa: 2.4,
    performanceIndex: 58,
    riskLevel: 'high',
    subjects: [
      { name: 'Mathematics', grade: 'C-', teacher: 'Mrs. Johnson', comments: 'Struggles with algebra concepts.' },
      { name: 'English', grade: 'D+', teacher: 'Mr. Williams', comments: 'Poor essay writing skills.' },
      { name: 'Science', grade: 'C', teacher: 'Dr. Brown', comments: 'Shows interest but lacks focus.' },
      { name: 'History', grade: 'C+', teacher: 'Ms. Davis', comments: 'Participates in class discussions.' },
      { name: 'Physical Education', grade: 'B-', teacher: 'Coach Wilson', comments: 'Good team player.' }
    ]
  };
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      console.log(`Loading student with ID: ${this.studentId}`);
      // In a real app, you would fetch the student data based on the ID
      // For now, we're using mock data
    });
  }
}

