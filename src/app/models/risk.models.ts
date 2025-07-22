import { ScoreDistribution } from './assessment.model';

export interface AtRiskStudent {
    studentId: string;
    studentName: string;
    absenteeism?: string | number;
    tardiness?: string | number;
    elaScore?: number | string;
    mathScore?: number | string;
    scienceScore?: number | string;
    musicScore?: number | string; // Added from page 13 table
    disciplinaryActions?: number;
    suspensions?: number;
    riskScore?: number;
    suggestedIntervention?: string;
    teacherName?: string;
    gradeLevel?: string;
    subject?: string;
    avatar?: string;
    riskLevel?: string;
    riskFactors?: string[];
    currentGPA?: number;
    attendance?: string | number;
}

export interface RiskDistributionData {
    distribution: ScoreDistribution[]; // Reuse ScoreDistribution { level: 'High Risk', percentage: 10, color: 'red' }
}

export interface AtRiskFilters {
    grade: string;
    class: string;
    riskLevel: string;
    searchStudent: string;
    searchTeacher: string;
}