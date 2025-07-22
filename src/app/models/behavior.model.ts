export interface BehaviorRecord {
  id: string;
  name?: string;
  semester: string; // e.g., 'Winter' or specific term filter
  attendance?: number; // percentage?
  absentDays?: number;
  tardinessCount?: number;
  earlyDismissalCount?: number;
  disciplinaryActions?: number;
  suspensionCount?: number;
  atRiskStatus?: string | number; // Map boolean
  iepStatus?: string | number; // Map boolean
  // Flags for multi-select / filtering in table?
  isWinter?: boolean;
  isFall?: boolean;
  class?: string;
  isSpring?: boolean;
  interventionCount?: string | number;
  studentName?: string;
  teacherName?: string;
  gradeLevel?: string;
  warnings?: string | number;
  status?: string
}

export interface BehaviorFilters {
  searchTerm?: string;
  semester?: string;
  interventionType?: string;
  grade?: string;
  class?: string;
}
