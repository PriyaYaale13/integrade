import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Observable, of, tap } from 'rxjs';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

// Shared
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { StateAssessmentChartComponent } from '../../../shared/components/charts/state-assessment-chart/state-assessment-chart.component'; // Reusing this for comparison charts
import { GroupByPipe } from '../../../shared/pipes/group-by.pipe';

// Services & Models
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../core/services/auth.service';
import { StudentDetail, StudentStateTestResult, AcademicScore } from '../../../models/student.model'; 
import { StateAssessmentPerformanceData } from '../../../models/dashboard.model'; 

interface AssessmentComparison extends StudentStateTestResult {
    performanceData?: StateAssessmentPerformanceData; // For chart reuse
}

@Component({
  selector: 'app-student-academic-detail',
  standalone: true,
  imports: [
    CommonModule, HeaderComponent, StateAssessmentChartComponent, GroupByPipe,
    MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatDividerModule
  ],
  templateUrl: './student-academic-detail.component.html',
  styleUrls: ['./student-academic-detail.component.scss']
})
export class StudentAcademicDetailComponent implements OnInit {
  location = inject(Location);
  authService = inject(AuthService);
  dataService = inject(DataService);

  studentDetail$: Observable<StudentDetail | null> = of(null);
  assessmentComparisons$: Observable<AssessmentComparison[]> = of([]);
  schoologyScores$: Observable<AcademicScore[]> = of([]); // Filtered for display

  schoologyDisplayedColumns: string[] = ['course', 'score']; // Simplified from page 21

  isLoading = true;
  error: string | null = null;
  studentName = '';

  ngOnInit(): void {
    const studentId = this.authService.getCurrentUser()?.userId; // Assuming student view

    if (!studentId) {
        this.error = "Could not identify student.";
        this.isLoading = false;
        return;
    }

    this.studentDetail$ = this.dataService.getStudentDetail(studentId).pipe(
      tap(detail => {
          this.isLoading = false;
          if (!detail || Object.keys(detail).length === 0) {
              this.error = "Could not load student data.";
          } else {
              this.studentName = `${detail.firstName} ${detail.lastName}`;
              this.assessmentComparisons$ = this.mapAssessmentsForComparison(detail.stateTestResults);
              this.schoologyScores$ = this.filterSchoologyScores(detail.academicScores);
          }
      })
      // Add error handling
    );
  }

  private mapAssessmentsForComparison(results: StudentStateTestResult[]): Observable<AssessmentComparison[]> {
      const mapped = results.map(r => ({
          ...r,
          performanceData: {
              subject: r.subject,
              stateAverage: r.targetScore ?? r.classAverage, // Use target score as state average
              classAverage: r.standardScore, // Display student score as the 'classAverage' on the chart for this view
              minScale: Math.min(0, r.standardScore - 30), // Adjust scale dynamically
              maxScale: Math.max(100, r.standardScore + 30) // Adjust scale dynamically
          } as StateAssessmentPerformanceData
      }));
      return of(mapped);
  }

  private filterSchoologyScores(scores: AcademicScore[]): Observable<AcademicScore[]> {
      // Page 21 only shows overall scores for Schoology section
      // Assuming 'overallScore' holds the relevant value
      const filtered = scores.map(s => ({ course: s.course, score: s.overallScore } as AcademicScore));
      return of(filtered);
  }

  goBack(): void {
    this.location.back();
  }
}
