export interface subjectSelector {
    grade: string;
    subject: string;
    riskLevel:string;
    timePeriod: string;
    }
    export interface StateStudentListTableComponent{
        student_id: number;
        name: string;
        grade: string;                                                                                  
        academy_id: number;
        riskLevel: string;
        riskFactors:string[],
        gpa: number;
        attendance: string;
        image: string;
    
    }
    export interface stateAtRiskCart{
        riskLevel: string;
        count: number;
        text: string;
        month: string;
    }

    export interface stateGrades{
        subject: string;
        period: string;
        grade: string;
        percentage: number;
        teacher: string;
        assignments: number;
        trend: string;
    }

    export interface StateBehaviors{
        id: number;
        name: string;
        Attendance: string;
        Absent_Days: number;
        Tardiness: number;
        Early_Dismissal: number;
        Actions: number;
        Suspensions: number;
        Intervention: string;
        At_Risk: string;
        IEP: string;
    }

    export interface stateNotes{
        id: number
    date: string;
    teacher:string;
    subject: string;
    content: string;
    type: string;
    isEditing?: boolean;
    }