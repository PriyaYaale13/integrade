import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, switchMap, startWith, tap, combineLatest, map, of, catchError, Subscription } from 'rxjs';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Shared/App Specific
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ScoreBandPieChartComponent } from '../../../shared/components/charts/score-band-pie-chart/score-band-pie-chart.component'; // Import specific pie chart
import { StateAssessmentChartComponent } from '../../../shared/components/charts/state-assessment-chart/state-assessment-chart.component'; // For bar overview
import { DataService } from '../../../services/data.service';
import { AssessmentScoreRecord, StateAssessmentScoreDistributionData } from '../../../models/assessment.model';
import { StateAssessmentPerformanceData } from '../../../models/dashboard.model';


interface StateFilters {
    searchTerm?: string;
    semester?: string;
    gradeRange?: string; // Add grade range filter if needed
}

// Interface to extend AssessmentScoreRecord for grouped table data
interface GroupedStateScoreRecord {
    studentId: string;
    studentName: string;
    semester: string;
    ELA: number | null;
    MATHS: number | null;
    [key: string]: string | number | null; // For other subject types
}

// Extended distribution data with averageScore for display
interface ExtendedStateAssessmentDistribution extends StateAssessmentScoreDistributionData {
    averageScore: number;
}

@Component({
  selector: 'app-state-assessment-view',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent, ScoreBandPieChartComponent, StateAssessmentChartComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule
  ],
  templateUrl: './state-assessment-view.component.html',
  styleUrls: ['./state-assessment-view.component.scss']
})
export class StateAssessmentViewComponent implements OnInit, OnDestroy {
   location = inject(Location);
   dataService = inject(DataService);

   private filterSubject = new BehaviorSubject<StateFilters>({ semester: 'Winter' }); // Default from page 11
   filters$ = this.filterSubject.asObservable();
   
   private subscription: Subscription = new Subscription();

   assessmentData$!: Observable<{
       scores: GroupedStateScoreRecord[],
       distribution: ExtendedStateAssessmentDistribution[],
       performanceOverview: StateAssessmentPerformanceData[] // For top bars
   }>;

   // Add properties for the template to use
   assessmentScores: GroupedStateScoreRecord[] = [];
   assessmentDistribution: ExtendedStateAssessmentDistribution[] = [];
   performanceOverview: StateAssessmentPerformanceData[] = [];

   isLoading = true;
   error: string | null = null;
   currentFilters: StateFilters = { semester: 'Winter' };
   // Columns based on Page 11
   displayedColumns: string[] = ['select', 'studentName', 'semester', 'ELA', 'MATHS'];
   semesters$: Observable<string[]> = of(['Winter', 'Fall', 'Spring']); // Specific semester options
   gradeRanges$: Observable<string[]> = of(['All', 'K-2', '3-5', '6-8', '9-12']); // Example grade ranges

   ngOnInit(): void {
       this.loadData();
   }

   ngOnDestroy(): void {
       if (this.subscription) {
           this.subscription.unsubscribe();
       }
   }

   loadData(): void {
       this.isLoading = true;
       this.error = null;
       console.log('Starting to load state assessment data...');
       
       // Clear any existing subscriptions
       if (this.subscription) {
           this.subscription.unsubscribe();
       }
       this.subscription = new Subscription();
       
       // Get overview bars (could be filtered or static context)
       const performanceOverview$ = this.dataService.getStateAssessmentsPerformance().pipe(
         tap(data => console.log('Performance overview data loaded:', data)),
         catchError(error => {
           console.error('Error fetching state assessment performance overview:', error);
           this.error = 'Failed to load performance overview. Please try again.';
           this.isLoading = false;
           return of([]);
         })
       );

       this.assessmentData$ = this.filters$.pipe(
           startWith(this.currentFilters),
           tap(filters => console.log('Using filters:', filters)),
           switchMap(filters => {
             console.log('Fetching data with filters:', filters);
             return combineLatest({
               viewData: this.dataService.getStateAssessmentViewData(filters).pipe(
                 tap(data => console.log('View data loaded:', data)),
                 catchError(error => {
                   console.error('Error fetching state assessment view data:', error);
                   this.error = 'Failed to load state assessment view data. Please try again.';
                   this.isLoading = false;
                   return of({ scores: [], distribution: [] });
                 })
               ),
               performanceOverview: performanceOverview$
             }).pipe(
               catchError(error => {
                 console.error('Error in combineLatest:', error);
                 this.error = 'Failed to combine data streams. Please try again.';
                 this.isLoading = false;
                 return of({ viewData: { scores: [], distribution: [] }, performanceOverview: [] });
               })
             );
           }),
           // Group scores by student for table display and add average scores to distribution
           map(({ viewData, performanceOverview }) => {
             console.log('Transforming data...');
             try {
               const scores = this.groupStateScoresByStudent(viewData.scores);
               const distribution = this.addAverageScoreToDistribution(viewData.distribution);
               console.log('Data transformation complete:', { scores, distribution });
               return {
                 scores,
                 distribution,
                 performanceOverview
               };
             } catch (err) {
               console.error('Error during data transformation:', err);
               this.error = 'Error processing assessment data. Please try again.';
               this.isLoading = false;
               return { scores: [], distribution: [], performanceOverview: [] };
             }
           }),
           tap(() => {
               this.isLoading = false;
               console.log('State assessment data loaded, isLoading set to false');
           }),
           catchError(error => {
               this.isLoading = false;
               this.error = 'Failed to load state assessment data. Please try again.';
               console.error('Error in combined state assessment stream:', error);
               return of({ scores: [], distribution: [], performanceOverview: [] });
           })
       );
       
       // Subscribe to the observable to trigger data loading and store results in component properties
       this.subscription.add(
           this.assessmentData$.subscribe({
               next: (data) => {
                   console.log('Data subscription received:', data);
                   this.assessmentScores = data.scores || [];
                   this.assessmentDistribution = data.distribution || [];
                   this.performanceOverview = data.performanceOverview || [];
                   this.isLoading = false;
               },
               error: (err) => {
                   console.error('Error in data subscription:', err);
                   this.error = 'Failed to process assessment data. Please try again.';
                   this.isLoading = false;
               }
           })
       );
   }

    // Helper to add average scores for distribution charts
    private addAverageScoreToDistribution(distributions: StateAssessmentScoreDistributionData[]): ExtendedStateAssessmentDistribution[] {
        return distributions.map(dist => {
            // Calculate weighted average based on distribution percentages and midpoints of score bands
            // For demo purposes, we'll just assign a random value between 70-85
            const mockAverage = dist.classAverage || Math.floor(70 + Math.random() * 15);
            return {
                ...dist,
                averageScore: mockAverage
            };
        });
    }

    // Helper to group scores for the table (similar to Schoology view)
    private groupStateScoresByStudent(scores: AssessmentScoreRecord[]): GroupedStateScoreRecord[] {
        const grouped = scores.reduce((acc, score) => {
            const key = `${score.studentId}-${score.semester}`; // Group by student AND semester
            if (!acc[key]) {
                acc[key] = {
                    studentId: score.studentId,
                    studentName: score.studentName,
                    semester: score.semester,
                    ELA: null, 
                    MATHS: null // Initialize subjects
                };
            }
            // Convert score to number and assign to correct subject
            const scoreValue = typeof score.score === 'string' ? 
                                parseFloat(score.score) : 
                                (score.score as number | null);
                                
            if (score.subject === 'ELA') {
                acc[key].ELA = scoreValue;
            } else if (score.subject === 'MATHS' || score.subject === 'Math') {
                acc[key].MATHS = scoreValue;
            }
            return acc;
        }, {} as { [key: string]: GroupedStateScoreRecord });
        return Object.values(grouped);
    }

    applyFilters(): void {
        this.filterSubject.next({ ...this.currentFilters });
    }

    clearSearch(): void {
        this.currentFilters.searchTerm = '';
        this.applyFilters();
    }

    goBack(): void {
        this.location.back();
    }
}