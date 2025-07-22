export interface DistrictLeader {
  id:number;
  name: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  students: number;
  attendance: number;
  performance: number;
  trend: 'up' | 'neutral' | 'down';
  school: string;
  academicYear: string;
  grade: string;
  subject: string; 
  
}
export interface districtLeaderDataforFilter {

    schools: string[];
    subjects: string[];
    grades: string[];
    academicYears: string[];

  
  
}