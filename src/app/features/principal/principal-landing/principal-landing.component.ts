import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Material Modules (similar to Teacher landing)
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

// Shared Components (reuse from teacher/shared)
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';

// Services and Models
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KpiData, ProficiencyDetail, RecentActivities, Teacher } from '../../../models/dashboard.model';
import { DistrictLeader } from '../../../models/district.leader.model';
import { Student } from '../../../models/student-details-page.model';
import { StudentDemographics } from '../../../models/student.model';
import { DataService } from '../../../services/data.service';
import { DistrictService } from '../../../services/district.service';
import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
// Principal specific filters
interface PrincipalFilters {
  grade: string;
  academicYear?: string;
  teacherId?: string; // ID of the selected teacher
  department?: string;
  course?: string;
  program?: string;
  searchStudent?: string;
  searchTeacher?: string;
  ethnicity?: string;
}

interface StudentWithDisplay extends Student {
  displayName: string;
  displayInfo: string;
}
@Component({
  selector: 'app-principal-landing',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, HeaderComponent, KpiCardComponent,
    MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatDividerModule, MatBadgeModule, MatTooltipModule, MatProgressSpinnerModule,
    SidebarComponent
  ],
  templateUrl: './principal-landing.component.html', // Will be very similar to teacher landing HTML
  styleUrls: ['./principal-landing.component.scss'] // Can reuse or adapt teacher landing SCSS
})
export class PrincipalLandingComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private router = inject(Router);
  private http = inject(HttpClient);

  // Filter Observables & State
  private filterSubject = new BehaviorSubject<PrincipalFilters>({
    grade: 'all',
    academicYear: '2024-2025 Academic Year', // Default from image
    teacherId: 'all', // Default to all teachers
    department: 'all',
    course: 'All',
    program: 'All',
    searchStudent: '',
    searchTeacher: '',
    ethnicity: 'all'
  });
  filters$ = this.filterSubject.asObservable();
  selectedEthinic = 'all';
  dashboardData$!: Observable<{
    kpis: KpiData[],
    recentActivities: RecentActivities[],
    records: Teacher[]
  }>;
  significantDrop$!: Observable<boolean>;
  proficiencyDetail$: Observable<ProficiencyDetail> | null = null;
  showProficiencyDetail = false;
  allEthnicityGroups = [
    { label: 'Asian', value: 28, color: '#3F51B5' },
    { label: 'Hispanic', value: 24, color: '#4CAF50' },
    { label: 'White', value: 22, color: '#FFC107' },
    { label: 'African', value: 18, color: '#F44336' },
    { label: 'American', value: 28, color: '#d0b3b3' },
    { label: 'Other', value: 8, color: '#BDBDBD' },
  ];
  ethnicityGroups = [...this.allEthnicityGroups];
  private subscriptionList = new Subscription();
  // Filter Options
  teachers$: Observable<{ id: string, name: string }[]> = this.dataService.getTeachersList(); // Fetch teachers
  teachersList$!: Observable<{ teachers: Teacher[] }>;
  studentList$!: Observable<{ students: StudentDemographics[] }>;
  departments$: Observable<string[]> = this.dataService.getDepartments();
  courses$: Observable<string[]> = this.dataService.getCourses();
  programs$: Observable<string[]> = this.dataService.getPrograms();
  grades$: Observable<string[]> = this.dataService.getTeacherGrade();
  academicYears$: Observable<string[]> = this.dataService.getAcademicYears();
  ethnicDiversity$: Observable<string[]> = this.dataService.getEthnicDiversities();
  hasNotification = false;
  viewAll: boolean = false;
  showSearchResults = false;
  currentFilters: PrincipalFilters = { academicYear: '2024-2025 Academic Year', grade: 'all', teacherId: 'all', ethnicity: 'all', department: 'all', course: 'All', program: 'All', searchStudent: '', searchTeacher: '' };
  // Search term handling with debounce
  private searchSubject = new Subject<string>();
  searchTeacherResults: Teacher[] = [];
  searchStudentsResults: StudentWithDisplay[] = [];
  students: Student[] = [];
  // Navigation menu items for sidebar
  sidebarMenuItems: MenuItem[] = [
    {
      label: 'At Risk',
      icon: 'fa-solid fa-triangle-exclamation',
      route: '/principal/principal-at-risk'
    },
    {
      label: 'Interventions',
      icon: 'fa-solid fa-hands-holding-child',
      route: '/principal/teacher-interventions'
    },
    {
      label: 'Behavior Assessment',
      icon: 'fa-solid fa-clipboard-check',
      route: '/principal/teacher-behavior'
    },
    {
      label: 'IEP',
      icon: 'fa-solid fa-file-contract',
      route: '/principal/teacher-iep'
    },
    {
      label: 'Academic Growth',
      icon: 'fa-solid fa-chart-line',
      route: '/teacher/growth'
    },
    {
      label: 'Prediction Tool',
      icon: 'fa-solid fa-lightbulb',
      route: '/teacher/predict'
    },
    {
      label: 'Course Proficiency',
      icon: 'fa-solid fa-graduation-cap',
      route: '/teacher/course-proficiency'
    },
    {
      label: 'State Assessment',
      icon: 'fa-solid fa-chart-bar',
      route: '/teacher/assessment/state'
    },
    {
      label: 'SAT/ACT',
      icon: 'fa-solid fa-chart-line',
      route: '/principal/teacher-sat-act'
    },
    {
      label: 'Students Details Page',
      icon: 'fa-solid fa-chalkboard-teacher',
      route: '/teacher/students-details-page/1',
    },
    {
      label: 'Awards & Recognition',
      icon: 'fa-solid fa-chalkboard-teacher',
      route: '/principal/award-recognition',
    }
  ];
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = +params.get('id')!;
      this.getStudentData();
    });
    this.setupSearchDebounce();
    this.significantDrop$ = this.dataService.hasSignificantDrop().pipe(
      tap(hasDrop => this.hasNotification = hasDrop)
    );
    // Fetch initial teacher list if needed, or fetch based on grade selection change
    this.teachers$ = this.filterSubject.pipe(
      map((filters: PrincipalFilters) => filters.grade),
      distinctUntilChanged(),
      switchMap((grade: string | undefined) => this.dataService.getTeachersList(grade))
    );
    this.searchTeacher();
    this.loadData();
    this.loadStudents()
  }

  loadStudents(): void {
    this.http.get<Student[]>('assets/data/students.json')
      .subscribe(students => {
        this.students = students;
      });
  }

  searchTeacher() {
    this.clearSearch('studentSearch');
    this.teachersList$ = this.filters$.pipe(startWith(this.currentFilters),
      switchMap(filters => {
        return combineLatest({
          teachers: this.dataService.getTeachersList(filters),
        });
      }), tap());
  }

  searchStudent() {
    if (!this.currentFilters.searchStudent || this.currentFilters.searchStudent.trim() === '') {
      this.searchStudentsResults = [];
      this.showSearchResults = false;
      return;
    }
    this.clearSearch('teacherSearch');
    const term = this.currentFilters.searchStudent.toLowerCase().trim();
    this.searchStudentsResults = this.students
      .filter(student =>
        student.full_name.toLowerCase().includes(term) ||
        student.teacher.toLowerCase().includes(term) ||
        student.Academy.toLowerCase().includes(term) ||
        student.grade.toLowerCase().includes(term) ||
        student.ethnicity.toLowerCase().includes(term)
      )
      .map(student => {
        // Create a displayable version of the student with additional properties
        return {
          ...student,
          displayName: student.full_name, // Use the actual student name
          displayInfo: `${student.age_gender}, ${student.grade}, ${student.Academy}`
        };
      });
    this.showSearchResults = this.searchStudentsResults.length > 0;
  }

  private setupSearchDebounce(): void {
    this.subscriptionList.add(
      this.searchSubject.pipe(
        debounceTime(400), // Wait for 400ms pause in typing
        distinctUntilChanged() // Only emit if value changed
      ).subscribe((searchTerm: any) => {
        this.currentFilters.searchTeacher = searchTerm;
        this.applyFilters();
      }));
  }
  studentId!: number;
  schoolName!: DistrictLeader;
  private data = inject(DistrictService);
  getStudentData(): void {
    this.data.getDistrictLeaders().subscribe((data: DistrictLeader[]) => {
      this.schoolName = data.find(s => s.id === this.studentId)!;
    });
  }
  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  loadData(): void {
    this.dashboardData$ = this.filters$.pipe(
      startWith(this.currentFilters),
      switchMap(filters => {
        // Use principal-specific methods or pass filters to general methods
        return combineLatest({
          // Note: Using general methods and just passing filters for mock
          kpis: this.dataService.getPrincipalKpis(filters),
          recentActivities: this.dataService.getRecentActivities(filters),
          records: this.dataService.getPrincipalDashboardPageData(filters)
        });
      }),
      tap((principalDasboard) => {
        this.showProficiencyDetail = false;
        this.proficiencyDetail$ = null;
        principalDasboard.kpis[0].value = principalDasboard.records.length.toString();
        principalDasboard.kpis = this.dataService.updateKpiData(principalDasboard.kpis, principalDasboard.records);
      }),
      catchError((error: any) => {
        return of({ kpis: [], recentActivities: [], records: [] });
      })


    );
  }

  applyFilters(): void {
    // Reset teacher if grade changes and selected teacher not in new list? (Add logic if needed)
    this.filterSubject.next({ ...this.currentFilters });
  }

  onProficiencyBarClick(details: { subject: string; level: string }): void {
    // Pass principal filters if backend needs them
    this.proficiencyDetail$ = this.dataService.getProficiencyDetail(details.subject, details.level, this.currentFilters);
    this.showProficiencyDetail = true;
  }

  onEthnicChange() {
    if (this.selectedEthinic === 'all') {
      this.ethnicityGroups = [...this.allEthnicityGroups];
    } else {
      this.ethnicityGroups = this.allEthnicityGroups.filter(
        (group) => group.label === this.selectedEthinic
      );
    }
    this.currentFilters.ethnicity = this.selectedEthinic;
    this.applyFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
  }

  toggleView(event: Event): void {
    event.preventDefault();
    this.viewAll = !this.viewAll;
  }

  navigateToStudentDetails(student: StudentWithDisplay): void {
    this.router.navigate(['/principal/students-details-page', student.student_id]);
  }

  navigateToTeacherDetails(): void {
    this.router.navigate(['/principal/teacher-directory']);
  }

  clearSearch(inputType: string): void {
    if (inputType === 'studentSearch') {
      this.currentFilters.searchStudent = '';
      this.searchStudentsResults = [];
    } else if (inputType === 'teacherSearch') {
      this.currentFilters.searchTeacher = '';
      this.searchTeacherResults = [];
    }
    this.searchSubject.next('');
    this.showSearchResults = false;
    this.applyFilters();
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }
}