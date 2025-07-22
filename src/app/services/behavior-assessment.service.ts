import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { BehaviorAssessment } from "../models/behavior-assessment.model";

@Injectable({
  providedIn: 'root'
})
export class BehaviorAssessmentService {

  constructor(private http: HttpClient) {}

  getDataForMay(): Observable<BehaviorAssessment[]> {
    return this.http.get<BehaviorAssessment[]>('assets/data/behavioral-assessment-student-data.json')
      .pipe(
        map(data => 
          data
            .map(student => ({
              ...student,
              data: student.data.filter(entry => entry.month === '2025-05')
            }))
            .filter(student => student.data.length > 0)
        )
      );
  }

  getSemesters(): Observable<string[]> {
    return of(['Fall Semester', 'Winter Semester', 'Spring Semester', 'Full Year']);
  }

  getTeacherGrade(): Observable<string[]> {
    return of(['6th Grade', '7th Grade', '8th Grade', '9th Grade']);
  }

  getClassList(): Observable<string[]> {
    return of(['Math', 'Science', 'History', 'English', 'Art']);
  }
}
