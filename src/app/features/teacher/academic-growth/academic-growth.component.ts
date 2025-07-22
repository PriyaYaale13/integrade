import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, switchMap, startWith, tap, combineLatest, map, catchError, of } from 'rxjs';

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
import { StackedBarChartComponent } from '../../../shared/components/charts/stacked-bar-chart/stacked-bar-chart.component'; // Import Stacked Bar Chart
import { DataService } from '../../../services/data.service';
import { OverallAcademicRecord, GrowthDataPoint } from '../../../models/growth.models';

interface GrowthFilters {
    searchTerm?: string;
    semester?: 'All' | 'Fall' | 'Winter' | 'Spring'; // For table filtering
    // Add grade, subject filters if needed
}

interface GrowthData {
  tableRecords: OverallAcademicRecord[];
  chartData: GrowthDataPoint[];
}

@Component({
  selector: 'app-academic-growth',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent, StackedBarChartComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule
  ],
  templateUrl: './academic-growth.component.html',
  styleUrls: ['./academic-growth.component.scss']
})
export class AcademicGrowthComponent implements OnInit {
  location = inject(Location);
  dataService = inject(DataService);

  private filterSubject = new BehaviorSubject<GrowthFilters>({ semester: 'All' });
  filters$ = this.filterSubject.asObservable();

  growthData$!: Observable<{
      tableRecords: OverallAcademicRecord[],
      chartData: GrowthDataPoint[]
  }>;

  isLoading = true;
  error: string | null = null;
  currentFilters: GrowthFilters = { semester: 'All' };
  tableDisplayedColumns: string[] = ['select', 'studentName', 'semester', 'ELA', 'MATHS', 'SCIENCE', 'MUSIC', 'SOCIAL_STUDIES', 'DANCE', 'ART', 'COMPUTER', 'PHYSICAL', 'SPANISH', 'STATE_ELA', 'STATE_MATHS', 'SAT_VERBAL', 'SAT_MATHS']; // Based on page 16 table
  allSubjects = ['ELA', 'MATHS', 'SCIENCE', 'MUSIC', 'SOCIAL_STUDIES', 'DANCE', 'ART', 'COMPUTER', 'PHYSICAL', 'SPANISH', 'STATE_ELA', 'STATE_MATHS', 'SAT_VERBAL', 'SAT_MATHS']; // For dynamic columns

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
      this.isLoading = true;
      this.error = null;
      
      this.growthData$ = this.filters$.pipe(
          startWith(this.currentFilters),
          switchMap(filters => combineLatest({
              tableRecords: this.dataService.getOverallAcademicTable(filters).pipe(
                catchError(error => {
                  console.error('Error fetching academic table data:', error);
                  return of([]);
                })
              ),
              chartData: this.dataService.getOverallAcademicGrowth(filters).pipe(
                catchError(error => {
                  console.error('Error fetching growth chart data:', error);
                  return of([]);
                })
              )
          })),
          // Apply client-side filtering for semester on table data (or do backend)
          map((data: GrowthData) => ({
              ...data,
              tableRecords: this.currentFilters.semester === 'All'
                  ? data.tableRecords
                  : data.tableRecords.filter((r: OverallAcademicRecord) => r.semester === this.currentFilters.semester)
          })),
          tap(() => {
              this.isLoading = false;
              console.log('Academic growth data loaded, isLoading set to false');
          }),
          catchError(error => {
              this.isLoading = false;
              this.error = 'Failed to load academic growth data. Please try again.';
              console.error('Error in combined academic growth stream:', error);
              return of({ tableRecords: [], chartData: [] });
          })
      );
  }

  applyFilters(): void {
       this.filterSubject.next({ ...this.currentFilters });
  }

  clearSearch(): void {
        this.currentFilters.searchTerm = '';
        this.applyFilters();
   }

   getScore(record: OverallAcademicRecord, subjectKey: string): number | string | null {
        return record.scores[subjectKey] ?? '-';
   }

  goBack(): void {
    this.location.back();
  }
}