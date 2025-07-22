import { Injectable } from "@angular/core";
import { parentstudent } from "../models/parent-student-landing.model";
import { Observable } from "rxjs";
import { AuthService } from "../core/services/auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ParentStudentService {
    constructor(private authService: AuthService, private http: HttpClient) { }
getdata():Observable<parentstudent[]>{
    return this.http.get<parentstudent[]>('assets/data/parent-student-landing.json')
}

}