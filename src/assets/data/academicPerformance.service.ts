import { Injectable } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StateStudentAcademicPerformance } from "../models/student-details-page.model";

@Injectable({
    providedIn: 'root'
})
export class AcademicPerformanceService {
    constructor(private authService: AuthService, private http: HttpClient) { }

    getStudentAcademicPerformance(): Observable<StateStudentAcademicPerformance[]> {
        return this.http.get<StateStudentAcademicPerformance[]>('assets/data/assessment-data.json');
    }
}