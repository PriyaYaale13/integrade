export interface InterventionProgressRecord {
  id: string;
  studentName: string;
  teacherName?: string;
  semester: string; // e.g., 'Winter Semester'
  interventionType: 'Math' | 'Literacy' | 'Emotional Management' | 'Attendance';
  startValue?: number | string;
  currentValue?: number | string;
  status: 'On Track' | 'Not On Track';
  isWinter?: boolean;
  isFall?: boolean;
  isSpring?: boolean;
  startDate?: string | Date;
  duration?: string | number;
  grade?: string;
}

export interface InterventionSummaryData {
  interventionType: string;
  onTrackPercentage: number;
  notOnTrackPercentage: number;
}

export interface InterventionFilters {
  searchTeacher?: string;
  semester?: string;
  interventionType?: string;
  grade?: string;
  searchStudent?: string;
}

export interface InterventionTypeFilter {
  type?: string;
}

export interface InterventionStudent {
  studentName: string;
  studentId: string;
  grade: string;
  imageUrl: string;
  isActive: boolean;
  interventionTypes: InterventionType[];
}

export interface InterventionType {
  type: string;
  frequency: string;
  duration: string;
  focusAreas: string[];
  startDate: string;         // consider using `Date` if converting
  targetEndDate: string;
  nextReview: string;
  assessmentDue: string;
  targetScore: number;
  startScore: number;
  currentScore: number;
  supportTeam: SupportTeamMember[];
  progressNotes: ProgressNote[];
}

export interface SupportTeamMember {
  teacherName: string;
  department: string;
  teacherId: string;
  teacherImageUrl: string;
}

export interface ProgressNote {
  date: string;              // consider using `Date` if converting
  progressId: string;
  status: 'On Track' | 'Needs Support' | 'Critical';
  progressStatusMessages: string;
}
