import { Component, ElementRef, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

interface ProficiencyData {
  subject: string;
  proficient: number;
  basic: number;
  belowBasic: number;
}

@Component({
  selector: 'app-course-proficiency',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="course-proficiency-container" style="width: 100%; height: 500px;"></div>`,
  styles: [`
    .course-proficiency-container {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      min-height: 500px;
    }
    .chart-title {
      text-align: center;
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
    }
    .axis-line {
      stroke: #ccc;
    }
    .axis text {
      font-size: 12px;
      fill: #666;
    }
    .legend-item {
      font-size: 14px;
    }
    .border-container {
      stroke: #4285f4;
      stroke-width: 2;
      fill: none;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class CourseProficiencyComponent implements OnInit, AfterViewInit {
  @Input() data: ProficiencyData[] = [
    { subject: 'ELA', proficient: 84, basic: 10, belowBasic: 6 },
    { subject: 'MATHS', proficient: 78, basic: 12, belowBasic: 10 },
    { subject: 'SCIENCE', proficient: 88, basic: 10, belowBasic: 2 },
    { subject: 'MUSIC', proficient: 90, basic: 8, belowBasic: 2 }
  ];

  constructor(private elementRef: ElementRef) {
    console.log('CourseProficiencyComponent constructor called');
  }

  ngOnInit(): void {
    console.log('CourseProficiencyComponent ngOnInit called');
  }

  ngAfterViewInit(): void {
    console.log('CourseProficiencyComponent ngAfterViewInit called');
    // Delay chart creation to ensure DOM is ready
    setTimeout(() => {
      console.log('Creating chart after timeout');
      this.createChart();
    }, 100);
  }

  private createChart(): void {
    const container = this.elementRef.nativeElement.querySelector('.course-proficiency-container');
    console.log('Container found:', !!container);
    
    if (!container) {
      console.error('Container not found');
      return;
    }
    
    // Clear any existing SVG
    d3.select(container).selectAll('*').remove();
    
    try {
      // Chart dimensions
      const margin = { top: 50, right: 30, bottom: 60, left: 60 };
      const width = Math.max(600, container.clientWidth - margin.left - margin.right);
      const height = Math.max(400, container.clientHeight - margin.top - margin.bottom);
      
      console.log('Chart dimensions:', { width, height, containerWidth: container.clientWidth, containerHeight: container.clientHeight });
      
      // Create SVG element
      const svg = d3.select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
      // Add blue border around the chart
      d3.select(container).select('svg')
        .append('rect')
        .attr('x', 5)
        .attr('y', 5)
        .attr('width', width + margin.left + margin.right - 10)
        .attr('height', height + margin.top + margin.bottom - 10)
        .attr('class', 'border-container');
      
      // Chart title
      svg.append('text')
        .attr('class', 'chart-title')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .text('COURSE PROFICIENCY');
      
      // Define X scale
      const x0 = d3.scaleBand()
        .domain(this.data.map(d => d.subject))
        .rangeRound([0, width])
        .paddingInner(0.1);
      
      // Define inner X scale for grouped bars
      const x1 = d3.scaleBand()
        .domain(['proficient', 'basic', 'belowBasic'])
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);
      
      // Define Y scale
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
      
      // Define colors
      const colors = d3.scaleOrdinal<string>()
        .domain(['proficient', 'basic', 'belowBasic'])
        .range(['#3e8c41', '#e78c37', '#c93a32']);
      
      // Add horizontal grid lines
      svg.selectAll('line.horizontalGrid')
        .data(y.ticks(10))
        .enter()
        .append('line')
        .attr('class', 'horizontalGrid axis-line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', d => y(d))
        .attr('y2', d => y(d))
        .attr('stroke', '#e5e5e5');
      
      // Create bar groups
      const subjectGroups = svg.selectAll('.subject-group')
        .data(this.data)
        .enter()
        .append('g')
        .attr('class', 'subject-group')
        .attr('transform', d => `translate(${x0(d.subject)}, 0)`);
      
      // Add bars for each proficiency level
      subjectGroups.selectAll('rect')
        .data(d => [
          { key: 'proficient', value: d.proficient },
          { key: 'basic', value: d.basic },
          { key: 'belowBasic', value: d.belowBasic }
        ])
        .enter()
        .append('rect')
        .attr('x', d => x1(d.key)!)
        .attr('y', d => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', d => colors(d.key) as string);
      
      // Add X axis
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x0))
        .selectAll('text')
        .style('text-anchor', 'middle');
      
      // Add Y axis with percentage labels
      svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y)
          .tickFormat(d => `${d}%`)
          .ticks(10));
      
      // Create legend
      const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width / 2 - 150}, ${height + 40})`);
      
      const legendItems = [
        { key: 'proficient', label: 'PROFICIENT' },
        { key: 'basic', label: 'BASIC' },
        { key: 'belowBasic', label: 'BELOW BASIC' }
      ];
      
      const legendItem = legend.selectAll('.legend-item')
        .data(legendItems)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(${i * 120}, 0)`);
      
      legendItem.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', d => colors(d.key) as string);
      
      legendItem.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .text(d => d.label)
        .style('fill', '#666');
        
      console.log('Chart creation completed successfully');
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }
}
