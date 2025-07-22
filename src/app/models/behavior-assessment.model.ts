export interface BehaviorAssessment {
  id: string;
  studentId: string;
  gender: string;
  studentName: string;
  gradeLevel: string;
  semester: string;
  
  data: MonthlyBehavior[];
}

export interface MonthlyBehavior {
  month: string;
  gender: string;
  attendance: number;
  absentDays: number;
  tardinessCount: number;
  disciplinaryActions: number;
  suspensionCount: number;
  status: string;
  interventionCount: number;
  warnings: number;
  
}
export interface BehaviorKpiData {
  key: string;
  label: string;
  value: string;
  comparison?: string; 
}

