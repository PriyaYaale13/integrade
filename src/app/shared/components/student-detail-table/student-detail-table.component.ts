import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProficiencyDetail, StudentScore } from '../../../models/dashboard.model'; // Adjust path

@Component({
  selector: 'app-student-detail-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './student-detail-table.component.html',
  styleUrls: ['./student-detail-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDetailTableComponent {
  // Input receives the data fetched after clicking a bar segment
  @Input() detailData: ProficiencyDetail | null = null;

  displayedColumns: string[] = ['studentName', 'semester1', 'semester2', 'semester3'];

  // Simple formatting helper
  formatScore(score: number | null | undefined): string {
    return score != null ? `${score}%` : '-';
  }
}