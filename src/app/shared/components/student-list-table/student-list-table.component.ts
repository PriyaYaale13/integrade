import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StateStudentListTableComponent } from '../../../models/subject-selector.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-student-list-table',
  imports: [CommonModule],
  templateUrl: './student-list-table.component.html',
  styleUrl: './student-list-table.component.scss'
})
export class StudentListTableComponent {
 @Input() studentList: StateStudentListTableComponent[] = [];
 @Input() trackByFn!: (index: number, student: StateStudentListTableComponent) => number;
 constructor(private router: Router){};
 viewStudent(studentId: number) {
     console.log('Navigating to student:', studentId);
     this.router.navigate(['/teacher/at-risk/at-risk-student-detail', studentId.toString()])
     .then(() => {
      window.location.reload();
    });;
   }

}