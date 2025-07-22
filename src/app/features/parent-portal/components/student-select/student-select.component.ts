// src/app/features/parent-portal/components/student-select/student-select.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Student {
  id: string;
  name: string;
  grade: string;
  photo: string | null;
}

@Component({
  selector: 'app-student-select',
  templateUrl: './student-select.component.html',
  styleUrls: ['./student-select.component.scss']
})
export class StudentSelectComponent {
  @Input() students: Student[] = [];
  @Input() selectedStudentId: string = '';
  @Output() studentSelected = new EventEmitter<string>();

  onStudentClick(studentId: string): void {
    this.studentSelected.emit(studentId);
  }
}
