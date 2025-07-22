export interface Class {
    id: string;
    teacherId: string;
    courseId: string;
    name: string;
    semester: string;
    year: string;
    students: string[]; // student IDs
    averageScore?: number;
  }