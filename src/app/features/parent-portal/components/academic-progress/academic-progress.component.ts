// src/app/features/parent-portal/components/academic-progress/academic-progress.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LineChartSeries } from '../../../../shared/components/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-academic-progress',
  templateUrl: './academic-progress.component.html',
  styleUrls: ['./academic-progress.component.scss']
})
export class AcademicProgressComponent implements OnChanges {
  @Input() studentId: string = '';
  
  isLoading = false;
  selectedSubject = 'all';
  
  // Mock academic data
  academicData = {
    currentGrades: {
      ELA: 68,
      Math: 100,
      Science: 83,
      Music: 100,
      'Social Studies': 100,
      Dance: 100,
      Art: 92,
      Computer: 80,
      Physical: 100
    },
    chartSeries: [] as LineChartSeries[]
  };
  
  subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'ELA', label: 'ELA' },
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Science' },
    { value: 'Music', label: 'Music' },
    { value: 'Social Studies', label: 'Social Studies' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentId']) {
      this.loadAcademicData();
    }
  }

  loadAcademicData(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      // Generate some sample chart data
      this.academicData.chartSeries = this.generateChartData();
      this.isLoading = false;
    }, 500);
  }

  onSubjectChange(subject: string): void {
    this.selectedSubject = subject;
    // In a real application, we might refetch or filter data here
  }

  private generateChartData(): LineChartSeries[] {
    // Generate some sample data for the chart
    const subjects = ['ELA', 'Math', 'Science', 'Music', 'Social Studies'];
    
    return subjects.map(subject => {
      const baseValue = this.academicData.currentGrades[subject] || 75;
      
      // Generate data points for Fall, Winter, and Spring
      const data = [
        { x: 'Fall', y: Math.max(50, baseValue - 10 + Math.random() * 5) },
        { x: 'Winter', y: Math.min(100, baseValue) },
        { x: 'Spring', y: Math.min(100, baseValue + 5 + Math.random() * 5) }
      ];
      
      return {
        name: subject,
        data
      };
    });
  }

  getScoreClass(score: number): string {
    if (score >= 90) {
      return 'score-excellent';
    } else if (score >= 80) {
      return 'score-good';
    } else if (score >= 70) {
      return 'score-average';
    } else {
      return 'score-needs-improvement';
    }
  }
}
