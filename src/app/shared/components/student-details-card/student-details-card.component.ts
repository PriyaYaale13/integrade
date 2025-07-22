import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Student } from '../../../models/student-details-page.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details-card',
  imports: [
    CommonModule,
  ],
  templateUrl: './student-details-card.component.html',
  styleUrl: './student-details-card.component.scss'
})
export class StudentDetailsCardComponent {
  studentId!:number;
  @Input() student!: Student;

  constructor(private route: ActivatedRoute,private http: HttpClient) { }




}
