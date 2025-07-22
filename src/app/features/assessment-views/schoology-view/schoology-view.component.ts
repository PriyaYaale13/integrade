import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, switchMap, startWith, tap, of, map } from 'rxjs';

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
import { DataService } from '../../../services/data.service';
import { AssessmentScoreRecord } from '../../../models/assessment.model';

interface SchoologyFilters {
    searchTerm?: string;
    semester?: string;
}

@Component({
  selector: 'app-schoology-view',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatCheckboxModule
  ],
  templateUrl: './schoology-view.component.html',
  styleUrls: ['./schoology-view.component.scss']
})
export class SchoologyViewComponent implements OnInit {
  location = inject(Location);
  dataService = inject(DataService);

  private filterSubject = new BehaviorSubject<SchoologyFilters>({ semester: 'winter' }); // Default semester from page 10
  filters$ = this.filterSubject.asObservable();

  scores$!: Observable<AssessmentScoreRecord[]>;
  isLoading = true;
  currentFilters: SchoologyFilters = { semester: 'winter' };
  displayedColumns: string[] = ['select', 'studentName', 'semester', 'ELA', 'MATHS', 'SCIENCE', 'MUSIC']; // Match Page 10
  semesters$: Observable<string[]> = of(['winter', 'fall', 'spring']); // Simplified

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
      this.isLoading = true;
      this.scores$ = this.filters$.pipe(
          startWith(this.currentFilters),
          switchMap(filters => this.dataService.getSchoologyScores(filters)),
           // Simple client-side group by student for display, backend should ideally do this
          map(scores => this.groupScoresByStudent(scores)),
          tap(() => this.isLoading = false)
          // Add error handling
      );
  }

   // Helper to transform flat list into rows grouped by student for the table
  private groupScoresByStudent(scores: AssessmentScoreRecord[]): any[] {
        const grouped = scores.reduce((acc, score) => {
            const studentId = score.studentId;
            if (!acc[studentId]) {
                acc[studentId] = {
                    studentId: studentId,
                    studentName: score.studentName,
                    semester: score.semester, // Assume same semester for grouped row
                    ELA: null, MATHS: null, SCIENCE: null, MUSIC: null // Initialize subjects
                };
            }
             // Assign score to the correct subject property
            if (acc[studentId].hasOwnProperty(score.subject)) {
                acc[studentId][score.subject as keyof typeof acc[typeof studentId]] = score.score;
            }
            return acc;
        }, {} as { [key: string]: any }); // Use index signature
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