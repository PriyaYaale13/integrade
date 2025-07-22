import { Injectable } from "@angular/core";

import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DistrictLeader, districtLeaderDataforFilter } from "../models/district.leader.model";


@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  
  constructor(private http: HttpClient) {}

  /**
   * Fetches district leaders from an external JSON file
   */
  getDistrictLeaders(): Observable<DistrictLeader[]> {
    return this.http.get<DistrictLeader[]>('assets/data/district-leader-student-data.json').pipe(
      map((data: any) => {
        // Generate mock data
        const generatedData: DistrictLeader[] = Array.from({ length: 40 }, (_, i) => ({
          id: i + 3,
          name: `School ${i + 3}`,
          tier: (i % 3 === 0 ? 'Tier 1' : i % 3 === 1 ? 'Tier 2' : 'Tier 3') as 'Tier 1' | 'Tier 2' | 'Tier 3',
          students: 500 + Math.floor(Math.random() * 1000),
          attendance: 90 + Math.floor(Math.random() * 10),
          performance: 80 + Math.floor(Math.random() * 20),
          trend: (i % 3 === 0 ? 'up' : i % 3 === 1 ? 'neutral' : 'down') as 'up' | 'neutral' | 'down',
          school: `School ${i + 3}`,
          academicYear: i % 2 === 0 ? '2024' : '2025',
          grade: i % 2 === 0 ? '11th' : '12th',
          awardType: i % 2 === 0 ? 'Maths' : 'Science',
          subject: i % 2 === 0 ? 'Maths' : 'Science'
        }));
        return [...data, ...generatedData];
      })
    );
  }

  /**
   * Fetches filter data like schools, subjects, grades, and academic years
   * from a static JSON file and adds mock entries
   */
  getdataforFilter(): Observable<districtLeaderDataforFilter> {
    return this.http.get<districtLeaderDataforFilter>('assets/data/district-leader-filter.json')
  }
}
