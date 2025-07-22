import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { AuthService } from '../core/services/auth.service'; // Inject AuthService if needed for context
import { AssessmentScoreRecord, StateAssessmentScoreDistributionData } from '../models/assessment.model';
import { BehaviorRecord } from '../models/behavior.model';
import { CourseBreakdown, CourseProficiencyData, CourseProficiencyResponse, HistoricalTrend, KpiData, ProficiencyDetail, ProficiencyOverview, RecentActivities, StateAssessmentPerformanceData, StudentProficiencyDetail, StudentScore, Teacher } from '../models/dashboard.model';
import { GrowthDataPoint, OverallAcademicRecord } from '../models/growth.models';
import { IepStudent, IepTeacherWithStudent } from '../models/iep.model';
import { InterventionProgressRecord, InterventionStudent, InterventionSummaryData } from '../models/intervention.model';
import { PredictionInputData, PredictionResultData, PredictionStudentSummary } from '../models/prediction.model';
import { AtRiskStudent, RiskDistributionData } from '../models/risk.models';
import { StudentDemographics, StudentDetail } from '../models/student.model';
import { StateBehaviors, StateStudentListTableComponent, stateAtRiskCart, stateGrades, stateNotes } from '../models/subject-selector.model';
@Injectable({
    providedIn: 'root'
})
export class DataService {

    // Inject AuthService if data needs to be scoped by user/role/selectedChild
    constructor(private authService: AuthService, private http: HttpClient) { }

    private simulateApi<T>(data: T): Observable<T> {
        return of(data).pipe(delay(Math.random() * 400 + 100)); // Simulate varied latency
    }

    // === Dashboard / Landing Page Data ===

    getCourseProficiency(filters?: { grade?: string, teacherId?: string, semester?: string }): Observable<CourseProficiencyData[]> {
        console.log('Filtering Proficiency:', filters);
        // Mock: Ignore filters for now, return static data
        const data: CourseProficiencyData[] = [
            { subject: 'ELA', proficient: 85, basic: 10, belowBasic: 5 },
            { subject: 'MATHS', proficient: 75, basic: 15, belowBasic: 10 },
            { subject: 'SCIENCE', proficient: 80, basic: 12, belowBasic: 8 },
            { subject: 'MUSIC', proficient: 92, basic: 5, belowBasic: 3 },
        ];
        return this.simulateApi(data);
    }

    getKpis(filters?: any): Observable<KpiData[]> {
        console.log('Filtering KPIs:', filters);
        // Mock data adjusted from various screens
        const data: KpiData[] = [
            { title: 'Absentees', value: 10, unit: '%', trend: 'down', styleClass: 'kpi-green', navigateTo: '/teacher/behavior' }, // Example navigation/styling
            { title: 'Tardiness', value: 20, unit: '%', styleClass: 'kpi-red', navigateTo: '/teacher/behavior' }, // Example Red KPI
            { title: 'Warnings', value: 20, unit: '%', navigateTo: '/teacher/behavior' },
            { title: 'Disciplinary Action', value: 10, unit: '%', styleClass: 'kpi-orange', navigateTo: '/teacher/behavior' },
            { title: 'Attendance', value: 90, unit: '%' },
            { title: 'No. on Intervention Program', value: 10, navigateTo: '/teacher/interventions' },
            { title: 'Class Avg. Math', value: 90 }, // Or fetch dynamically
            { title: 'Class Avg. ELA', value: 80 }, // Or fetch dynamically
            // KPIs from Page 26 - these seem like drilldowns, represent differently?
            //  { title: 'ELA Grade', value: 92, unit: '%' },
            //  { title: 'Math Grade', value: 89, unit: '%', styleClass: 'kpi-red'}, // Example red
            //  { title: 'Science Grade', value: 98, unit: '%' },
        ];
        return this.simulateApi(data);
    }

    getPrincipalKpis(filters?: any): Observable<KpiData[]> {
        console.log('Filtering KPIs:', filters);
        // Mock data adjusted from various screens
        const data: KpiData[] = [
            { title: 'Total Students', value: '1,247', male: '52%', female: '48%', progressValue: '0', navigateTo: '' }, // Example navigation/styling
            { title: 'Advanced Placement', value: '186', trend: 'up', unit: '%', navigateTo: '' }, // Example navigation/styling
            { title: 'College Acceptance', value: '92', trend: 'up', unit: '%', styleClass: 'kpi-green', navigateTo: '' },
            { title: 'Extracurricular', value: '78', trend: 'up', unit: '%', styleClass: 'kpi-orange', navigateTo: '' },
            { title: 'Attendance Rate', value: '98.8', trend: 'up', unit: '%', styleClass: 'kpi-green', navigateTo: '/principal/teacher-behavior' }, // Example Red KPI
            { title: 'Graduation Rate', value: '96.2', trend: 'up', unit: '%', styleClass: 'kpi-green', navigateTo: '/principal/teacher-directory' },
            { title: 'Teachers', value: '89', styleClass: 'kpi-orange', male: '45%', female: '55%', navigateTo: '/principal/teacher-directory' },
            { title: 'At-Risk', value: '86', unit: '%', navigateTo: '/principal/principal-at-risk' },
            { title: 'Warnings', value: '124', unit: '%', navigateTo: '/principal/teacher-behavior' },
            { title: 'Interventions', value: '93', unit: '%', navigateTo: '/principal/teacher-interventions' },
            { title: 'Disciplinary', value: '42', unit: '%', navigateTo: '/principal/teacher-behavior' },
            { title: 'Honor Roll', value: '428', trend: 'up', unit: '%', styleClass: 'kpi-green', navigateTo: '/principal/award-recognition' }
        ];
        return this.simulateApi(data);
    }

    getTeacherDirectoriesKpis(filters?: any): Observable<KpiData[]> {
        console.log('Filtering KPIs:', filters);
        // Mock data adjusted from various screens
        const data: KpiData[] = [
            { title: 'Total Teachers', value: '89', fullTime: '82', partTime: '7', navigateTo: '' }, // Example navigation/styling
            { title: 'Average Experience', value: '8.4', unit: 'yrs', range: '1-25 yrs', navigateTo: '' }, // Example Red KPI
            { title: 'Advanced Degrees', value: '76', unit: '%', master: '62', phd: '6', navigateTo: '' },
            { title: 'Certifications', value: '94', unit: '%', multiple: '45', single: '39', navigateTo: '' }
        ];
        return this.simulateApi(data);
    }

    getStudentBehaviorKpis(filters?: any): Observable<KpiData[]> {
        const data: KpiData[] = [
            { title: 'Total Students', value: '1,245', navigateTo: '' }, // Example navigation/styling
            { title: 'Attendance Rate', value: '94.5', unit: '%', navigateTo: '' }, // Example Red KPI
            { title: 'Tardiness', value: '156', unit: '%', navigateTo: '' },
            { title: 'Absent Days', value: '89', unit: '%', navigateTo: '' },
            { title: 'Early Dismissals', value: '42', unit: '%', navigateTo: '' },
            { title: 'Warnings', value: '28', unit: '%', navigateTo: '' }
        ];
        return this.simulateApi(data);
    }

    getStudentAtRiskKpis(filters?: any): Observable<KpiData[]> {
        const data: KpiData[] = [
            { title: 'Total Students', value: '85', navigateTo: '' },
            { title: 'High Risk', value: '95.5', unit: '%', navigateTo: '' }, // Example navigation/styling
            { title: 'Medium Risk', value: '56', unit: '%', navigateTo: '' }, // Example Red KPI
            { title: 'Low Risk', value: '23', unit: '%', navigateTo: '' },
        ];
        return this.simulateApi(data);
    }

    getTeachersIepKpis(filters?: any): Observable<KpiData[]> {
        const data: KpiData[] = [
            { title: 'Total Students', value: '485', navigateTo: '' }, // Example navigation/styling
            { title: 'On Track', value: '94.5', unit: '%', navigateTo: '' }, // Example Red KPI
            { title: 'Needs Support', value: '156', unit: '%', navigateTo: '' },
            { title: 'Critical', value: '89', unit: '%', navigateTo: '' },
        ];
        return this.simulateApi(data);
    }

    getStateAssessmentsPerformance(filters?: any): Observable<StateAssessmentPerformanceData[]> {
        console.log('Filtering State Assessment Perf:', filters);
        const data: StateAssessmentPerformanceData[] = [
            {
                subject: 'Mathematics',
                stateAverage: 78,
                classAverage: 85,
                minScale: 0,
                maxScale: 100,
                performanceLevels: {
                    belowBasic: 20,
                    basic: 30,
                    proficient: 30,
                    advanced: 20
                }
            },
            {
                subject: 'English Language Arts (ELA)',
                stateAverage: 75,
                classAverage: 82,
                minScale: 0,
                maxScale: 100,
                performanceLevels: {
                    belowBasic: 20,
                    basic: 30,
                    proficient: 30,
                    advanced: 20
                }
            }
        ];
        return this.simulateApi(data);
    }

    getProficiencyDetail(subject: string, level: string, filters?: any): Observable<ProficiencyDetail> {
        console.log(`Getting detail for ${subject} - ${level}`, filters);
        let students: StudentScore[] = [];
        // Mock based on Page 8/10 image (Music/Proficient)
        if (subject.toUpperCase() === 'MUSIC' && level === 'Proficient') {
            students = [
                { studentId: 'basset', studentName: 'Mike basset', semester1: 95, semester2: 94 },
                { studentId: 'bendel', studentName: 'Ade Bendel', semester1: 99, semester2: 95 },
                { studentId: 'sl', studentName: 'Sarah Lee', semester1: 92, semester2: 90 },
                { studentId: 'jd', studentName: 'John Doe', semester1: 96, semester2: 97 },
            ];
        } else { // Generic fallback
            students = [
                { studentId: 's1', studentName: `Stu A (${subject} ${level})`, semester1: 80, semester2: 85 },
                { studentId: 's2', studentName: `Stu B (${subject} ${level})`, semester1: 75, semester2: 78 },
            ];
        }
        const detail: ProficiencyDetail = { subject, level, students };
        return this.simulateApi(detail);
    }

    hasSignificantDrop(): Observable<boolean> {
        const dropDetected = Math.random() < 0.15; // 15% chance for demo
        return this.simulateApi(dropDetected);
    }

    // === Student Detail Data (Page 9, 20, 21) ===
    getStudentDetail(studentId: string): Observable<StudentDetail> {
        console.log(`Fetching detail for student: ${studentId}`);
        // Check context if parent/student is requesting
        const currentUser = this.authService.getCurrentUser();
        let effectiveStudentId = studentId;

        if (currentUser?.role === 'Student') {
            effectiveStudentId = currentUser.userId; // Student sees their own data
        } else if (currentUser?.role === 'Parent') {
            // Ensure parent is requesting one of their children
            if (!currentUser.children?.some(c => c.id === studentId)) {
                // Handle error - trying to access unauthorized child
                console.error("Parent trying to access unauthorized child data!");
                // In real app, throw error or return empty observable
                return of({} as StudentDetail); // Return empty for demo
            }
            effectiveStudentId = studentId; // Parent is authorized
        } else {
            effectiveStudentId = studentId; // Teacher/Principal requested specific ID
        }

        // MOCK: Return Mark Felton's data if ID matches 'mf1' (from login mock)
        if (effectiveStudentId === 'mf1') {
            const mockDetail: StudentDetail = {
                id: 'mf1',
                firstName: 'Mark',
                lastName: 'Felton',
                age: 5, gender: 'M', ethnicity: 'African American',
                schoolName: 'Providence Creek Academy', gradeLevel: '5th Grade', busNumber: '10',
                imageUrl: 'assets/mark-felton-placeholder.png',
                interventions: [
                    { name: 'Reading', term: 'winter 2024', status: 'Not On Track', startScore: 65, goalScore: 85, currentScore: 68 },
                    { name: 'Emotional Management', term: 'winter 2024', status: 'On Track', startScore: 3, currentScore: 0 }
                ],
                awards: [{ name: 'Citizenship', dateOrTerm: '2024' }, { name: 'Honor Role', dateOrTerm: '2024' }],
                cafeteria: { term: 'Winter 2024', totalSpend: 182, balance: 12 },
                academicScores: [ // Combine data from Page 9 & 20
                    { course: 'ELA', term1Score: 72, term2Score: 68, overallScore: 68, proficiencyColor: 'red' },
                    { course: 'Math', term1Score: 100, term2Score: 95, overallScore: 100, proficiencyColor: 'green' },
                    { course: 'Science', term1Score: 86, term2Score: 83, overallScore: 72, proficiencyColor: 'orange' },
                    { course: 'Music', term1Score: 100, term2Score: 100, overallScore: 86, proficiencyColor: 'green' },
                    { course: 'Social Studies', term1Score: 100, term2Score: 100, overallScore: 100, proficiencyColor: 'green' },
                    { course: 'Dance', term1Score: 100, term2Score: 100, overallScore: 96, proficiencyColor: 'green' },
                    { course: 'Art', term1Score: 96, term2Score: 92, overallScore: 86, proficiencyColor: 'green' },
                    { course: 'Computer', term1Score: 86, term2Score: 80, overallScore: 92, proficiencyColor: 'orange' },
                    { course: 'Physical', term1Score: 100, term2Score: 100, overallScore: 80, proficiencyColor: 'green' },
                ],
                stateTestResults: [ // Combine data from Page 9 & 21
                    { source: 'State Test', subject: 'ELA', term: 'Winter 2024', standardScore: 89, classAverage: 91, targetScore: 91 },
                    { source: 'State Test', subject: 'Math', term: 'Winter 2024', standardScore: 90, classAverage: 95, targetScore: 91 },
                    { source: 'Clever', subject: 'ELA', term: 'Winter 2024', standardScore: 75, classAverage: 85, targetScore: 91 },
                    { source: 'Clever', subject: 'Math', term: 'Winter 2024', standardScore: 85, classAverage: 90, targetScore: 91 },
                    { source: 'Google Class', subject: 'ELA', term: 'Winter 2024', standardScore: 75, classAverage: 91, targetScore: 91 }, // Class avg not shown, assumed same
                    { source: 'Google Class', subject: 'Math', term: 'Winter 2024', standardScore: 85, classAverage: 91, targetScore: 91 }, // Class avg not shown, assumed same
                ],
                // Behavior KPIs from Page 9 panel
                absentCount: 2, tardinessCount: 2, warningsCount: 0, disciplinaryActionsCount: 1, attendancePercentage: 90,
            };
            return this.simulateApi(mockDetail);
        } else {
            // MOCK: Return generic data for other IDs
            const genericDetail: StudentDetail = {
                id: studentId, firstName: 'Generic', lastName: 'Student', gradeLevel: '?', schoolName: '?',
                interventions: [], awards: [], academicScores: [], stateTestResults: [],
            };
            return this.simulateApi(genericDetail);
        }
    }

    // === At Risk Data (Page 13) ===
    getAtRiskStudents(filters?: any): Observable<AtRiskStudent[]> {
        console.log('Filtering At Risk:', filters);
        const data: AtRiskStudent[] = [
            { studentId: '1', studentName: 'Mathew Wang', absenteeism: 6, tardiness: '>4', elaScore: 65, mathScore: 75, musicScore: undefined, scienceScore: undefined, disciplinaryActions: 1, suspensions: 2, riskScore: 95, suggestedIntervention: 'Reading, Emo. Int' },
            { studentId: '2', studentName: 'Kris Tobin', absenteeism: undefined, tardiness: '>6', elaScore: undefined, mathScore: 65, musicScore: undefined, scienceScore: undefined, disciplinaryActions: 4, suspensions: 0, riskScore: 78, suggestedIntervention: undefined },
            { studentId: '3', studentName: 'James Kross', absenteeism: 10, tardiness: undefined, elaScore: 68, mathScore: undefined, musicScore: undefined, scienceScore: 60, disciplinaryActions: 1, suspensions: 1, riskScore: 85, suggestedIntervention: undefined },
            { studentId: '4', studentName: 'Maria Sanchez', absenteeism: 5, tardiness: undefined, elaScore: 68, mathScore: undefined, musicScore: 62, scienceScore: undefined, disciplinaryActions: 4, suspensions: 1, riskScore: 90, suggestedIntervention: undefined },
            { studentId: '5', studentName: 'Faith Amelia', absenteeism: undefined, tardiness: '>3', elaScore: 66, mathScore: undefined, musicScore: undefined, scienceScore: undefined, disciplinaryActions: 1, suspensions: 0, riskScore: 72, suggestedIntervention: undefined }
        ];
        return this.simulateApi(data);
    }
    getRiskDistribution(filters?: any): Observable<RiskDistributionData> {
        const data: RiskDistributionData = {
            distribution: [
                { level: 'Low Risk', percentage: 60, color: 'green' }, // Match colors if possible
                { level: 'Medium Risk', percentage: 30, color: 'orange' },
                { level: 'High Risk', percentage: 10, color: 'red' },
            ]
        };
        return this.simulateApi(data);
    }

    // === Intervention Data (Page 14) ===
    getInterventionProgress(filters?: any): Observable<InterventionProgressRecord[]> {
        const data: InterventionProgressRecord[] = [
            { id: '1', studentName: 'Mathew Wang', semester: 'Winter Semester', interventionType: 'Math', startValue: 75, currentValue: 77, status: 'Not On Track' },
            { id: '1', studentName: 'Mathew Wang', semester: 'Winter Semester', interventionType: 'Literacy', startValue: 65, currentValue: 89, status: 'On Track' },
            { id: '1', studentName: 'Mathew Wang', semester: 'Winter Semester', interventionType: 'Emotional Management', startValue: 3, currentValue: 0, status: 'On Track' },
            { id: '1', studentName: 'Mathew Wang', semester: 'Winter Semester', interventionType: 'Attendance', startValue: 6, currentValue: 3, status: 'Not On Track' },
            { id: '2', studentName: 'Kris Tobin', semester: 'Winter Semester', interventionType: 'Math', startValue: 60, currentValue: 70, status: 'On Track' },
            { id: '3', studentName: 'James Kross', semester: 'Winter Semester', interventionType: 'Literacy', startValue: 70, currentValue: 68, status: 'Not On Track' },
        ];
        return this.simulateApi(data);
    }

    getTeachersIntervenionProgress(filters?: any): Observable<InterventionProgressRecord[]> {
        console.log("target reached filters: ", filters);
        const teachersInterventionMock: InterventionProgressRecord[] = [
            { id: 's1000', teacherName: 'Emily Johnson', semester: 'Fall', interventionType: 'Math', startValue: 70, currentValue: 78, status: 'On Track', isWinter: false, isFall: true, isSpring: false, studentName: 'Sophia Williams', startDate: '2024-09-05', duration: 3, grade: '6th Grade' },
            { id: 's1001', teacherName: 'Michael Thompson', semester: 'Winter', interventionType: 'Literacy', startValue: 85, currentValue: 89, status: 'On Track', isWinter: true, isFall: false, isSpring: false, studentName: 'Liam Smith', startDate: '2025-01-10', duration: 1, grade: '7th Grade' },
            { id: 's1002', teacherName: 'Avery Martinez', semester: 'Spring', interventionType: 'Emotional Management', startValue: 3, currentValue: 2, status: 'On Track', isWinter: false, isFall: false, isSpring: true, studentName: 'Olivia Brown', startDate: '2025-03-05', duration: 1, grade: '8th Grade' },
            { id: 's1003', teacherName: 'Dr. Robert Clark', semester: 'Winter', interventionType: 'Attendance', startValue: 85, currentValue: 87, status: 'On Track', isWinter: true, isFall: false, isSpring: false, studentName: 'James Davis', startDate: '2025-01-10', duration: 2, grade: '9th Grade' },
            { id: 's1004', teacherName: 'Sarah Lee', semester: 'Winter', interventionType: 'Math', startValue: 68, currentValue: 75, status: 'On Track', isWinter: true, isFall: false, isSpring: false, studentName: 'Isabella Garcia', startDate: '2025-01-10', duration: 3, grade: '6th Grade' },
            { id: 's1005', teacherName: 'David Harris', semester: 'Spring', interventionType: 'Literacy', startValue: 88, currentValue: 91, status: 'On Track', isWinter: false, isFall: false, isSpring: true, studentName: 'Ethan Martin', startDate: '2025-03-05', duration: 2, grade: '7th Grade' },
            { id: 's1006', teacherName: 'Jessica Nguyen', semester: 'Spring', interventionType: 'Math', startValue: 77, currentValue: 80, status: 'On Track', isWinter: false, isFall: false, isSpring: true, studentName: 'Mia Thompson', startDate: '2025-03-05', duration: 4, grade: '8th Grade' },
            { id: 's1007', teacherName: 'Brian Walker', semester: 'Fall', interventionType: 'Attendance', startValue: 91, currentValue: 93, status: 'On Track', isWinter: false, isFall: true, isSpring: false, studentName: 'Benjamin Rodriguez', startDate: '2024-09-05', duration: 4, grade: '9th Grade' },
            { id: 's1008', teacherName: 'Lauren Adams', semester: 'Spring', interventionType: 'Emotional Management', startValue: 4, currentValue: 2, status: 'On Track', isWinter: false, isFall: false, isSpring: true, studentName: 'Charlotte Wilson', startDate: '2025-03-05', duration: 2, grade: '6th Grade' },
            { id: 's1009', teacherName: 'Christopher Brooks', semester: 'Fall', interventionType: 'Math', startValue: 90, currentValue: 95, status: 'On Track', isWinter: false, isFall: true, isSpring: false, studentName: 'Amelia Johnson', startDate: '2024-09-05', duration: 3, grade: '7th Grade' },
            { id: 's1010', teacherName: 'Olivia Carter', semester: 'Fall', interventionType: 'Attendance', startValue: 93, currentValue: 94, status: 'On Track', isWinter: false, isFall: true, isSpring: false, studentName: 'Lucas Lee', startDate: '2024-09-05', duration: 1, grade: '8th Grade' },
            { id: 's1011', teacherName: 'James Ramirez', semester: 'Spring', interventionType: 'Emotional Management', startValue: 2, currentValue: 3, status: 'Not On Track', isWinter: false, isFall: false, isSpring: true, studentName: 'Zoe Moore', startDate: '2025-03-05', duration: 1, grade: '9th Grade' },
            { id: 's1012', teacherName: 'Isabella Scott', semester: 'Winter', interventionType: 'Math', startValue: 65, currentValue: 70, status: 'On Track', isWinter: true, isFall: false, isSpring: false, studentName: 'Jackson Harris', startDate: '2025-01-10', duration: 4, grade: '6th Grade' },
            { id: 's1013', teacherName: 'Matthew Green', semester: 'Spring', interventionType: 'Literacy', startValue: 78, currentValue: 82, status: 'On Track', isWinter: false, isFall: false, isSpring: true, studentName: 'Harper Clark', startDate: '2025-03-05', duration: 2, grade: '7th Grade' },
            { id: 's1014', teacherName: 'Chloe Mitchell', semester: 'Fall', interventionType: 'Math', startValue: 85, currentValue: 88, status: 'On Track', isWinter: false, isFall: true, isSpring: false, studentName: 'Elijah Lee', startDate: '2024-09-05', duration: 3, grade: '8th Grade' }
        ];
        const gradeFilter = filters?.grade?.toLowerCase();
        const semesterFilter = filters?.semester?.toLowerCase();
        const interventionTypeFilter = filters?.interventionType?.toLowerCase();
        const searchTeacher = filters?.searchTeacher?.toLowerCase();
        const searchStudent = filters?.searchStudent?.toLowerCase();
        const filteredData = teachersInterventionMock.filter(record => {
            const matchesStudent = !searchStudent || record.studentName?.toLowerCase().includes(searchStudent);
            const matchesSemester = !semesterFilter || semesterFilter === 'all' || record.semester.toLowerCase() === semesterFilter;
            const matchesGrade = !gradeFilter || gradeFilter === 'all' || record.grade?.toLowerCase() === gradeFilter;
            const matchesInterventiontype = !interventionTypeFilter || interventionTypeFilter === 'all' || record.interventionType.toLocaleLowerCase() === interventionTypeFilter;
            const matchesSearch = !searchTeacher || record.teacherName?.toLowerCase().includes(searchTeacher);
            return matchesSemester && matchesSearch && matchesInterventiontype && matchesGrade && matchesStudent;
        });
        return this.simulateApi(filteredData);
    }

    getTeachersInterventionSummary(filters?: any): Observable<InterventionSummaryData[]> {
        const teachersInterventionSummary: InterventionSummaryData[] = [
            { interventionType: 'Maths intervention', onTrackPercentage: 83, notOnTrackPercentage: 17 },
            { interventionType: 'Literacy Intervention', onTrackPercentage: 75, notOnTrackPercentage: 25 },
            { interventionType: 'Emotional management', onTrackPercentage: 60, notOnTrackPercentage: 40 },
            { interventionType: 'Attendance', onTrackPercentage: 86, notOnTrackPercentage: 14 },
        ];
        return this.simulateApi(teachersInterventionSummary);
    }

    getInterventionSummary(filters?: any): Observable<InterventionSummaryData[]> {
        const data: InterventionSummaryData[] = [
            { interventionType: 'Maths intervention', onTrackPercentage: 80, notOnTrackPercentage: 20 },
            { interventionType: 'Literacy Intervention', onTrackPercentage: 70, notOnTrackPercentage: 30 },
            { interventionType: 'Emotional management', onTrackPercentage: 60, notOnTrackPercentage: 40 },
            { interventionType: 'Attendance', onTrackPercentage: 90, notOnTrackPercentage: 10 },
        ];
        return this.simulateApi(data);
    }

    // === Behavior Data (Page 15, 18) ===
    getBehaviorAssessments(filters?: { semester?: string, searchTerm?: string }): Observable<BehaviorRecord[]> {
        console.log('Filtering Behavior:', filters);
        // Simulate filtering based on semester if provided
        const term = filters?.semester?.toLowerCase() ?? 'winter'; // Default to winter
        const allData: BehaviorRecord[] = [
            // Data structure matches page 15/18 table cols
            { id: '1', name: 'Mathew Wang', semester: 'Winter', attendance: 94, absentDays: 6, tardinessCount: 5, earlyDismissalCount: 1, disciplinaryActions: 1, suspensionCount: 2, interventionCount: 2, atRiskStatus: 'Yes', iepStatus: 'No', isWinter: true, isFall: false, isSpring: false },
            { id: '1', name: 'Mathew Wang', semester: 'Fall', attendance: 96, absentDays: 4, tardinessCount: 2, earlyDismissalCount: 0, disciplinaryActions: 0, suspensionCount: 0, interventionCount: 6, atRiskStatus: 'No', iepStatus: 'No', isWinter: false, isFall: true, isSpring: false },
            { id: '2', name: 'Kris Tobin', semester: 'Winter', attendance: 92, absentDays: 8, tardinessCount: 7, earlyDismissalCount: 0, disciplinaryActions: 4, suspensionCount: 0, interventionCount: 8, atRiskStatus: 'Yes', iepStatus: 'Yes', isWinter: true, isFall: false, isSpring: false },
            { id: '2', name: 'Kris Tobin', semester: 'Fall', attendance: 95, absentDays: 5, tardinessCount: 3, earlyDismissalCount: 1, disciplinaryActions: 1, suspensionCount: 0, interventionCount: 9, atRiskStatus: 'Yes', iepStatus: 'Yes', isWinter: false, isFall: true, isSpring: false },
            { id: '3', name: 'James Kross', semester: 'Winter', attendance: 90, absentDays: 10, tardinessCount: 2, earlyDismissalCount: 3, disciplinaryActions: 1, suspensionCount: 1, interventionCount: 1, atRiskStatus: 'Yes', iepStatus: 'No', isWinter: true, isFall: false, isSpring: false },
        ];

        // Simple mock filter logic
        let filteredData = allData;
        if (term !== 'all') {
            filteredData = filteredData.filter(d => d.semester.toLowerCase() === term);
        }
        if (filters?.searchTerm) {
            const search = filters.searchTerm.toLowerCase();
            filteredData = filteredData.filter(d => d.name?.toLowerCase().includes(search));
        }

        return this.simulateApi(filteredData);
    }

    getTeachersBehaviorAssessments(filters?: { semester?: string, searchTerm?: string, grade?: string, class?: string }): Observable<BehaviorRecord[]> {
        const allData: BehaviorRecord[] = [
            { id: 't1', teacherName: 'Emily Johnson', studentName: 'Sophia Williams', gradeLevel: '6th Grade', semester: 'Fall', class: 'Room 1', interventionCount: 3, attendance: 95, absentDays: 2, tardinessCount: 2, earlyDismissalCount: 0, disciplinaryActions: 1, suspensionCount: 2, atRiskStatus: 2, iepStatus: 0, isWinter: false, isFall: true, isSpring: false, warnings: 1, status: 'Good' },
            { id: 't2', teacherName: 'Michael Thompson', studentName: 'Liam Smith', gradeLevel: '7th Grade', semester: 'Winter', class: 'Room 2', interventionCount: 0, attendance: 97, absentDays: 3, tardinessCount: 4, earlyDismissalCount: 2, disciplinaryActions: 0, suspensionCount: 0, atRiskStatus: 0, iepStatus: 0, isWinter: true, isFall: false, isSpring: false, warnings: 2, status: 'Excellent' },
            { id: 't3', teacherName: 'Avery Martinez', studentName: 'Olivia Brown', gradeLevel: '8th Grade', semester: 'Spring', class: 'Room 3', interventionCount: 2, attendance: 92, absentDays: 1, tardinessCount: 1, earlyDismissalCount: 0, disciplinaryActions: 1, suspensionCount: 1, atRiskStatus: 1, iepStatus: 0, isWinter: false, isFall: false, isSpring: true, warnings: 3, status: 'Average' },
            { id: 't4', teacherName: 'Dr. Robert Clark', studentName: 'James Davis', gradeLevel: '9th Grade', semester: 'Winter', class: 'Room 4', interventionCount: 4, attendance: 87, absentDays: 2, tardinessCount: 3, earlyDismissalCount: 1, disciplinaryActions: 3, suspensionCount: 1, atRiskStatus: 3, iepStatus: 2, isWinter: true, isFall: false, isSpring: false, warnings: 4, status: 'Poor' },
            { id: 't5', teacherName: 'Sarah Lee', studentName: 'Isabella Garcia', gradeLevel: '10th Grade', semester: 'Winter', class: 'Room 5', interventionCount: 0, attendance: 91, absentDays: 7, tardinessCount: 1, earlyDismissalCount: 1, disciplinaryActions: 0, suspensionCount: 0, atRiskStatus: 0, iepStatus: 0, isWinter: true, isFall: false, isSpring: false, warnings: 0, status: 'Excellent' },
            { id: 't6', teacherName: 'David Harris', studentName: 'Ethan Martin', gradeLevel: '11th Grade', semester: 'Spring', class: 'Room 1', interventionCount: 1, attendance: 95, absentDays: 1, tardinessCount: 4, earlyDismissalCount: 1, disciplinaryActions: 0, suspensionCount: 0, atRiskStatus: 1, iepStatus: 0, isWinter: false, isFall: false, isSpring: true, warnings: 2, status: 'Good' },
            { id: 't7', teacherName: 'Jessica Nguyen', studentName: 'Mia Thompson', gradeLevel: '12th Grade', semester: 'Spring', class: 'Room 2', interventionCount: 2, attendance: 97, absentDays: 4, tardinessCount: 7, earlyDismissalCount: 2, disciplinaryActions: 2, suspensionCount: 0, atRiskStatus: 3, iepStatus: 2, isWinter: false, isFall: false, isSpring: true, warnings: 3, status: 'Average' },
            { id: 't8', teacherName: 'Brian Walker', studentName: 'Benjamin Rodriguez', gradeLevel: '6th Grade', semester: 'Fall', class: 'Room 4', interventionCount: 3, attendance: 93, absentDays: 3, tardinessCount: 6, earlyDismissalCount: 1, disciplinaryActions: 1, suspensionCount: 0, atRiskStatus: 0, iepStatus: 0, isWinter: false, isFall: true, isSpring: false, warnings: 0, status: 'Good' },
            { id: 't9', teacherName: 'Lauren Adams', studentName: 'Charlotte Wilson', gradeLevel: '7th Grade', semester: 'Spring', class: 'Room 3', interventionCount: 5, attendance: 91, absentDays: 8, tardinessCount: 2, earlyDismissalCount: 0, disciplinaryActions: 2, suspensionCount: 1, atRiskStatus: 3, iepStatus: 2, isWinter: false, isFall: false, isSpring: true, warnings: 5, status: 'Poor' },
            { id: 't10', teacherName: 'Christopher Brooks', studentName: 'Amelia Johnson', gradeLevel: '8th Grade', semester: 'Fall', class: 'Room 5', interventionCount: 0, attendance: 95, absentDays: 4, tardinessCount: 9, earlyDismissalCount: 0, disciplinaryActions: 0, suspensionCount: 0, atRiskStatus: 0, iepStatus: 0, isWinter: false, isFall: true, isSpring: false, warnings: 1, status: 'Good' },
            { id: 't11', teacherName: 'Olivia Carter', studentName: 'Lucas Lee', gradeLevel: '9th Grade', semester: 'Fall', class: 'Room 1', interventionCount: 1, attendance: 94, absentDays: 2, tardinessCount: 1, earlyDismissalCount: 2, disciplinaryActions: 1, suspensionCount: 0, atRiskStatus: 0, iepStatus: 1, isWinter: false, isFall: true, isSpring: false, warnings: 2, status: 'Good' },
            { id: 't12', teacherName: 'James Ramirez', studentName: 'Zoe Moore', gradeLevel: '10th Grade', semester: 'Spring', class: 'Room 2', interventionCount: 4, attendance: 79, absentDays: 5, tardinessCount: 7, earlyDismissalCount: 0, disciplinaryActions: 3, suspensionCount: 1, atRiskStatus: 2, iepStatus: 0, isWinter: false, isFall: false, isSpring: true, warnings: 4, status: 'Poor' },
            { id: 't13', teacherName: 'Isabella Scott', studentName: 'Jackson Harris', gradeLevel: '11th Grade', semester: 'Winter', class: 'Room 4', interventionCount: 3, attendance: 81, absentDays: 7, tardinessCount: 5, earlyDismissalCount: 1, disciplinaryActions: 2, suspensionCount: 0, atRiskStatus: 3, iepStatus: 2, isWinter: true, isFall: false, isSpring: false, warnings: 3, status: 'Average' },
            { id: 't14', teacherName: 'Matthew Green', studentName: 'Harper Clark', gradeLevel: '12th Grade', semester: 'Spring', class: 'Room 3', interventionCount: 0, attendance: 82, absentDays: 3, tardinessCount: 1, earlyDismissalCount: 0, disciplinaryActions: 1, suspensionCount: 0, atRiskStatus: 1, iepStatus: 0, isWinter: false, isFall: false, isSpring: true, warnings: 1, status: 'Good' },
            { id: 't15', teacherName: 'Chloe Mitchell', studentName: 'Elijah Lee', gradeLevel: '6th Grade', semester: 'Fall', class: 'Room 5', interventionCount: 1, attendance: 97, absentDays: 7, tardinessCount: 7, earlyDismissalCount: 0, disciplinaryActions: 0, suspensionCount: 0, atRiskStatus: 0, iepStatus: 0, isWinter: false, isFall: true, isSpring: false, warnings: 2, status: 'Good' }
        ];
        const semesterFilter = filters?.semester?.toLowerCase();
        const gradeFilter = filters?.grade?.toLowerCase();
        const classFilter = filters?.class?.toLowerCase();
        const searchTerm = filters?.searchTerm?.toLowerCase();
        const filteredData = allData.filter(record => {
            const matchesSemester = !semesterFilter || semesterFilter === 'all' || record.semester.toLowerCase() === semesterFilter;
            const matchesGrade = !gradeFilter || gradeFilter === 'all' || record.gradeLevel?.toLowerCase() === gradeFilter;
            const matchesClass = !classFilter || classFilter === 'all' || record.class?.toLowerCase() === classFilter;
            const matchesSearch = !searchTerm || record.studentName?.toLowerCase().includes(searchTerm);
            return matchesSemester && matchesSearch && matchesGrade && matchesClass;
        });
        return this.simulateApi(filteredData);
    }

    // === Growth / Overall Academic Data (Page 16, 17) ===
    getOverallAcademicGrowth(filters?: any): Observable<GrowthDataPoint[]> {
        console.log('Filtering Growth:', filters);
        // Mock data based on Page 17 chart (approximated)
        const data: GrowthDataPoint[] = [
            { subject: 'ELA', fallScore: 76, winterScore: 85, summerScore: 88 },
            { subject: 'MATH', fallScore: 78, winterScore: 88, summerScore: 90 },
            { subject: 'SCIENCE', fallScore: 76, winterScore: 85, summerScore: 88 },
            { subject: 'MUSIC', fallScore: 85, winterScore: 90, summerScore: 98 },
            { subject: 'SOCIAL STUDIES', fallScore: 76, winterScore: 85, summerScore: 88 },
            { subject: 'DANCE', fallScore: 78, winterScore: 80, summerScore: 85 },
            { subject: 'ART', fallScore: 88, winterScore: 87, summerScore: 90 },
            { subject: 'COMPUTER', fallScore: 78, winterScore: 78, summerScore: 85 },
            { subject: 'PHYSICAL', fallScore: 100, winterScore: 100, summerScore: 100 },
            { subject: 'SPANISH', fallScore: 100, winterScore: 98, summerScore: 100 },
        ];
        // Calculate growth client-side for demo (better done backend)
        data.forEach(d => {
            if (d.fallScore != null && d.winterScore != null) d.fallToWinterGrowth = d.winterScore - d.fallScore;
            if (d.winterScore != null && d.summerScore != null) d.winterToSummerGrowth = d.summerScore - d.winterScore;
        });
        return this.simulateApi(data);
    }

    getOverallAcademicTable(filters?: any): Observable<OverallAcademicRecord[]> {
        console.log('Filtering Academic Table:', filters);
        // Mock data derived from Page 16 chart/structure
        const data: OverallAcademicRecord[] = [
            { studentId: '1', studentName: 'Mathew Wang', semester: 'Fall', scores: { ELA: 76, MATHS: 80, SCIENCE: 78, MUSIC: 88, SOCIAL_STUDIES: 80, DANCE: 78, ART: 88, COMPUTER: 80, PHYSICAL: 100, SPANISH: 100 } },
            { studentId: '1', studentName: 'Mathew Wang', semester: 'Winter', scores: { ELA: 80, MATHS: 88, SCIENCE: 85, MUSIC: 90, SOCIAL_STUDIES: 85, DANCE: 80, ART: 87, COMPUTER: 78, PHYSICAL: 100, SPANISH: 98 } },
            // Add Summer scores if needed from chart
            { studentId: '2', studentName: 'Kris Tobin', semester: 'Fall', scores: { ELA: 70, MATHS: 75, SCIENCE: 72, /* ... other scores */ } },
            { studentId: '2', studentName: 'Kris Tobin', semester: 'Winter', scores: { ELA: 75, MATHS: 80, SCIENCE: 78, /* ... other scores */ } },
            { studentId: '3', studentName: 'James Kross', semester: 'Fall', scores: { ELA: 65, MATHS: 70, SCIENCE: 68, /* ... other scores */ } },
            { studentId: '3', studentName: 'James Kross', semester: 'Winter', scores: { ELA: 70, MATHS: 75, SCIENCE: 72, /* ... other scores */ } },
        ];
        // Add filtering logic if needed
        return this.simulateApi(data);
    }

    getStudentInterventionById(id: string) {
        return this.http.get<InterventionStudent[]>('assets/data/students-intervention-details.json').pipe(
            delay(Math.random() * 400 + 100),
            map(students => students.find(student => student.studentId === id))
        );
    }

    // === Assessment Specific Views Data (Page 10, 11, 12) ===
    getSchoologyScores(filters?: any): Observable<AssessmentScoreRecord[]> {
        console.log('Filtering Schoology:', filters);
        const data: AssessmentScoreRecord[] = [
            // Data from Page 10 table
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'winter', subject: 'ELA', score: 85 },
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'winter', subject: 'MATHS', score: 98 },
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'winter', subject: 'SCIENCE', score: 100 },
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'winter', subject: 'MUSIC', score: 100 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'winter', subject: 'ELA', score: 98 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'winter', subject: 'MATHS', score: 95 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'winter', subject: 'SCIENCE', score: 88 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'winter', subject: 'MUSIC', score: 92 },
            { studentId: 'kross', studentName: 'James Kross', semester: 'winter', subject: 'ELA', score: 76 },
            { studentId: 'kross', studentName: 'James Kross', semester: 'winter', subject: 'MATHS', score: 87 },
            { studentId: 'kross', studentName: 'James Kross', semester: 'winter', subject: 'SCIENCE', score: 96 },
            { studentId: 'kross', studentName: 'James Kross', semester: 'winter', subject: 'MUSIC', score: 78 },
            // ... Add Kris Wagon, Faith Amelia
        ];
        return this.simulateApi(data);
    }

    getStateAssessmentViewData(filters?: any): Observable<{ scores: AssessmentScoreRecord[], distribution: StateAssessmentScoreDistributionData[] }> {
        console.log('Filtering State Assessment View:', filters);
        // Data for table on Page 11
        const scores: AssessmentScoreRecord[] = [
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'Fall', subject: 'ELA', score: 700, level: 4 }, // Assume level from score band
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'Fall', subject: 'MATHS', score: 580, level: 3 },
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'Winter', subject: 'ELA', score: 660, level: 4 },
            { studentId: 'basset', studentName: 'Mike Bassett', semester: 'Winter', subject: 'MATHS', score: 680, level: 4 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'Fall', subject: 'ELA', score: 720, level: 4 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'Fall', subject: 'MATHS', score: 660, level: 4 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'Winter', subject: 'ELA', score: 760, level: 4 },
            { studentId: 'doe', studentName: 'Jane Doe', semester: 'Winter', subject: 'MATHS', score: 740, level: 4 },
            { studentId: 'kross', studentName: 'James Kross', semester: 'winter', subject: 'ELA', score: 720, level: 4 },
            { studentId: 'kross', studentName: 'James Kross', semester: 'winter', subject: 'MATHS', score: 700, level: 4 },
            // ... Add Kris Wagon, Faith Amelia
        ];
        // Data for pie charts on Page 11
        const distribution: StateAssessmentScoreDistributionData[] = [
            {
                subject: 'ELA', semester: 'WINTER SEMESTER',
                stateAverageRange: [580, 640], classAverage: 680, // Approx from other charts
                distribution: [
                    { level: 'Below 400', percentage: 10, color: '#ff6384' },
                    { level: '401-500', percentage: 20, color: '#ff9f40' },
                    { level: '501-600', percentage: 40, color: '#ffcd56' }, // Matches pie chart visual
                    { level: 'Above 600', percentage: 30, color: '#4bc0c0' },
                ]
            },
            {
                subject: 'Math', semester: 'WINTER SEMESTER',
                stateAverageRange: [580, 640], classAverage: 710, // Approx from other charts
                distribution: [
                    { level: 'Below 400', percentage: 10, color: '#ff6384' },
                    { level: '401-500', percentage: 20, color: '#ff9f40' },
                    { level: '501-600', percentage: 40, color: '#ffcd56' },
                    { level: 'Above 600', percentage: 30, color: '#4bc0c0' },
                ]
            }
        ];
        return this.simulateApi({ scores, distribution });
    }

    getTeacherIepList(filters?: any): Observable<IepTeacherWithStudent[]> {
        const iepTeachersWithStudents: IepTeacherWithStudent[] = [
            { id: 't1', teacherName: 'Emily Johnson', studentName: 'Sophia Williams', gradeLevel: '6th Grade', subject: 'Math', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg', category: 'Learning Disability', progress: 80, goalsMet: '6/8', nextReview: 'Mar 15, 2025', status: 'On Track' },
            { id: 't2', teacherName: 'Michael Thompson', studentName: 'Liam Smith', gradeLevel: '7th Grade', subject: 'Science', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg', category: 'Speech/Language', progress: 45, goalsMet: '2/7', nextReview: 'Feb 28, 2025', status: 'Critical' },
            { id: 't3', teacherName: 'Avery Martinez', studentName: 'Olivia Brown', gradeLevel: '8th Grade', subject: 'History', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg', category: 'Physical Disability', progress: 65, goalsMet: '7/8', nextReview: 'Apr 10, 2025', status: 'Needs Support' },
            { id: 't4', teacherName: 'Dr. Robert Clark', studentName: 'James Davis', gradeLevel: '9th Grade', subject: 'English', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg', category: 'Other Health Impairment', progress: 82, goalsMet: '2/8', nextReview: 'Feb 5, 2025', status: 'On Track' },
            { id: 't5', teacherName: 'Sarah Lee', studentName: 'Isabella Garcia', gradeLevel: '10th Grade', subject: 'Art', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg', category: 'Learning Disability', progress: 70, goalsMet: '5/8', nextReview: 'Mar 20, 2025', status: 'Needs Support' },
            { id: 't6', teacherName: 'David Harris', studentName: 'Ethan Martin', gradeLevel: '11th Grade', subject: 'Math', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg', category: 'Learning Support', progress: 85, goalsMet: '12/15', nextReview: 'May 10, 2025', status: 'On Track' },
            { id: 't7', teacherName: 'Jessica Nguyen', studentName: 'Mia Thompson', gradeLevel: '12th Grade', subject: 'Science', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg', category: 'Speech/Language', progress: 42, goalsMet: '7/15', nextReview: 'Jun 5, 2025', status: 'Critical' },
            { id: 't8', teacherName: 'Brian Walker', studentName: 'Benjamin Rodriguez', gradeLevel: '6th Grade', subject: 'English', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg', category: 'Physical Disability', progress: 48, goalsMet: '9/16', nextReview: 'May 25, 2025', status: 'Critical' },
            { id: 't9', teacherName: 'Lauren Adams', studentName: 'Charlotte Wilson', gradeLevel: '7th Grade', subject: 'History', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg', category: 'Other Health Impairment', progress: 72, goalsMet: '6/14', nextReview: 'Apr 30, 2025', status: 'Needs Support' },
            { id: 't10', teacherName: 'Christopher Brooks', studentName: 'Amelia Johnson', gradeLevel: '8th Grade', subject: 'Art', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-10.jpg', category: 'Learning Disability', progress: 78, goalsMet: '10/14', nextReview: 'May 15, 2025', status: 'On Track' },
            { id: 't11', teacherName: 'Olivia Carter', studentName: 'Lucas Lee', gradeLevel: '9th Grade', subject: 'Math', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-11.jpg', category: 'Learning Disability', progress: 88, goalsMet: '11/13', nextReview: 'Jun 1, 2025', status: 'On Track' },
            { id: 't12', teacherName: 'James Ramirez', studentName: 'Zoe Moore', gradeLevel: '10th Grade', subject: 'Science', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-12.jpg', category: 'Speech/Language', progress: 60, goalsMet: '7/14', nextReview: 'May 18, 2025', status: 'Needs Support' },
            { id: 't13', teacherName: 'Isabella Scott', studentName: 'Jackson Harris', gradeLevel: '11th Grade', subject: 'English', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-13.jpg', category: 'Other Health Impairment', progress: 43, goalsMet: '5/12', nextReview: 'May 22, 2025', status: 'Critical' },
            { id: 't14', teacherName: 'Matthew Green', studentName: 'Harper Clark', gradeLevel: '12th Grade', subject: 'History', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-14.jpg', category: 'Physical Disability', progress: 40, goalsMet: '6/13', nextReview: 'Apr 29, 2025', status: 'Critical' },
            { id: 't15', teacherName: 'Chloe Mitchell', studentName: 'Elijah Lee', gradeLevel: '6th Grade', subject: 'Art', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-15.jpg', category: 'Learning Support', progress: 81, goalsMet: '9/12', nextReview: 'May 12, 2025', status: 'On Track' }
        ];
        const gradeFilter = filters?.grade?.toLowerCase();
        const categoryFilter = filters?.iepCategory?.toLowerCase();
        const statusFilter = filters?.progressStatus?.toLowerCase();
        const searchTeacher = filters?.searchTeacher?.toLowerCase();
        const searchStudent = filters?.searchStudent?.toLowerCase();
        const filteredData = iepTeachersWithStudents.filter(record => {
            const matchesGrade = !gradeFilter || gradeFilter === 'all' || record.gradeLevel.toLowerCase() === gradeFilter;
            const matchesCategory = !categoryFilter || categoryFilter === 'all' || record.category.toLocaleLowerCase() === categoryFilter;
            const matchesStatus = !statusFilter || statusFilter === 'all' || record.status?.toLocaleLowerCase() === statusFilter;
            const matchesStudent = !searchStudent || record.studentName.toLowerCase().includes(searchStudent);
            const matchesTeacher = !searchTeacher || record.teacherName.toLowerCase().includes(searchTeacher);
            return matchesGrade && matchesStudent && matchesTeacher && matchesCategory && matchesStatus;
        });
        return this.simulateApi(filteredData);
    }

    getStudentIepList(filters?: any): Observable<IepStudent[]> {
        return this.http.get<IepStudent[]>('assets/data/StudentsIepList.json').pipe(
            map(students => {
                return students.filter(record => {
                    const gradeFilter = filters?.grade?.toLowerCase();
                    const categoryFilter = filters?.iepCategory?.toLowerCase();
                    const searchTerm = filters?.searchTerm?.toLowerCase();
                    const statusFilter = filters?.progressStatus?.toLowerCase();

                    const matchesGrade = !gradeFilter || gradeFilter === 'all' || record?.grade?.toLowerCase() === gradeFilter;
                    const matchesCategory = !categoryFilter || categoryFilter === 'all' || record?.category?.toLowerCase() === categoryFilter;
                    const matchesStatus = !statusFilter || statusFilter === 'all' || record?.status?.toLowerCase() === statusFilter;
                    const matchesSearch = !searchTerm || record?.name?.toLowerCase().includes(searchTerm);

                    return matchesGrade && matchesCategory && matchesStatus && matchesSearch;
                });
            })
        );
    }

    getStudentsGrade(): Observable<string[]> {
        return of(['6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade']);
    }

    getStudentsIepCategoryList(): Observable<string[]> {
        return of(['Learning Disability', 'Speech/Language', 'Physical Disability', 'Learning Support', 'Other Health Impairment']);
    }
    getStudentsIepProgressStatus(): Observable<string[]> {
        return of(['On Track', 'Needs Support', 'Critical']);
    }

    getAtRiskStudentsList(filters?: any): Observable<AtRiskStudent[]> {
        const iepTeachersWithStudents: AtRiskStudent[] = [
            { studentId: '1', teacherName: 'Emily Johnson', studentName: 'Sophia Williams', gradeLevel: '6th Grade', subject: 'Room 1', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg', riskLevel: 'Medium Risk', riskFactors: ['Reading Difficulty'], currentGPA: 2.8, attendance: '92' },
            { studentId: '2', teacherName: 'Michael Thompson', studentName: 'Liam Smith', gradeLevel: '7th Grade', subject: 'Room 2', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg', riskLevel: 'High Risk', riskFactors: ['Speech Delay', 'Low Engagement'], currentGPA: 2.1, attendance: '85' },
            { studentId: '3', teacherName: 'Avery Martinez', studentName: 'Olivia Brown', gradeLevel: '8th Grade', subject: 'Room 3', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg', riskLevel: 'Low Risk', riskFactors: ['Motor Skill Limitations'], currentGPA: 3.6, attendance: '96' },
            { studentId: '4', teacherName: 'Dr. Robert Clark', studentName: 'James Davis', gradeLevel: '9th Grade', subject: 'Room 4', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg', riskLevel: 'Medium Risk', riskFactors: ['ADHD'], currentGPA: 2.5, attendance: '89' },
            { studentId: '5', teacherName: 'Sarah Lee', studentName: 'Isabella Garcia', gradeLevel: '10th Grade', subject: 'Room 5', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg', riskLevel: 'High Risk', riskFactors: ['Dyslexia'], currentGPA: 2.9, attendance: '91' },
            { studentId: '6', teacherName: 'David Harris', studentName: 'Ethan Martin', gradeLevel: '11th Grade', subject: 'Room 1', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg', riskLevel: 'Low Risk', riskFactors: ['Memory Retention Issues'], currentGPA: 3.4, attendance: '94' },
            { studentId: '7', teacherName: 'Jessica Nguyen', studentName: 'Mia Thompson', gradeLevel: '12th Grade', subject: 'Room 2', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg', riskLevel: 'High Risk', riskFactors: ['Speech Difficulty', 'Frequent Absences'], currentGPA: 2.0, attendance: '78' },
            { studentId: '8', teacherName: 'Brian Walker', studentName: 'Benjamin Rodriguez', gradeLevel: '6th Grade', subject: 'Room 4', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg', riskLevel: 'Medium Risk', riskFactors: ['Mobility Challenges'], currentGPA: 3.2, attendance: '95' },
            { studentId: '9', teacherName: 'Lauren Adams', studentName: 'Charlotte Wilson', gradeLevel: '7th Grade', subject: 'Room 3', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg', riskLevel: 'Medium Risk', riskFactors: ['Attention Issues'], currentGPA: 2.6, attendance: '88' },
            { studentId: '10', teacherName: 'Christopher Brooks', studentName: 'Amelia Johnson', gradeLevel: '8th Grade', subject: 'Room 5', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-10.jpg', riskLevel: 'Low Risk', riskFactors: ['Processing Delay'], currentGPA: 3.3, attendance: '97' },
            { studentId: '11', teacherName: 'Olivia Carter', studentName: 'Lucas Lee', gradeLevel: '9th Grade', subject: 'Room 1', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-11.jpg', riskLevel: 'Low Risk', riskFactors: ['Math Anxiety'], currentGPA: 3.7, attendance: '93' },
            { studentId: '12', teacherName: 'James Ramirez', studentName: 'Zoe Moore', gradeLevel: '10th Grade', subject: 'Room 2', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-12.jpg', riskLevel: 'Medium Risk', riskFactors: ['Speech Disorder'], currentGPA: 2.7, attendance: '87' },
            { studentId: '13', teacherName: 'Isabella Scott', studentName: 'Jackson Harris', gradeLevel: '11th Grade', subject: 'Room 4', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-13.jpg', riskLevel: 'Medium Risk', riskFactors: ['Chronic Illness'], currentGPA: 2.2, attendance: '82' },
            { studentId: '14', teacherName: 'Matthew Green', studentName: 'Harper Clark', gradeLevel: '12th Grade', subject: 'Room 3', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-14.jpg', riskLevel: 'High Risk', riskFactors: ['Physical Disability', 'Low GPA'], currentGPA: 1.9, attendance: '79' },
            { studentId: '15', teacherName: 'Chloe Mitchell', studentName: 'Elijah Lee', gradeLevel: '6th Grade', subject: 'Room 5', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-15.jpg', riskLevel: 'Low Risk', riskFactors: ['Mild Dyslexia'], currentGPA: 3.1, attendance: '90' }
        ];
        const gradeFilter = filters?.grade?.toLowerCase();
        const classFilter = filters?.class?.toLowerCase();
        const riskLevelFilter = filters?.riskLevel?.toLowerCase();
        const searchStudent = filters?.searchStudent?.toLowerCase();
        const filteredData = iepTeachersWithStudents.filter(record => {
            const matchesGrade = !gradeFilter || gradeFilter === 'all' || record.gradeLevel?.toLowerCase() === gradeFilter;
            const matchesCategory = !classFilter || classFilter === 'all' || record.subject?.toLocaleLowerCase() === classFilter;
            const matchesRiskLevels = !riskLevelFilter || riskLevelFilter === 'all' || record.riskLevel?.toLocaleLowerCase() === riskLevelFilter;
            const matchesSearch = !searchStudent || record.studentName?.toLowerCase().includes(searchStudent);
            return matchesGrade && matchesSearch && matchesCategory && matchesRiskLevels;
        });
        return this.simulateApi(filteredData);
    }

    getSatActViewData(filters?: any): Observable<{ scores: AssessmentScoreRecord[], distribution: StateAssessmentScoreDistributionData[] }> {
        // Data for table on Page 12
        const scores: AssessmentScoreRecord[] = [
            { studentId: '1', studentName: 'Sophia Williams', semester: 'Fall', subject: 'ELA', mathScore: 670, verbalScore: 690, level: 4, grade: '6th Grade', status: 'Good' },
            { studentId: '2', studentName: 'Liam Smith', semester: 'Fall', subject: 'MATHS', mathScore: 560, verbalScore: 570, level: 3, grade: '7th Grade', status: 'Average' },
            { studentId: '3', studentName: 'Olivia Brown', semester: 'Winter', subject: 'ELA', mathScore: 750, verbalScore: 740, level: 4, grade: '8th Grade', status: 'Excellent' },
            { studentId: '4', studentName: 'James Davis', semester: 'Winter', subject: 'MATHS', mathScore: 590, verbalScore: 605, level: 3, grade: '9th Grade', status: 'Average' },
            { studentId: '5', studentName: 'Isabella Garcia', semester: 'Fall', subject: 'ELA', mathScore: 520, verbalScore: 535, level: 3, grade: '10th Grade', status: 'Average' },
            { studentId: '6', studentName: 'Ethan Martin', semester: 'Fall', subject: 'MATHS', mathScore: 740, verbalScore: 710, level: 4, grade: '11th Grade', status: 'Excellent' },
            { studentId: '7', studentName: 'Mia Thompson', semester: 'Winter', subject: 'ELA', mathScore: 580, verbalScore: 600, level: 3, grade: '12th Grade', status: 'Average' },
            { studentId: '8', studentName: 'Benjamin Rodriguez', semester: 'Fall', subject: 'MATHS', mathScore: 695, verbalScore: 670, level: 4, grade: '6th Grade', status: 'Good' },
            { studentId: '9', studentName: 'Charlotte Wilson', semester: 'Winter', subject: 'ELA', mathScore: 660, verbalScore: 685, level: 4, grade: '7th Grade', status: 'Good' },
            { studentId: '10', studentName: 'Amelia Johnson', semester: 'Winter', subject: 'MATHS', mathScore: 710, verbalScore: 735, level: 4, grade: '8th Grade', status: 'Excellent' },
            { studentId: '11', studentName: 'Lucas Lee', semester: 'Fall', subject: 'ELA', mathScore: 680, verbalScore: 690, level: 4, grade: '9th Grade', status: 'Good' },
            { studentId: '12', studentName: 'Zoe Moore', semester: 'Winter', subject: 'MATHS', mathScore: 590, verbalScore: 580, level: 3, grade: '10th Grade', status: 'Average' },
            { studentId: '13', studentName: 'Jackson Harris', semester: 'Fall', subject: 'ELA', mathScore: 510, verbalScore: 520, level: 3, grade: '11th Grade', status: 'Average' },
            { studentId: '14', studentName: 'Harper Clark', semester: 'Winter', subject: 'MATHS', mathScore: 460, verbalScore: 470, level: 2, grade: '12th Grade', status: 'Poor' },
            { studentId: '15', studentName: 'Elijah Lee', semester: 'Fall', subject: 'ELA', mathScore: 720, verbalScore: 740, level: 4, grade: '6th Grade', status: 'Excellent' }
        ];
        // Data for charts on Page 12
        const distribution: StateAssessmentScoreDistributionData[] = [
            {
                subject: 'Verbal', semester: '', overallPercentile: 92, // from chart
                stateAverageRange: [580, 640], // Use same range as state test? Adjust if different scale
                classAverage: 700, // Approx
                distribution: [ // Same distribution as state test for visual consistency
                    { level: 'Below 400', percentage: 10, color: '#ff6384' }, { level: '401-500', percentage: 20, color: '#ff9f40' },
                    { level: '501-600', percentage: 40, color: '#ffcd56' }, { level: 'Above 600', percentage: 30, color: '#4bc0c0' },
                ]
            },
            {
                subject: 'Math', semester: 'Winter', overallPercentile: 88, // from chart
                stateAverageRange: [580, 640], classAverage: 680, // Approx
                distribution: [
                    { level: 'Below 400', percentage: 10, color: '#ff6384' }, { level: '401-500', percentage: 20, color: '#ff9f40' },
                    { level: '501-600', percentage: 40, color: '#ffcd56' }, { level: 'Above 600', percentage: 30, color: '#4bc0c0' },
                ]
            }
        ];
        // Apply filtering
        const filterGrade = filters?.grade?.toLowerCase();
        const filterStudent = filters?.searchStudent?.toLowerCase();
        const filterSemester = filters?.semester?.toLowerCase();
        const filteredScores = scores.filter(score => {
            const gradeMatch = !filterGrade || filterGrade === 'all' || score.grade?.toLowerCase() === filterGrade;
            const semesterMatch = !filterSemester || filterSemester === 'all' || score.semester?.toLowerCase() === filterSemester;
            const matchesStudent = !filterStudent || score.studentName?.toLowerCase().includes(filterStudent);
            return gradeMatch && semesterMatch && matchesStudent;
        });
        return this.simulateApi({ scores: filteredScores, distribution });
    }

    // === Prediction Data (Page 19) ===
    getPredictionData(filters?: any): Observable<{ students: PredictionInputData[], selectedStudentSummary: PredictionStudentSummary | null }> {
        console.log('Filtering Prediction:', filters);
        // Base data before prediction
        const students: PredictionInputData[] = [
            { studentId: '1', studentName: 'Mathew Wang', slsELA: 8, slsMath: 9 },
            { studentId: '2', studentName: 'Kris Tobin', slsELA: 7, slsMath: 8 },
            { studentId: '3', studentName: 'James Kross', slsELA: 4, slsMath: 9 },
            { studentId: 'mf1', studentName: 'Mark Felton', slsELA: 5, slsMath: 9 },
        ];
        // Summary for the selected student card (Mark Felton)
        const selectedStudentSummary: PredictionStudentSummary = {
            studentId: 'mf1', studentName: 'Mark Felton',
            likelihoodScoreELA: 5, likelihoodScoreMath: 9,
            inhibitorsELA: ['Disciplinary Action', 'Incomplete assessment'],
            inhibitorsMath: []
        };
        return this.simulateApi({ students, selectedStudentSummary });
    }

    // Mock running the prediction - returns updated results
    runPrediction(students: PredictionInputData[]): Observable<PredictionResultData[]> {
        console.log("Running prediction...");
        const results: PredictionResultData[] = students.map(s => {
            // Mock prediction logic
            const likelihoodELA = Math.floor(Math.random() * 5) + s.slsELA - 2; // Randomness around SLS
            const likelihoodMath = Math.floor(Math.random() * 3) + s.slsMath - 1;
            let inhibitorsELA: string[] = [];
            let inhibitorsMath: string[] = [];
            if (s.studentId === '3' || s.studentId === 'mf1') { // From original table
                inhibitorsELA = ['D.A', 'I.A'];
            } else if (Math.random() < 0.2) {
                inhibitorsELA = ['Attendance'];
            }
            if (Math.random() < 0.1) {
                inhibitorsMath = ['Tardiness'];
            }

            return {
                ...s,
                inhibitorsELA,
                inhibitorsMath,
                likelihoodScoreELA: Math.max(1, Math.min(10, likelihoodELA)), // Clamp 1-10
                likelihoodScoreMath: Math.max(1, Math.min(10, likelihoodMath))
            };
        });
        return this.simulateApi(results);
    }

    // Example: Fetch list of teachers for selection
    getTeachersList(filters?: any): Observable<Teacher[]> {
        const mockTeachers: Teacher[] = [
            { id: 't1', name: 'Emily Johnson', department: 'Mathematics', gradeLevel: '6th Grade', experience: 9, studentsCount: 115, performance: '80', status: 'Active', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg' },
            { id: 't2', name: 'Michael Thompson', department: 'Science', gradeLevel: '7th Grade', experience: 6, studentsCount: 102, performance: '72', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133965.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't3', name: 'Avery Martinez', department: 'English', gradeLevel: '8th Grade', experience: 11, studentsCount: 128, performance: '80', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133907.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't4', name: 'Dr. Robert Clark', department: 'History', gradeLevel: '9th Grade', experience: 14, studentsCount: 90, performance: '92', status: 'Retired', image: 'https://img.freepik.com/free-photo/3d-rendering-cartoon-boy_23-2150797600.jpg?t=st=1744467485~exp=1744471085~hmac=5cd418e88f8b99a88bbd4ab8b89ed2342b6487c37e014b04ac7a2975064a2c5c&w=740' },
            { id: 't5', name: 'Sarah Lee', department: 'Visual Arts', gradeLevel: '6th Grade', experience: 4, studentsCount: 85, performance: '76', status: 'On Leave', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133992.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't6', name: 'David Harris', department: 'Physical Education', gradeLevel: '7th Grade', experience: 7, studentsCount: 140, performance: '95', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133997.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't7', name: 'Jessica Nguyen', department: 'Science', gradeLevel: '8th Grade', experience: 5, studentsCount: 110, performance: '91', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133876.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't8', name: 'Brian Walker', department: 'Computer Science', gradeLevel: '9th Grade', experience: 10, studentsCount: 95, performance: '94', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134012.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't9', name: 'Lauren Adams', department: 'Mathematics', gradeLevel: '7th Grade', experience: 3, studentsCount: 105, performance: '69', status: 'On Leave', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133992.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't10', name: 'Christopher Brooks', department: 'Social Studies', gradeLevel: '6th Grade', experience: 8, studentsCount: 100, performance: '83', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134028.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740' },
            { id: 't11', name: 'Olivia Carter', department: 'English', gradeLevel: '8th Grade', experience: 12, studentsCount: 120, performance: '93', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134028.jpg' },
            { id: 't12', name: 'James Ramirez', department: 'Music', gradeLevel: '6th Grade', experience: 6, studentsCount: 70, performance: '77', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-asian-woman-cartoon-style_23-2151134050.jpg' },
            { id: 't13', name: 'Isabella Scott', department: 'Drama', gradeLevel: '7th Grade', experience: 9, studentsCount: 65, performance: '85', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134065.jpg' },
            { id: 't14', name: 'Matthew Green', department: 'Biology', gradeLevel: '9th Grade', experience: 11, studentsCount: 108, performance: '92', status: 'Retired', image: 'https://img.freepik.com/free-photo/portrait-woman-cartoon-style_23-2151134032.jpg' },
            { id: 't15', name: 'Chloe Mitchell', department: 'Geography', gradeLevel: '8th Grade', experience: 2, studentsCount: 98, performance: '95', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134025.jpg' }
        ];
        const filtered = mockTeachers.filter(teacher => {
            const matchesDepartment = !filters?.department || filters.department === 'all' || teacher.department === filters.department;
            const matchesStatus = !filters?.employmentStatus || filters.employmentStatus === 'all' || teacher.status === filters.employmentStatus;
            const matchesGrade = !filters?.grade || filters.grade === 'all' || teacher.gradeLevel === filters.grade;
            const searchTerm = filters?.searchTerm?.toLowerCase() || '';
            const matchesSearch = !searchTerm || teacher.name.toLowerCase().includes(searchTerm)
            return matchesDepartment && matchesStatus && matchesGrade && matchesSearch;
        });
        return this.simulateApi(filtered);
    }

    getPrincipalDashboardPageData(filters?: any): Observable<Teacher[]> {
        const academicYears = ['2024-2025 Academic Year', '2023-2024 Academic Year', '2022-2023 Academic Year', '2021-2022 Academic Year'];
        const mockTeachers: Teacher[] = [
            { id: 't1', name: 'Emily Johnson', ethnicity: 'White', department: 'Admissions and Marketing department', gradeLevel: '6th Grade', experience: 9, studentsCount: 115, performance: '80', status: 'Active', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg', academicYear: academicYears[0], isAdvancedPlacement: true, extraCurricular: true, attendance: 95, graduationRate: true, isRiskLevel: true, warnings: 5, intervention: true, disciplinary: false, honorRoll: true, isCollegeAcceptance: true },
            { id: 't2', name: 'Michael Thompson', ethnicity: 'African', department: 'Finance department', gradeLevel: '7th Grade', experience: 6, studentsCount: 102, performance: '72', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133965.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[1], isAdvancedPlacement: false, extraCurricular: false, attendance: 92, graduationRate: false, isRiskLevel: false, warnings: 2, intervention: false, disciplinary: true, honorRoll: false, isCollegeAcceptance: false },
            { id: 't3', name: 'Avery Martinez', ethnicity: 'Hispanic', department: 'Facilities department', gradeLevel: '8th Grade', experience: 11, studentsCount: 128, performance: '80', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133907.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[2], isAdvancedPlacement: false, extraCurricular: true, attendance: 89, graduationRate: false, isRiskLevel: true, warnings: 1, intervention: true, disciplinary: true, honorRoll: true, isCollegeAcceptance: true },
            { id: 't4', name: 'Dr. Robert Clark', ethnicity: 'White', department: 'Human Resources department', gradeLevel: '9th Grade', experience: 14, studentsCount: 90, performance: '92', status: 'Retired', image: 'https://img.freepik.com/free-photo/3d-rendering-cartoon-boy_23-2150797600.jpg?t=st=1744467485~exp=1744471085~hmac=5cd418e88f8b99a88bbd4ab8b89ed2342b6487c37e014b04ac7a2975064a2c5c&w=740', academicYear: academicYears[3], isAdvancedPlacement: true, extraCurricular: true, attendance: 67, graduationRate: true, isRiskLevel: true, warnings: 1, intervention: false, disciplinary: false, honorRoll: true, isCollegeAcceptance: true },
            { id: 't5', name: 'Sarah Lee', ethnicity: 'Asian', department: 'Office department', gradeLevel: '6th Grade', experience: 4, studentsCount: 85, performance: '76', status: 'On Leave', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133992.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[0], isAdvancedPlacement: true, extraCurricular: false, attendance: 75, graduationRate: false, isRiskLevel: false, warnings: 4, intervention: true, disciplinary: true, honorRoll: false, isCollegeAcceptance: true },
            { id: 't6', name: 'David Harris', ethnicity: 'African', department: 'ICT department', gradeLevel: '7th Grade', experience: 7, studentsCount: 140, performance: '95', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133997.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[1], isAdvancedPlacement: false, extraCurricular: true, attendance: 88, graduationRate: true, isRiskLevel: false, warnings: 0, intervention: true, disciplinary: false, honorRoll: true, isCollegeAcceptance: true },
            { id: 't7', name: 'Jessica Nguyen', ethnicity: 'Asian', department: 'Admissions and Marketing department', gradeLevel: '8th Grade', experience: 5, studentsCount: 110, performance: '91', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133876.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[2], isAdvancedPlacement: true, extraCurricular: true, attendance: 85, graduationRate: false, isRiskLevel: false, warnings: 3, intervention: false, disciplinary: true, honorRoll: false, isCollegeAcceptance: true },
            { id: 't8', name: 'Brian Walker', ethnicity: 'American', department: 'Finance department', gradeLevel: '9th Grade', experience: 10, studentsCount: 95, performance: '94', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134012.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[3], isAdvancedPlacement: false, extraCurricular: true, attendance: 97, graduationRate: true, isRiskLevel: false, warnings: 2, intervention: true, disciplinary: true, honorRoll: true, isCollegeAcceptance: true },
            { id: 't9', name: 'Lauren Adams', ethnicity: 'Hispanic', department: 'Facilities department', gradeLevel: '7th Grade', experience: 3, studentsCount: 105, performance: '69', status: 'On Leave', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133992.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[0], isAdvancedPlacement: true, extraCurricular: false, attendance: 100, graduationRate: true, isRiskLevel: true, warnings: 4, intervention: false, disciplinary: true, honorRoll: false, isCollegeAcceptance: false },
            { id: 't10', name: 'Christopher Brooks', ethnicity: 'White', department: 'Human Resources department', gradeLevel: '6th Grade', experience: 8, studentsCount: 100, performance: '83', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134028.jpg?uid=R190165207&ga=GA1.1.163343470.1740635341&w=740', academicYear: academicYears[1], isAdvancedPlacement: true, extraCurricular: true, attendance: 91, graduationRate: false, isRiskLevel: true, warnings: 1, intervention: true, disciplinary: false, honorRoll: true, isCollegeAcceptance: true },
            { id: 't11', name: 'Olivia Carter', ethnicity: 'African', department: 'ICT department', gradeLevel: '8th Grade', experience: 12, studentsCount: 120, performance: '93', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134028.jpg', academicYear: academicYears[2], isAdvancedPlacement: true, extraCurricular: false, attendance: 96, graduationRate: true, isRiskLevel: true, warnings: 3, intervention: true, disciplinary: true, honorRoll: false, isCollegeAcceptance: false },
            { id: 't12', name: 'James Ramirez', ethnicity: 'Hispanic', department: 'Admissions and Marketing department', gradeLevel: '6th Grade', experience: 6, studentsCount: 70, performance: '77', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-asian-woman-cartoon-style_23-2151134050.jpg', academicYear: academicYears[3], isAdvancedPlacement: false, extraCurricular: true, attendance: 74, graduationRate: false, isRiskLevel: false, warnings: 5, intervention: true, disciplinary: true, honorRoll: true, isCollegeAcceptance: true },
            { id: 't13', name: 'Isabella Scott', ethnicity: 'White', department: 'Finance department', gradeLevel: '7th Grade', experience: 9, studentsCount: 65, performance: '85', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134065.jpg', academicYear: academicYears[0], isAdvancedPlacement: false, extraCurricular: false, attendance: 66, graduationRate: true, isRiskLevel: true, warnings: 3, intervention: false, disciplinary: true, honorRoll: false, isCollegeAcceptance: true },
            { id: 't14', name: 'Matthew Green', ethnicity: 'Other', department: 'Facilities department', gradeLevel: '9th Grade', experience: 11, studentsCount: 108, performance: '92', status: 'Retired', image: 'https://img.freepik.com/free-photo/portrait-woman-cartoon-style_23-2151134032.jpg', academicYear: academicYears[1], isAdvancedPlacement: true, extraCurricular: true, attendance: 93, graduationRate: true, isRiskLevel: true, warnings: 1, intervention: true, disciplinary: false, honorRoll: true, isCollegeAcceptance: false },
            { id: 't15', name: 'Chloe Mitchell', ethnicity: 'American', department: 'Human Resources department', gradeLevel: '8th Grade', experience: 2, studentsCount: 98, performance: '95', status: 'Active', image: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151134025.jpg', academicYear: academicYears[2], isAdvancedPlacement: false, extraCurricular: true, attendance: 99, graduationRate: false, isRiskLevel: false, warnings: 0, intervention: true, disciplinary: true, honorRoll: true, isCollegeAcceptance: false }
        ];
        const filtered = mockTeachers.filter(teacher => {
            const matchesacademicYear = !filters?.academicYear || filters.academicYear === 'all' || teacher.academicYear === filters.academicYear;
            const matchesDepartment = !filters?.department || filters.department === 'all' || teacher.department === filters.department;
            const matchesStatus = !filters?.employmentStatus || filters.employmentStatus === 'all' || teacher.status === filters.employmentStatus;
            const matchesGrade = !filters?.grade || filters.grade === 'all' || teacher.gradeLevel === filters.grade;
            const matchesEthnicity = !filters?.ethnicity || filters.ethnicity === 'all' || teacher.ethnicity === filters.ethnicity;
            const searchTerm = filters?.searchTerm?.toLowerCase() || '';
            const matchesSearch = !searchTerm || teacher.name.toLowerCase().includes(searchTerm)
            return matchesDepartment && matchesStatus && matchesGrade && matchesSearch && matchesacademicYear && matchesEthnicity;
        });
        return this.simulateApi(filtered);
    }

    getRecentActivities(filter?: any): Observable<RecentActivities[]> {
        const mockRecentActivities: RecentActivities[] = [
            { icon: 'fa-solid fa-book text-[#4456b7]', iconColor: '#3F51B5', bgColor: '#E8EAF6', title: 'New Curriculum Update', subtitle: 'Science Department - Grade 10', time: '2 hours ago' },
            { icon: 'fa-solid fa-triangle-exclamation text-[#FF5722]', iconColor: '#FF9800', bgColor: '#FFF3E0', title: 'At-Risk Student Alert', subtitle: '3 new students added to watch list', time: '4 hours ago' },
            { icon: 'fa-solid fa-chart-bar text-[#4CAF50]', iconColor: '#4CAF50', bgColor: '#E8F5E9', title: 'Monthly Performance Report', subtitle: 'March 2025 report generated', time: 'Yesterday' },
            { icon: 'fa-solid fa-user-plus text-[#009688]', iconColor: '#009688', bgColor: '#E0F2F1', title: 'New Teacher Joined', subtitle: 'Mr. Singh - Math Department', time: '2 days ago' },
            { icon: 'fa-solid fa-calendar-check text-[#3F51B5]', iconColor: '#3F51B5', bgColor: '#E3F2FD', title: 'Upcoming Parent-Teacher Meet', subtitle: 'Scheduled for Friday, 3 PM', time: '3 days ago' },
            { icon: 'fa-solid fa-laptop text-[#9C27B0]', iconColor: '#9C27B0', bgColor: '#F3E5F5', title: 'Tech Workshop Completed', subtitle: 'Digital Literacy Training - Batch 2', time: 'Last week' },
            { icon: 'fa-solid fa-award text-[#FFC107]', iconColor: '#FFC107', bgColor: '#FFF8E1', title: 'Student Award Ceremony', subtitle: 'Top Performers of Q1', time: 'Last Monday' },
            { icon: 'fa-solid fa-bullhorn text-[#F44336]', iconColor: '#F44336', bgColor: '#FFEBEE', title: 'Urgent Announcement', subtitle: 'New COVID-19 safety protocols in effect', time: 'Last month' }
        ];
        return this.simulateApi(mockRecentActivities);
    }

    // Principal methods often reuse teacher methods but add scoping/filtering
    getPrincipalCourseProficiency(grade?: string, teacherId?: string): Observable<CourseProficiencyData[]> {
        // In real app, pass filters to backend
        // For mock, just log and return base data
        console.log(`PRINCIPAL: Fetching proficiency for Grade: ${grade}, Teacher: ${teacherId}`);
        return this.getCourseProficiency({ grade, teacherId });
    }
    // Add getPrincipalKpis, getPrincipalStateAssessmentsPerformance etc.


    // === Parent Data ===
    // Parent dashboard might need list of children if not in UserContext
    getParentChildren(parentId: string): Observable<StudentDemographics[]> {
        console.log(`Fetching children for parent: ${parentId}`);
        // Mock based on login context for 'pa1'
        if (parentId === 'pa1') {
            const children: StudentDemographics[] = [
                { id: 'mf1', firstName: 'Mark', lastName: 'Felton', gradeLevel: '5th Grade', schoolName: 'Providence Creek Academy' },
                { id: 'cf1', firstName: 'Christopher', lastName: 'Felton', gradeLevel: '3rd Grade', schoolName: 'Providence Creek Academy' },
            ];
            return this.simulateApi(children);
        }
        return of([]); // No children found for other mock parents
    }

    // === Utility / Lists ===
    getGradeLevels(): Observable<string[]> {
        return of(['Kindergarten', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
    }
    getSemesters(): Observable<string[]> {
        return of(['Fall', 'Winter', 'Spring', 'Full Year']);
    }
    getCourses(): Observable<string[]> {
        return of(['All', 'ELA', 'Maths', 'Science', 'Music', 'History', 'Art', 'Physical Ed']);
    }
    getPrograms(): Observable<string[]> {
        return of(['All', 'Gifted', 'Intervention', 'Standard', 'ESL']);
    }
    getAcademicYears(): Observable<string[]> {
        return of(['2024-2025 Academic Year', '2023-2024 Academic Year', '2022-2023 Academic Year', '2021-2022 Academic Year']);
    }
    getDepartments(): Observable<string[]> {
        return of(["Admissions and Marketing department",
            "Finance department",
            "Facilities department",
            "Human Resources department",
            "Office department",
            "ICT department"]);
    }
    getTeacherDepartments(): Observable<string[]> {
        return of(['Mathematics', 'Science', 'English', 'History', 'Visual Arts', 'Physical Education', 'Computer Science', 'Social Studies', 'Music', 'Drama', 'Biology', 'Geography']);
    }

    getTeacherGrade(): Observable<string[]> {
        return of(['6th Grade', '7th Grade', '8th Grade', '9th Grade']);
    }

    getEmploymentStatuses(): Observable<string[]> {
        return of(["Full-Time", "Part Time", "Contract"]);
    }

    getEthnicDiversities(): Observable<string[]> {
        return of(['Asian', 'Hispanic', 'White', 'African', 'American', 'Other']);
    }

    getClassList(): Observable<string[]> {
        return of(['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5',])
    }

    getTeachersIepProgressStatus(): Observable<string[]> {
        return of(['On Track', 'Needs Support', 'Critical'])
    }

    getTeacherIepCategoryList(): Observable<string[]> {
        return of(['Learning Disability', 'Speech/Language', 'Physical Disability', 'Other Health Impairment'])
    }

    getAlRiskLevelList(): Observable<string[]> {
        return of(['High Risk', 'Medium Risk', 'Low Risk'])
    }

    // === New Course Proficiency Dashboard Data ===
    getCourseProficiencyDashboard(filters?: any): Observable<CourseProficiencyResponse> {
        console.log('Fetching Course Proficiency Dashboard with filters:', filters);
        return this.http.get<CourseProficiencyResponse>('assets/data/course-proficiency.json').pipe(
            delay(Math.random() * 400 + 100) // Add delay to simulate API call
        );
    }

    getCourseProficiencyOverview(filters?: any): Observable<ProficiencyOverview> {
        return this.getCourseProficiencyDashboard(filters).pipe(
            map(response => response.proficiencyOverview)
        );
    }

    getCourseBreakdown(filters?: any): Observable<CourseBreakdown> {
        return this.getCourseProficiencyDashboard(filters).pipe(
            map(response => response.courseBreakdown)
        );
    }

    getHistoricalTrend(filters?: any): Observable<HistoricalTrend> {
        return this.getCourseProficiencyDashboard(filters).pipe(
            map(response => response.historicalTrend)
        );
    }

    getStudentProficiencyDetails(filters?: any): Observable<StudentProficiencyDetail[]> {
        console.log('Filtering Student Proficiency Details:', filters);
        return this.getCourseProficiencyDashboard(filters).pipe(
            map(response => {
                let students = response.studentDetails;

                // Apply filters if provided
                if (filters) {
                    if (filters.course && filters.course !== 'All') {
                        students = students.filter(student =>
                            student.course.toLowerCase() === filters.course.toLowerCase());
                    }

                    if (filters.proficiency && filters.proficiency.length > 0) {
                        students = students.filter(student =>
                            filters.proficiency.includes(student.proficiency));
                    }

                    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
                        const term = filters.searchTerm.toLowerCase().trim();
                        students = students.filter(student =>
                            student.name.toLowerCase().includes(term));
                    }
                }

                return students;
            })
        );
    }

    // Add the searchStudents method to the DataService
    // Since we don't have the full DataService file, let's add a minimal implementation

    /**
     * Searches for students by name or other criteria
     * @param query The search query string
     * @returns An Observable of StudentSearchResult objects
     */
    searchStudents(query: string): Observable<any[]> {
        // In a real app, this would make an HTTP request to the backend
        console.log('Searching for students with query:', query);

        // For now, return mock data based on the query
        return of([
            {
                id: '1',
                displayName: 'Mathew Wang',
                displayInfo: 'Grade 9 | Math, Literacy',
                image: 'assets/default-avatar.png'
            },
            {
                id: '2',
                displayName: 'Kris Tobin',
                displayInfo: 'Grade 10 | Math',
                image: 'assets/default-avatar.png'
            },
            {
                id: '3',
                displayName: 'James Kross',
                displayInfo: 'Grade 11 | Literacy',
                image: 'assets/default-avatar.png'
            }
        ].filter(student =>
            student.displayName.toLowerCase().includes(query.toLowerCase()) ||
            student.displayInfo.toLowerCase().includes(query.toLowerCase())
        )).pipe(delay(300)); // Add a delay to simulate network request
    }

    //at-risk-student.service.ts
    //for notes
    getNotes(): stateNotes[] {
        const notes = [
            {
                id: 1,
                date: '2025-04-15',
                teacher: 'Mrs. Anderson',
                subject: 'Algebra II',
                content: 'Sarah is struggling with quadratic equations. Recommended additional practice problems and tutoring sessions.',
                type: 'Academic'
            },
            {
                id: 2,
                date: '2025-04-16',
                teacher: 'Mr. Thompson',
                subject: 'English Literature',
                content: 'Sarah has shown improvement in her writing skills. Encouraged to participate in class discussions',
                type: 'Academic',
            }
        ]
        return notes;
    }
    getGrades(): stateGrades[] {
        const grades = [
            {
                subject: "Algebra II",
                period: "Period 1",
                grade: "D",
                percentage: 62,
                teacher: "Mrs. Anderson",
                assignments: 3,
                trend: "down"
            },
            {
                subject: "English Literature",
                period: "Period 2",
                grade: "C",
                percentage: 73,
                teacher: "Mr. Thompson",
                assignments: 2,
                trend: "up"
            },
        ];
        console.log('Grades:', grades); // Check the grades data
        return grades;
    }

    getBehaviors(): StateBehaviors[] {
        const behaviors = [
            {
                id: 1,
                name: 'Sarah Johnson',
                Attendance: '94%',
                Absent_Days: 2,
                Tardiness: 5,
                Early_Dismissal: 2,
                Actions: 5,
                Suspensions: 6,
                Intervention: "check_circle",
                At_Risk: "warning",
                IEP: "assignment_ind"
            }
            // },
            // {
            //   id: 2,
            //   name: 'Michael Chen',
            //   Attendance: '85%',
            //   Absent_Days: 5,
            //   Tardiness: 10,
            //   Early_Dismissal: 3,
            //   Actions: 7,
            //   Suspensions: 4,
            //   Intervention: "check_circle",
            //   At_Risk: "warning",
            //   IEP: "assignment_ind"
            // },
            // {
            //   id: 3,
            //   name: 'Emily Davis',
            //   Attendance: '92%',
            //   Absent_Days: 1,
            //   Tardiness: 3,
            //   Early_Dismissal: 1,
            //   Actions: 3,
            //   Suspensions: 2,
            //   Intervention: "check_circle",
            //   At_Risk: "warning",
            //   IEP: "assignment_ind"
            // }
        ];
        console.log('Behaviors:', behaviors); // Check the behaviors data
        return behaviors;
    }


    getStudentList(): Observable<StateStudentListTableComponent[]> {
        return of([
            {
                student_id: 1,
                academy_id: 2025001,
                name: 'Sarah Johnson',
                grade: 'Grade 10',
                riskLevel: 'High Risk',
                riskFactors: ['Low Attendance', 'Failed Math'],
                gpa: 1.8,
                attendance: '68%',
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
            },
            {
                student_id: 2,
                academy_id: 2025002,
                name: 'Michael Chen',
                grade: 'Grade 11',
                riskLevel: 'Medium Risk',
                riskFactors: ['Grade Drop'],
                gpa: 2.3,
                attendance: '85%',
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
            },
            {
                student_id: 3,
                academy_id: 2025003,
                name: 'Emily Davis',
                grade: 'Grade 9',
                riskLevel: 'Low Risk',
                riskFactors: ['Good Attendance'],
                gpa: 3.5,
                attendance: '95%',
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
            },

        ]);
    }
    //at_risk_components
    getData(): Observable<stateAtRiskCart[]> {
        return of([
            {
                riskLevel: 'High Risk',
                count: 24,
                text: "Students requiring immediate attention",
                month: "12% from last month"
            },
            {
                riskLevel: 'Medium Risk',
                count: 56,
                text: "Students needing monitoring",
                month: "Stable from last month"
            },
            {
                riskLevel: 'Low Risk',
                count: 128,
                text: "Students on watch",
                month: "8% from last month"
            },

        ])
    }

    calculateCategoryPercentages<T>(students: T[], field: keyof T, expectedValues: string[]): { [key: string]: number } {
        const total = students.length;
        const counts = expectedValues.reduce((acc, value) => {
            acc[value] = 0;
            return acc;
        }, {} as { [key: string]: number });
        students.forEach(student => {
            const value = student[field];
            if (typeof value === 'string' && counts.hasOwnProperty(value)) {
                counts[value]++;
            }
        });
        const percentages = Object.keys(counts).reduce((acc, key) => {
            acc[key] = total ? (counts[key] / total) * 100 : 0;
            return acc;
        }, {} as { [key: string]: number });
        return percentages;
    }

    calculateBooleanCategoryPercentage<T>(records: T[], field: keyof T, title: string): { [key: string]: number } {
        const total = records.length;
        const trueCount = records.filter(record => record[field] === true).length;
        return {
            [title]: total ? (trueCount / total) * 100 : 0
        };
    }

    calculateEntityPercentage<T>(records: T[], title: string): { [key: string]: number } {
        const total = records.length;
        return {
            [title]: total
        };
    }

    updateKpiData(kpis: KpiData[], records: any): KpiData[] {
        const statusKeys = ['On Track', 'Needs Support', 'Critical'];
        const riskLevelKeys = ['Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'];
        // Calculate percentage for each category (status, riskLevel, etc.)
        const statusPercentages = this.calculateCategoryPercentages(records, 'status', statusKeys);
        const riskLevelPercentages = this.calculateCategoryPercentages(records, 'riskLevel', riskLevelKeys);
        const apPercentages = this.calculateBooleanCategoryPercentage(records, 'isAdvancedPlacement', 'Advanced Placement');
        const extraCurricularPercentages = this.calculateBooleanCategoryPercentage(records, 'extraCurricular', 'Extracurricular');
        const graduationRatePercentages = this.calculateBooleanCategoryPercentage(records, 'graduationRate', 'Graduation Rate');
        const interventionPercentages = this.calculateBooleanCategoryPercentage(records, 'intervention', 'Interventions');
        const disciplinaryPercentages = this.calculateBooleanCategoryPercentage(records, 'disciplinary', 'Disciplinary');
        const honorRollPercentages = this.calculateBooleanCategoryPercentage(records, 'honorRoll', 'Honor Roll');
        const collegeAcceprancePercentages = this.calculateBooleanCategoryPercentage(records, 'isCollegeAcceptance', 'College Acceptance');
        const atRiskPercentages = this.calculateBooleanCategoryPercentage(records, 'isRiskLevel', 'At-Risk');
        const teacherNameCounts = this.calculateEntityPercentage(records, 'Teachers');
        const averageAttendance = this.calculateAverageAttendance(records, 'Attendance Rate');
        const averageTardiness = this.calculateAverageField(records, 'tardinessCount', 'Tardiness');
        const averageAbsentDays = this.calculateAverageField(records, 'absentDays', 'Absent Days');
        const averageEarlyDismissals = this.calculateAverageField(records, 'earlyDismissalCount', 'Early Dismissals');
        const averageWarnings = this.calculateAverageField(records, 'warnings', 'Warnings');
        // Update the KPIs based on the calculated percentages
        return kpis.map(kpi => {
            if (statusPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(statusPercentages[kpi.title]);
            } else if (riskLevelPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(riskLevelPercentages[kpi.title]);
            } else if (averageAttendance.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(averageAttendance[kpi.title]);
            } else if (apPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(apPercentages[kpi.title]);
            } else if (extraCurricularPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(extraCurricularPercentages[kpi.title]);
            } else if (graduationRatePercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(graduationRatePercentages[kpi.title]);
            } else if (interventionPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(interventionPercentages[kpi.title]);
            } else if (disciplinaryPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(disciplinaryPercentages[kpi.title]);
            } else if (honorRollPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(honorRollPercentages[kpi.title]);
            } else if (collegeAcceprancePercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(collegeAcceprancePercentages[kpi.title]);
            } else if (atRiskPercentages.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(atRiskPercentages[kpi.title]);
            } else if (teacherNameCounts.hasOwnProperty(kpi.title)) {
                kpi.value = teacherNameCounts[kpi.title];
            } else if (averageTardiness.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(averageTardiness[kpi.title]);
            } else if (averageAbsentDays.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(averageAbsentDays[kpi.title]);
            } else if (averageEarlyDismissals.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(averageEarlyDismissals[kpi.title]);
            } else if (averageWarnings.hasOwnProperty(kpi.title)) {
                kpi.value = this.formatPercentage(averageWarnings[kpi.title]);
            }
            return kpi;
        });
    }

    calculateAverageField<T>(records: T[], field: keyof T, title: string): { [key: string]: number } {
        const total = records.length;
        const sum = records.reduce((acc, record) => acc + (Number(record[field]) || 0), 0);
        const average = total ? sum / total : 0;
        return { [title]: average };
    }

    calculateAverageAttendance<T extends { attendance: number }>(records: T[], title: string): { [key: string]: number } {
        const total = records.length;
        const totalAttendance = records.reduce((sum, record) => sum + record.attendance, 0);
        const average = total ? totalAttendance / total : 0;
        return { [title]: average };
    }


    // Helper function to format percentages
    formatPercentage(value: number): string {
        return value % 1 === 0 ? `${value}` : value.toFixed(2); // Show whole number if no decimal, otherwise show 2 decimals
    }
}