// src/app/features/students/components/student-performance/student-performance.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Student, StudentPerformance } from '../../../../models';
import { LineChartSeries } from '../../../../shared/components/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.scss']
})
export class StudentPerformanceComponent implements OnChanges {
  @Input() student!: Student;
  @Input() performances: StudentPerformance[] | null = [];
  
  chartSeries: LineChartSeries[] = [];
  
  courseColors: { [course: string]: string } = {
    'ELA': '#4285F4',
    'MATHS': '#EA4335',
    'SCIENCE': '#34A853',
    'MUSIC': '#FBBC05',
    'SOCIAL_STUDIES': '#8861DD'
  };
  
  displayedColumns: string[] = ['course', 'semester1', 'semester2', 'semester3'];
  tableData: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['performances'] && this.performances) {
      this.processPerformanceData();
    }
  }

  private processPerformanceData(): void {
    // Group performances by course
    const courseMap = new Map<string, StudentPerformance[]>();
    
    if (this.performances) {
      this.performances.forEach(performance => {
        if (!courseMap.has(performance.courseId)) {
          courseMap.set(performance.courseId, []);
        }
        
        const coursePerformances = courseMap.get(performance.courseId);
        if (coursePerformances) {
          coursePerformances.push(performance);
        }
      });
    }
    
    // Create chart series
    this.chartSeries = [];
    courseMap.forEach((performances, courseId) => {
      const sortedPerformances = performances.sort((a, b) => {
        // Sort by year and semester
        if (a.year !== b.year) {
          return parseInt(a.year) - parseInt(b.year);
        }
        
        const semesterOrder: { [key: string]: number } = {
          '1st': 1,
          'fall': 1,
          '2nd': 2,
          'winter': 2,
          '3rd': 3,
          'spring': 3
        };
        
        return (semesterOrder[a.semester] || 0) - (semesterOrder[b.semester] || 0);
      });
      
      const seriesData = sortedPerformances.map(p => ({
        x: `${p.semester} ${p.year}`,
        y: p.score
      }));
      
      if (seriesData.length > 0) {
        this.chartSeries.push({
          name: courseId,
          data: seriesData,
          color: this.courseColors[courseId] || '#999999'
        });
      }
    });
    
    // Create table data
    this.tableData = [];
    const courseIds = Array.from(courseMap.keys());
    
    courseIds.forEach(courseId => {
      const coursePerformances = courseMap.get(courseId) || [];
      const semesterScores: { [semester: string]: number } = {};
      
      coursePerformances.forEach(performance => {
        semesterScores[performance.semester] = performance.score;
      });
      
      this.tableData.push({
        course: courseId,
        semester1: semesterScores['1st'] || semesterScores['fall'] || null,
        semester2: semesterScores['2nd'] || semesterScores['winter'] || null,
        semester3: semesterScores['3rd'] || semesterScores['spring'] || null
      });
    });
  }
}
