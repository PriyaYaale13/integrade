import { Injectable } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { RootData, subjectoverview } from "../models/predictionTool.model";


@Injectable({
    providedIn: 'root'
})
export class PerdictionService {
    constructor(private authService: AuthService, private http: HttpClient) { }
    getData() : Observable<RootData>{
        return this.http.get<RootData>('assets/data/prediction-tool-data/prediction-tool-student-details.json')
    }
    
    
    getSubjectOverview():Observable<subjectoverview[]>{
        return this.http.get<subjectoverview[]>('assets/data/prediction-tool-data/predict-class-subject-overview.json')
    }

   
}