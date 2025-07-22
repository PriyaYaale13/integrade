// Represents detailed student information gathered from multiple screens
export interface StudentDemographics {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
  ethnicity?: string;
  schoolName?: string;
  gradeLevel?: string | number;
  busNumber?: string;
  imageUrl?: string;
}

export interface StudentIntervention {
  name: string;
  term: string;
  status: 'On Track' | 'Not On Track' | 'Completed';
  startScore?: number | string;
  goalScore?: number | string;
  currentScore?: number | string;
  details?: string;
}

export interface StudentAward {
  name: string;
  dateOrTerm: string;
}

export interface CafeteriaInfo {
  term: string;
  totalSpend?: number;
  balance?: number;
}

export interface AcademicScore {
  course: string;
  term1Score?: number | string | null;
  term2Score?: number | string | null;
  term3Score?: number | string | null;
  finalScore?: number | string | null;
  springScore?: number | string | null; 
  overallScore?: number | string | null; 
  proficiencyLevel?: number; // e.g., 1=Below Basic, 2=Basic, 3=Proficient for coloring
  proficiencyColor?: string; // Directly store color if easier
}

export interface StudentBehaviorKPIs {
    absentCount?: number;
    absentPercentage?: number;
    tardinessCount?: number;
    tardinessPercentage?: number;
    warningsCount?: number;
    disciplinaryActionsCount?: number;
    suspensionCount?: number;
    attendancePercentage?: number;
}

export interface StudentStateTestResult {
    source: 'State Test' | 'Clever' | 'Google Class'; 
    subject: 'ELA' | 'Math';
    term: string;
    standardScore: number;
    classAverage: number;
    targetScore?: number;
}

// Combined view for Student Detail page
export interface StudentDetail extends StudentDemographics, StudentBehaviorKPIs {
  interventions: StudentIntervention[];
  awards: StudentAward[];
  cafeteria?: CafeteriaInfo;
  academicScores: AcademicScore[];
  stateTestResults: StudentStateTestResult[];
  atRiskStatus?: boolean;
  iepStatus?: boolean;
  riskScore?: number; // Maybe from AtRisk data
}

// For the Parent/Student selection dropdown in header
export interface UserContext {
    userId: string;
    userName: string;
    role: 'Teacher' | 'Principal' | 'Parent' | 'Student' | 'Admin' | 'DistrictLeader' | 'ParentStudent';
    // For Parent, list of children; For Teacher/Principal, maybe current class/grade context
    children?: { id: string, name: string }[];
    selectedChildId?: string;
    profileImage?: string; // URL to the user's profile image
    parentId?: number; // For Parent role, to link to students
    studentId?: number; // For student id
    
}