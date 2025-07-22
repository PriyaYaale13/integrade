import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ExtendedKpiData, KpiData } from '../../../models/dashboard.model'; // Adjust path if models are structured differently
import { UtilsService } from '../../../services/utils.service';


@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  // Make Input required if it should always be provided
  @Input({ required: true }) kpi!: KpiData;
  private router = inject(Router);
  private utilsService = inject(UtilsService)

  // In your component
  get cardClasses(): string {
    let classes = 'kpi-card transition duration-200 ease-in-out  hover:shadow-lg hover:scale-[1.02] cursor-pointer ';

    if (this.kpi?.styleClass) {
      classes += this.kpi.styleClass + ' ';
    }

    if (this.kpi?.navigateTo) {
      classes += 'clickable hover:shadow-lg hover:scale-[1.02] cursor-pointer ';
    } else {
      classes += 'opacity-70 cursor-pointer-events-none ';
    }

    return classes.trim();
  }

  getKpiIconClass(kpi: KpiData): string {
    const extendedKpi = kpi as ExtendedKpiData;
    if (extendedKpi.iconClass) {
      return extendedKpi.iconClass;
    }

    // Default styling based on KPI title
    switch (kpi.title.toLowerCase()) {
      case 'total students':
        return 'bg-[#F44336]/10';
      case 'attendance':
      case 'attendance rate':
        return 'bg-[#4CAF50]/10';
      case 'tardiness':
        return 'bg-[#FFC107]/10';
      case 'warnings':
        return 'bg-[#FF5722]/10';
      case 'disciplinary action':
      case 'disciplinary actions':
        return 'bg-[#1976D2]/10';
      case 'intervention program':
      case 'interventions':
        return 'bg-[#9C27B0]/10';
      case 'class avg. math':
      case 'math':
        return 'bg-[#00BCD4]/10';
      case 'class avg. ela':
      case 'ela':
        return 'bg-[#FF9800]/10';
      default:
        return 'bg-primary/10';
    }
  }

  getProgressBarClass(kpi: KpiData): string {
    const extendedKpi = kpi as ExtendedKpiData;
    if (extendedKpi.iconClass) {
      return extendedKpi.iconClass;
    }

    switch (kpi.title.toLowerCase()) {
      case 'total students':
        return 'bg-[#4456b7]';
      case 'attendance':
      case 'attendance rate':
        return 'bg-[#4CAF50]';
      case 'graduation rate':
        return 'bg-[#3f51b5]';
      case 'teachers':
        return 'bg-[#3f51b5]';
      case 'needs support':
      case 'at-risk':
        return 'bg-[#FF5722]';
      case 'tardiness':
        return 'bg-[#FFC107]';
      case 'warnings':
        return 'bg-[#fe9700]';
      case 'interventions':
        return 'bg-[#4456b7]';
      case 'disciplinary':
        return 'bg-[#f44336]';
      case 'student:teachers':
        return 'bg-[#4456b7]';
      case 'total teachers':
        return 'bg-[#4456b7]';
      case 'average experience':
        return 'bg-[#4CAF50]';
      case 'advanced degrees':
        return 'bg-[#fe9700]';
      case 'certifications':
        return 'bg-[#4456b7]';
      case 'advanced placement':
        return 'bg-[#4456b7]';
      case 'honor roll':
        return 'bg-[#fe9700]';
      case 'college acceptance':
        return 'bg-[#4CAF50]';
      case 'extracurricular':
        return 'bg-[#4456b7]';
      case 'on track':
        return 'bg-[#4caf50]';
      case 'high risk':
        return 'bg-[#F57C00]';
      case 'medium risk':
        return 'bg-[#FBC02D]';
      case 'low risk':
        return 'bg-[#388E3C]';
      case 'critical risk':
      case 'critical':
        return 'bg-[#D32F2F]';
      default:
        return 'bg-primary';
    }
  }
  getKpiIcon(kpi: KpiData): string {
    const extendedKpi = kpi as ExtendedKpiData;
    if (extendedKpi.icon) {
      return extendedKpi.icon;
    }

    // Default icons based on KPI title
    switch (kpi.title.toLowerCase()) {
      case 'total students':
        return 'fa-solid fa-users text-[#4456b7] text-xl';
      case 'attendance':
      case 'attendance rate':
        return 'fa-solid fa-calendar-check text-[#4CAF50] text-xl';
      case 'graduation rate':
        return 'fa-solid fa-graduation-cap text-[#3f51b5] text-xl';
      case 'teachers':
        return 'fa-solid fa-chalkboard-teacher text-[#3f51b5] text-xl';
      case 'at-risk':
        return 'fa-solid fa-triangle-exclamation text-[#FF5722] text-xl';
      case 'tardiness':
        return 'fa-solid fa-clock text-[#FFC107] text-xl';
      case 'warnings':
        return 'fa-solid fa-circle-info text-[#fe9700] text-xl';
      case 'interventions':
        return 'fa-solid fa-hand-holding-medical text-[#4456b7] text-xl';
      case 'disciplinary':
        return 'fa-solid fa-gavel text-[#f44336] text-xl';
      case 'student:teachers':
        return 'fa-solid fa-scale-balanced text-[#4456b7] text-xl';
      case 'total teachers':
        return 'fa-solid fa-chalkboard-teacher text-[#4456b7] text-xl';
      case 'average experience':
        return 'fa-solid fa-clock text-[#4CAF50] text-xl';
      case 'advanced degrees':
        return 'fa-solid fa-graduation-cap text-[#fe9700] text-xl';
      case 'certifications':
        return 'fa-solid fa-certificate text-[#4456b7] text-xl';
      case 'advanced placement':
        return 'fa-solid fa-award text-[#4456b7] text-xl';
      case 'honor roll':
        return 'fa-solid fa-star text-[#fe9700] text-xl';
      case 'college acceptance':
        return 'fa-solid fa-graduation-cap text-[#4CAF50] text-xl';
      case 'extracurricular':
        return 'fa-solid fa-basketball-ball text-[#4456b7] text-xl';
      case 'on track':
        return 'fa-solid fa-check-circle text-[#4caf50] text-xl';
      case 'needs support':
        return 'fa-solid fa-triangle-exclamation text-[#FF5722] text-xl';
      case 'critical':
        return 'fa-solid fa-circle-exclamation text-[#D32F2F] text-xl';
      case 'critical risk':
        return 'fa-solid fa-exclamation-triangle text-[#D32F2F] text-xl';
      case 'high risk':
        return 'fa-solid fa-exclamation-circle text-[#F57C00] text-xl';
      case 'medium risk':
        return 'fa-solid fa-exclamation text-[#FBC02D] text-xl';
      case 'low risk':
        return 'fa-solid fa-check-circle text-[#388E3C] text-xl';
      default:
        return 'fa-solid fa-chart-line text-primary text-xl';
    }
  }

  getTrendIcon(kpi: KpiData): string {
    if (kpi.trend === 'up') {
      return 'fa-solid fa-arrow-up';
    }
    else if (kpi.trend === 'down') {
      return 'fa-solid fa-arrow-down';
    }
    return 'fa-solid fa-equals';
  }

  getTrendValue(kpi: KpiData): string {
    return this.utilsService.getTrendValue(kpi);
  }

  getComparison(kpi: KpiData): string {
    return this.utilsService.getComparison(kpi);
  }

  getProgressWidth(kpi: KpiData) {
    return this.utilsService.getProgressWidth(kpi);
  }

  getTrendClass(kpi: KpiData): string {
    if (kpi.trend === 'up') {
      // For most metrics, up is good (except absentees/warnings)
      if (kpi.title.toLowerCase().includes('absent') ||
        kpi.title.toLowerCase().includes('warning') ||
        kpi.title.toLowerCase().includes('disciplinary')) {
        return 'text-[#F44336]'; // Red for negative trend
      }
      return 'text-[#4CAF50]'; // Green for positive trend
    }
    else if (kpi.trend === 'down') {
      // For absentees/warnings, down is good
      if (kpi.title.toLowerCase().includes('absent') ||
        kpi.title.toLowerCase().includes('warning') ||
        kpi.title.toLowerCase().includes('disciplinary')) {
        return 'text-[#4CAF50]'; // Green for positive trend
      }
      return 'text-[#F44336]'; // Red for negative trend
    }
    return 'text-[#FFC107]'; // Yellow for neutral/no trend
  }

  onKpiClick(kpi: KpiData): void {
    if (kpi.navigateTo) {
      this.router.navigate([kpi.navigateTo]);
    } else {
      console.log(`KPI Clicked: ${kpi.title} (No navigation)`);
      // Could potentially filter main view based on KPI click if needed
    }
  }

  getCardClass(kpi: any): string {
    const base = 'w-70 h-40 transition duration-200 ease-in-out';
    return kpi?.navigateTo
      ? base + ' hover:shadow-lg hover:scale-[1.02] cursor-pointer'
      : base + ' opacity-70 cursor-not-allowed';
  }
}
