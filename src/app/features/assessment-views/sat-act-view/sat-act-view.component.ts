import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, switchMap, startWith, tap, combineLatest, map } from 'rxjs';

// Material & Shared Components (similar to State Assessment View)
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ScoreBandPieChartComponent } from '../../../shared/components/charts/score-band-pie-chart/score-band-pie-chart.component';
import { StateAssessmentChartComponent } from '../../../shared/components/charts/state-assessment-chart/state-assessment-chart.component';
import { DataService } from '../../../services/data.service';
import { AssessmentScoreRecord, StateAssessmentScoreDistributionData } from '../../../models/assessment.model';
import { StateAssessmentPerformanceData } from '../../../models/dashboard.model';
import { of } from 'rxjs';
interface SatActFilters {
    searchTerm?: string;
    semester?: string;
}

@Component({
  selector: 'app-sat-act-view',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent, ScoreBandPieChartComponent, StateAssessmentChartComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule
  ],
  templateUrl: './sat-act-view.component.html',
  styleUrls: ['./sat-act-view.component.scss'] // Can reuse state-assessment styles
})
export class SatActViewComponent implements OnInit {
   location = inject(Location);
   dataService = inject(DataService);

   private filterSubject = new BehaviorSubject<SatActFilters>({ semester: 'Winter' }); // Default from page 12
   filters$ = this.filterSubject.asObservable();

   assessmentData$!: Observable<{
       scores: AssessmentScoreRecord[], // Should include percentile here
       distribution: StateAssessmentScoreDistributionData[], // Pie charts with percentile text
       performanceOverview: StateAssessmentPerformanceData[] // Top bars
   }>;

   isLoading = true;
   currentFilters: SatActFilters = { semester: 'Winter' };
   // Columns based on Page 12
   displayedColumns: string[] = ['select', 'studentName', 'semester', 'VERBAL', 'MATHS']; // Use VERBAL/MATHS keys
   semesters$: Observable<string[]> = of(['Winter', 'Fall', 'Spring']);

   ngOnInit(): void {
       this.loadData();
   }

   loadData(): void {
       this.isLoading = true;
       // Get overview bars - adapt subjects if needed
       const performanceOverview$ = this.dataService.getStateAssessmentsPerformance().pipe(
            map(data => data.map(d => ({ ...d, subject: d.subject === 'ELA' ? 'Verbal' : 'Maths' })))
       );

       this.assessmentData$ = this.filters$.pipe(
           startWith(this.currentFilters),
           switchMap(filters => combineLatest({
               viewData: this.dataService.getSatActViewData(filters), // Gets scores & distribution
               performanceOverview: performanceOverview$
           })),
           map(({ viewData, performanceOverview }) => ({
                scores: this.groupSatScoresByStudent(viewData.scores),
                distribution: viewData.distribution,
                performanceOverview: performanceOverview
           })),
           tap(() => this.isLoading = false)
           // Add error handling
       );
   }

    // Helper to group scores for the table
   private groupSatScoresByStudent(scores: AssessmentScoreRecord[]): any[] {
         const grouped = scores.reduce((acc, score) => {
            const key = `${score.studentId}-${score.semester}`;
            if (!acc[key]) {
                acc[key] = { studentId: score.studentId, studentName: score.studentName, semester: score.semester, VERBAL: null, MATHS: null };
            }
             // Use uppercase subject keys consistent with displayedColumns
            if (score.subject.toUpperCase() === 'VERBAL' || score.subject.toUpperCase() === 'MATHS') {
                 acc[key][score.subject.toUpperCase() as 'VERBAL' | 'MATHS'] = score.score; // Maybe store score & percentile { score: 700, percentile: 92 }
            }
            return acc;
        }, {} as { [key: string]: any });
        return Object.values(grouped);
   }

   applyFilters(): void { this.filterSubject.next({ ...this.currentFilters }); }
   clearSearch(): void { this.currentFilters.searchTerm = ''; this.applyFilters(); }
   goBack(): void { this.location.back(); }
}
