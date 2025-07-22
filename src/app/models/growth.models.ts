export interface GrowthDataPoint {
    subject: string;
    fallScore?: number | null;
    winterScore?: number | null;
    summerScore?: number | null;
    fallToWinterGrowth?: number | null;
    winterToSummerGrowth?: number | null;
}

// For the table on page 16
export interface OverallAcademicRecord {
    studentId: string;
    studentName: string;
    semester: 'Fall' | 'Winter' | 'Spring'; // Or term
    scores: { [subject: string]: number | string | null }; // e.g., scores['ELA'] = 85
}