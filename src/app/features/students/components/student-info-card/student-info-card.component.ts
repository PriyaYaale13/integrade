// src/app/features/students/components/student-info-card/student-info-card.component.ts
import { Component, Input } from '@angular/core';
import { Student } from '../../../../models';

@Component({
  selector: 'app-student-info-card',
  templateUrl: './student-info-card.component.html',
  styleUrls: ['./student-info-card.component.scss']
})
export class StudentInfoCardComponent {
  @Input() student!: Student;

  getFullName(): string {
    return `${this.student.firstName} ${this.student.lastName}`;
  }

  getRiskStatusClass(): string {
    return this.student.atRisk ? 'risk-status-at-risk' : 'risk-status-normal';
  }

  getRiskStatusText(): string {
    return this.student.atRisk ? 'At Risk' : 'On Track';
  }
}
