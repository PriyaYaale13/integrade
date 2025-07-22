// Shared between different dashboards/views

export interface KpiData {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'none';
  unit?: string;
  male?: string | number;
  female?: string | number;
  fullTime?: string | number;
  partTime?: string | number;
  range?: string | number;
  master?: string | number;
  phd?: string | number;
  multiple?: string | number
  single?: string | number;
  progressValue?: string | number
  // Optional styling or navigation target
  styleClass?: string; // e.g., 'kpi-red-zone'
  navigateTo?: string;
}

export interface ExtendedKpiData extends KpiData {
  trendValue?: string;
  comparison?: string;
  icon?: string;
  iconClass?: string;
  progressValue?: number;
  progressBarClass?: string;
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  gradeLevel: string;
  experience: number; // in years
  studentsCount: number;
  performance: string;
  status: 'Active' | 'On Leave' | 'Retired';
  image: string;
  academicYear?: string;
  ethnicity?: string;
  isAdvancedPlacement?: string | boolean;
  graduationRate?: string | boolean;
  extraCurricular?: string | boolean;
  attendance?: string | number;
  isRiskLevel?: string | boolean;
  warnings?: string | number;
  honorRoll?: string | boolean;
  disciplinary?: string | boolean;
  intervention?: string | boolean;
  isCollegeAcceptance?: string | boolean;
}

export interface CourseProficiencyData {
  subject: 'ELA' | 'MATHS' | 'SCIENCE' | 'MUSIC' | string; // Allow other subjects
  proficient: number; // Percentage 0-100
  basic: number;      // Percentage 0-100
  belowBasic: number; // Percentage 0-100
}

// Used in proficiency drilldown initially
export interface StudentScore {
  studentId: string;
  studentName: string;
  semester1?: number | null;
  semester2?: number | null;
  semester3?: number | null;
}

export interface ProficiencyDetail {
  subject: string;
  level: 'Proficient' | 'Basic' | 'Below Basic' | string;
  students: StudentScore[];
}

// Updated: Represents data for the state assessment performance visualization
export interface StateAssessmentPerformanceData {
  subject: string;
  stateAverage: number; // State average percentage
  classAverage: number; // Class average percentage
  minScale: number;     // Usually 0
  maxScale: number;     // Usually 100
  performanceLevels?: {
    belowBasic: number;
    basic: number;
    proficient: number;
    advanced: number;
  };
}

// New interfaces for updated course proficiency dashboard

export interface ProficiencyLevel {
  percentage: number;
  students: number;
  color: string;
}

export interface ProficiencyOverview {
  advanced: ProficiencyLevel;
  proficient: ProficiencyLevel;
  basic: ProficiencyLevel;
  belowBasic: ProficiencyLevel;
}

export interface CourseBreakdownItem {
  name: string;
  advanced: number;
  proficient: number;
  basic: number;
  belowBasic: number;
}

export interface CourseBreakdown {
  [key: string]: CourseBreakdownItem;
}

export interface HistoricalPeriod {
  name: string;
  advanced: number;
  proficient: number;
  basic: number;
  belowBasic: number;
}

export interface HistoricalTrend {
  [key: string]: HistoricalPeriod;
}

export interface StudentProficiencyDetail {
  id: number;
  name: string;
  avatar: string;
  course: string;
  proficiency: 'Advanced' | 'Proficient' | 'Basic' | 'Below Basic';
  grade: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CourseProficiencyResponse {
  proficiencyOverview: ProficiencyOverview;
  courseBreakdown: CourseBreakdown;
  historicalTrend: HistoricalTrend;
  studentDetails: StudentProficiencyDetail[];
}

export interface RecentActivities {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  subtitle: string;
  time: string;
}