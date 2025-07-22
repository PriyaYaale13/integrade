export interface Student {
    parent_id: number;
    parent_name: string;
    student_id: number;
    full_name: string;
    age_gender: string;
    ethnicity: string;
    grade: string;
    bus_no: string;
    teacher: string;
    room: string;
    address: string;
    Academy: string;
    image: string;
    selected?: boolean;
  }
  

  export interface StateStudentAcademicPerformance{
    subject: string;
    currentGrade: string;
    previousGrade: string;
    trend: string;
    proficiencyPercent: number;
    semester: string;
    year: string;
  }