import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CommonModule } from '@angular/common';

interface AssessmentData {
  subject: string;
  stateAverage: number;
  classAverage: number;
  studentScore: number;
}

@Component({
  selector: 'app-state-assessment',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="state-assessment-container"></div>`,
  styles: [`
    .state-assessment-container {
      font-family: Arial, sans-serif;
    }
    .chart-title {
      background-color: #d67ecc;
      color: white;
      text-align: center;
      font-size: 22px;
      padding: 8px;
      margin: 0;
    }
    .chart-container {
      border: 1px solid #ccc;
      margin-top: 0;
    }
    .subject-label {
      fill: #d67ecc;
      font-weight: bold;
      font-size: 14px;
    }
    .score-label {
      font-size: 12px;
    }
    .average-label {
      font-size: 12px;
      text-align: center;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class StateAssessmentComponent implements OnInit {
  private data: AssessmentData[] = [
    { subject: 'ELA', stateAverage: 58, classAverage: 64, studentScore: 80 },
    { subject: 'MATHS', stateAverage: 58, classAverage: 64, studentScore: 80 }
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const container = this.elementRef.nativeElement.querySelector('.state-assessment-container');
    
    // Create main container div with title
    const chartDiv = d3.select(container)
      .append('div')
      .attr('class', 'chart-container');
      
    // Add title
    chartDiv.append('h2')
      .attr('class', 'chart-title')
      .text('State Assessment Performance');

    // Create SVG for the chart
    const margin = { top: 20, right: 30, bottom: 50, left: 30 };
    const width = 700 - margin.left - margin.right;
    const height = 140 - margin.top - margin.bottom;
    
    // Clear any existing SVG
    d3.select(container).select('svg').remove();
    
    const svg = chartDiv.append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    
    // Create a group for each subject
    const subjectWidth = width / 2;
    
    this.data.forEach((d, i) => {
      const subjectGroup = svg.append('g')
        .attr('transform', `translate(${margin.left + i * subjectWidth}, ${margin.top})`);
      
      // Create scale
      const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, subjectWidth - 30]);
      
      // Draw state average bar background
      subjectGroup.append('rect')
        .attr('x', 0)
        .attr('y', 20)
        .attr('width', x(d.stateAverage))
        .attr('height', 20)
        .attr('fill', '#e6b294');
      
      // Draw class average bar background
      subjectGroup.append('rect')
        .attr('x', x(d.stateAverage))
        .attr('y', 20)
        .attr('width', x(d.classAverage) - x(d.stateAverage))
        .attr('height', 20)
        .attr('fill', '#a3e6b5');
      
      // Draw student score bar background
      subjectGroup.append('rect')
        .attr('x', x(d.classAverage))
        .attr('y', 20)
        .attr('width', x(d.studentScore) - x(d.classAverage))
        .attr('height', 20)
        .attr('fill', '#5d9a43');
      
      // Draw state average marker line
      subjectGroup.append('line')
        .attr('x1', x(d.stateAverage))
        .attr('y1', 10)
        .attr('x2', x(d.stateAverage))
        .attr('y2', 50)
        .attr('stroke', '#4285f4')
        .attr('stroke-width', 2);
      
      // Draw class average marker line
      subjectGroup.append('line')
        .attr('x1', x(d.classAverage))
        .attr('y1', 10)
        .attr('x2', x(d.classAverage))
        .attr('y2', 50)
        .attr('stroke', '#8A2BE2')
        .attr('stroke-width', 2);
      
      // Add state average label
      subjectGroup.append('text')
        .attr('x', 0)
        .attr('y', 10)
        .attr('class', 'score-label')
        .text('0');
      
      subjectGroup.append('text')
        .attr('x', x(d.stateAverage))
        .attr('y', 10)
        .attr('class', 'score-label')
        .attr('text-anchor', 'middle')
        .text(d.stateAverage);
      
      // Add class average label
      subjectGroup.append('text')
        .attr('x', x(d.classAverage))
        .attr('y', 10)
        .attr('class', 'score-label')
        .attr('text-anchor', 'middle')
        .text(d.classAverage);
      
      // Add student score label
      subjectGroup.append('text')
        .attr('x', x(d.studentScore))
        .attr('y', 10)
        .attr('class', 'score-label')
        .attr('text-anchor', 'end')
        .text(d.studentScore);
      
      // Add subject label
      subjectGroup.append('text')
        .attr('x', subjectWidth / 2 - 10)
        .attr('y', 35)
        .attr('class', 'subject-label')
        .attr('text-anchor', 'end')
        .text(d.subject);
      
      // Add state average label
      subjectGroup.append('text')
        .attr('x', x(d.stateAverage / 2))
        .attr('y', 60)
        .attr('class', 'average-label')
        .attr('text-anchor', 'middle')
        .text('State');
      
      subjectGroup.append('text')
        .attr('x', x(d.stateAverage / 2))
        .attr('y', 75)
        .attr('class', 'average-label')
        .attr('text-anchor', 'middle')
        .text('Ave');
      
      // Add class average label
      subjectGroup.append('text')
        .attr('x', x((d.classAverage + d.stateAverage) / 2))
        .attr('y', 60)
        .attr('class', 'average-label')
        .attr('text-anchor', 'middle')
        .text('Class');
      
      subjectGroup.append('text')
        .attr('x', x((d.classAverage + d.stateAverage) / 2))
        .attr('y', 75)
        .attr('class', 'average-label')
        .attr('text-anchor', 'middle')
        .text('Ave');
    });
  }
}
