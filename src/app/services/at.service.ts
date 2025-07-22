import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { stateAtRiskCart, StateBehaviors, stateGrades, stateNotes, StateStudentListTableComponent } from '../models/subject-selector.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AtService {
    constructor(private authService: AuthService, private http: HttpClient) { }

     //at-risk-student.service.ts
//for notes
 getNotes():Observable< stateNotes[]> {
    return this.http.get<stateNotes[]>('assets/data/stateNotes.json');
     }
      getGrades():Observable <stateGrades[]> {
      return this.http.get<stateGrades[]>('assets/data/stateGrades.json');
     }
   
    getBehaviors():Observable< StateBehaviors[]> {
      return this.http.get<StateBehaviors[]>('assets/data/StateBehaviors.json');
     }
   
   
    getStudentList():Observable<StateStudentListTableComponent[]> {
      return this.http.get<StateStudentListTableComponent[]>('assets/data/StudentListTableComponent.json');
     }
     //at_risk_components
     getData(): Observable<stateAtRiskCart[]> {
       return this.http.get<stateAtRiskCart[]>('assets/data/AtRiskCart.json');
     }
}