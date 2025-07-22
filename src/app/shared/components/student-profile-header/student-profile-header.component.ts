import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { StateStudentListTableComponent } from '../../../models/subject-selector.model';

@Component({
  selector: 'app-student-profile-header',
  imports: [CommonModule,NgClass],
  templateUrl: './student-profile-header.component.html',
  styleUrl: './student-profile-header.component.scss'
})
export class StudentProfileHeaderComponent {
  @Input() studentList: StateStudentListTableComponent[] = []; 
  
}
