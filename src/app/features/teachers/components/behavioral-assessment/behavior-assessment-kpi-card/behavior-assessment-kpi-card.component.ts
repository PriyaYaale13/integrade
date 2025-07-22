import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-behavior-assessment-kpi-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './behavior-assessment-kpi-card.component.html',
  styleUrls: ['./behavior-assessment-kpi-card.component.scss']
})
export class BehaviorAssessmentKpiCardComponent {
  @Input() totalStudents = 0;
  @Input() totalAttendance = 0;
  @Input() totalTardiness = 0;
  @Input() totalWarnings = 0;
  @Input() totalAbsentDays = 0;
  @Input() totalEarlyDismissalCount = 0;
@Input() totalmales = 0;
  @Input() totalfemales = 0;
  @Input() attendanceComparison = 0;
  @Input() tardinessComparison = 0;
  @Input() warningsComparison = 0;
  @Input() absentDaysComparison = 0;
  @Input() earlyDismissalComparison = 0;

  get kpiList() {
    return [
      {
        label: 'Total Students',
        value: this.totalStudents,
        comparison: 0,
        icon: 'fa-solid fa-users',
        iconColor: '#4456b7',
        iconBg: '#e0e7ff',
        isPercent: false,
        barColor: 'bg-blue-500'
      },
      {
        label: 'Total Attendance',
        value: this.totalAttendance,
        comparison: this.attendanceComparison,
        icon: 'fa-solid fa-calendar-check',
        iconColor: '#22c55e',
        iconBg: '#d1fae5',
        isPercent: true,
        barColor: 'bg-green-500'
      },
      {
        label: 'Tardiness',
        value: this.totalTardiness,
        comparison: this.tardinessComparison,
        icon: 'fa-solid fa-clock',
        iconColor: '#FFC107',
        iconBg: '#FFF3CD',
        isPercent: true,
        barColor: 'bg-yellow-400'
      },
      {
        label: 'Warnings',
        value: this.totalWarnings,
        comparison: this.warningsComparison,
        icon: 'fa-solid fa-circle-info',
        iconColor: '#fe9700',
        iconBg: '#FFF3CD',
        isPercent: true,
        barColor: 'bg-orange-400'
      },
      {
        label: 'Absent Days',
        value: this.totalAbsentDays,
        comparison: this.absentDaysComparison,
        icon: 'fa-solid fa-chart-line',
        iconColor: 'orange',
        iconBg: '#FFF3CD',
        isPercent: true,
        barColor: 'bg-orange-400'
      },
      {
        label: 'Early Dismissals',
        value: this.totalEarlyDismissalCount,
        comparison: this.earlyDismissalComparison,
        icon: 'fa-solid fa-chart-line',
       iconColor: '#FFC107',
        iconBg: '#FFF3CD',
        isPercent: true,
        barColor: 'bg-yellow-400'
      }
    ];
  }
}
