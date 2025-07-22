import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { RootData, studentDetails, subjectoverview } from '../../../../models/predictionTool.model';
import { PerdictionService } from '../../../../services/prediction.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ClassAssessmentPredictionsHeadingComponent } from '../../../teachers/components/class-assessment-predictions-components/class-assessment-predictions-heading/class-assessment-predictions-heading.component';
import { ClassAssessmentPredictionsStudentTableComponent } from '../../../teachers/components/class-assessment-predictions-components/class-assessment-predictions-student-table/class-assessment-predictions-student-table.component';
import { ClassAssessmentPredictionsSubjectOverviewComponent } from '../../../teachers/components/class-assessment-predictions-components/class-assessment-predictions-subject-overview/class-assessment-predictions-subject-overview.component';
import { StudentDetail } from '../../../../models/student.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';







@Component({
  selector: 'app-prediction-tool-student-details-predict-class',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule,  SidebarComponent,HeaderComponent,ClassAssessmentPredictionsHeadingComponent,ClassAssessmentPredictionsStudentTableComponent,ClassAssessmentPredictionsSubjectOverviewComponent
     ],
  templateUrl: './class-assessment-predictions.component.html',
  styleUrls: ['./class-assessment-predictions.component.scss']
})
export class ClassAssessmentPredictionsComponent implements OnInit{
  title: string | undefined;
  count: number | undefined;
filteredStudents$: StudentDetail[] = [];
selectedScore = 'Score';
rootData: RootData | undefined;
  constructor(private router: Router, private route: ActivatedRoute,private dataService: PerdictionService) {}
   currentPage = 1;
    itemsPerPage = 5;
  student:studentDetails[] = [];
  allStudentDetails:studentDetails[]=[];
  subjectOverview:subjectoverview[]=[];
    onPageChange(page: number) {
      this.currentPage = page;
    }
  
    get totalPages() {
      return Math.ceil(this.student.length / this.itemsPerPage);
    }
   isLoading =true;
     ngOnInit(): void {
    // Check for state in history (used during page navigation)
    const state = window.history.state;

    if (state && state.title) {
      this.title = state.title;
      this.count = state.count;
      this.student = state.students || [];
      this.allStudentDetails = [...this.student];
    } else {
      // Fallback to current navigation state if no history state
      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState) {
        this.title = navigationState['title'];
        this.count = navigationState['count'];
        this.student = navigationState['students'] || [];
        this.allStudentDetails = [...this.student];
      }
    }

    // Fetch subject overview data
    this.dataService.getSubjectOverview().subscribe({
      next: (data: subjectoverview[]) => {
        this.subjectOverview = data;
        this.isLoading = false;  // Stop loading when data is fetched
      },
      error: (err) => {
        console.error('Error fetching subject overview data', err);
        this.isLoading = false;  // Stop loading even if there's an error
      }
    });
  }

    // Sidebar menu items
   sidebarMenuItems: MenuItem[] = [
      { label: 'At Risk Students', icon: 'fa-solid fa-triangle-exclamation', route: '/teacher/at-risk' },
      { label: 'Interventions', icon: 'fa-solid fa-hands-holding-child', route: '/teacher/interventions' },
      { label: 'Behavior Assessment', icon: 'fa-solid fa-clipboard-check', route: '/teacher/behavior' },
      { label: 'IEP', icon: 'fa-solid fa-file-contract', route: '/teacher/iep' },
      { label: 'Academic Growth', icon: 'fa-solid fa-chart-line', route: '/teacher/growth' },
      { label: 'Prediction Tool', icon: 'fa-solid fa-lightbulb', route: '/teacher/predict' },
      { label: 'Course Proficiency', icon: 'fa-solid fa-graduation-cap', route: '/teacher/course-proficiency' },
      { label: 'State Assessment', icon: 'fa-solid fa-chart-bar', route: '/teacher/assessment/state' },
      { label: 'SAT/ACT', icon: 'fa-solid fa-chart-line', route: '/teacher/assessment/sat-act' },
      { label: 'Students Details Page', icon: 'fa-solid fa-school', route: '/teacher/students-details-page' }
    ];


  // Method to handle search query change
  onSearchQueryChange(searchQuery: string): void {
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      this.student = this.allStudentDetails.filter(student =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.studentId.toString().includes(searchQuery)
      );
    } else {
    
      this.student = [...this.allStudentDetails];
    }
  }


  // Method to handle score filter change
  onScoreFilterChange(threshold: string): void {
    if (!threshold) {
      this.student = [...this.allStudentDetails];
      return;
    }
  
    const score = parseInt(threshold, 10);
  
    this.student = this.allStudentDetails.filter(student => {
      const math = parseInt(student.math_prediction.replace('%', ''), 10);
      const ela = parseInt(student.ela_prediction.replace('%', ''), 10);
      return math >= score && ela >= score;
    });
  }
}