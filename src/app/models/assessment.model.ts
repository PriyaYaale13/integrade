// Used for tables on pages 10, 11, 12
export interface AssessmentScoreRecord {
  studentId: string;
  studentName: string;
  semester: string;
  subject: string; // ELA, MATHS, SCIENCE, MUSIC, VERBAL etc.
  score?: number | string | null;
  // Specific fields based on assessment type
  proficiency?: string; // Text like 'Proficient'
  percentile?: number;
  level?: number; // For coloring/grouping
  checked?: boolean; // For checkbox columns if needed
  grade?: string;
  status?: string;
  mathScore?: string | number;
  elaScore?: string | number;
  verbalScore?: string | number;
}

// For pie charts on page 11, 12
export interface ScoreDistribution {
  level: string; // e.g., 'Below 400', '401-500' or 'High Risk', 'Medium Risk'
  percentage: number;
  color: string;
}

export interface StateAssessmentScoreDistributionData {
  subject: 'ELA' | 'Math' | 'Verbal';
  semester: string;
  distribution: ScoreDistribution[];
  stateAverageRange?: [number, number]; // Optional depending on chart
  classAverage?: number; // Optional
  overallPercentile?: number; // For SAT/ACT page
}
