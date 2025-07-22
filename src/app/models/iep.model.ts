export interface IepFilters {
    grade?: string;
    iepCategory?: string,
    progressStatus?: string;
    searchTeacher?: string;
    searchStudent?: string;
    searchTerm?: string;
}

export interface IepTeacherWithStudent {
    id: string;
    teacherName: string;
    studentName: string;
    gradeLevel: string;
    subject: string;
    avatar: string;
    category: string;
    progress: number;
    goalsMet: string;
    nextReview: string;
    status?: string;
}

export interface IepStudent {
    id: string;
    name: string;
    grade: string;
    avatar: string;
    category: string;
    progress: number;
    goalsMet: string;
    nextReview: string;
    status?: string;
}
