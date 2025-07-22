import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { StateAssessmentScoreDistributionData, ScoreDistribution } from '../../../../models/assessment.model'; // Use appropriate model

@Component({
  selector: 'app-score-band-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer class="score-band-pie-chart-container"></div>`,
  styleUrls: ['./score-band-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBandPieChartComponent implements AfterViewInit, OnChanges {
  // Takes the full distribution data object
  @Input() data!: StateAssessmentScoreDistributionData;
  @Input() width: number = 250;
  @Input() height: number = 250;
  @Input() innerRadiusFactor: number = 0.6; // For donut shape
  @Input() titleFontSize: string = '0.9em';
  @Input() subtitleFontSize: string = '0.8em';

  @ViewChild('chartContainer') private chartContainer!: ElementRef;

  private svg: any;
  private radius!: number;
  private colors: any;

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] || changes['width'] || changes['height']) && this.svg) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.createChart();
    }
  }

  private createChart(): void {
    d3.select(this.chartContainer.nativeElement).select('svg').remove();

    if (!this.data || !this.data.distribution || this.data.distribution.length === 0) return;

    this.radius = Math.min(this.width, this.height) / 2 - 10; // Add small padding
    const innerRadius = this.radius * this.innerRadiusFactor;

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    // Use colors from data
    this.colors = d3.scaleOrdinal<string>()
      .domain(this.data.distribution.map(d => d.level))
      .range(this.data.distribution.map(d => d.color));

    const pie = d3.pie<ScoreDistribution>()
      .value(d => d.percentage)
      .sort(null); // Use data order

    const arc = d3.arc<any, d3.PieArcDatum<ScoreDistribution>>()
      .innerRadius(innerRadius)
      .outerRadius(this.radius);

    // Arcs
    const path = this.svg.selectAll('path')
      .data(pie(this.data.distribution))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => this.colors(d.data.level))
      .attr('stroke', '#fff')
      .style('stroke-width', '1px');

    path.append('title') // Basic tooltip
       .text((d: any) => `${d.data.level}: ${d.data.percentage}%`);

    // Add labels inside arcs (percentage) - like Page 11
    this.svg.selectAll('text.percentage-label')
        .data(pie(this.data.distribution))
        .enter()
        .append('text')
        .attr('class', 'percentage-label')
        .attr('transform', (d: any) => {
             // Position label in the centroid of the arc slice
             const pos = arc.centroid(d);
             return `translate(${pos})`;
         })
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#fff') // White text inside segments
        .style('font-weight', 'bold')
        .text((d: any) => `${d.data.percentage}%`);


    // Add Central Title (Subject & Semester)
    this.svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em') // Adjust position slightly above center
        .style('font-size', this.titleFontSize)
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .text(`${this.data.subject} - ${this.data.semester}`);

    // Add Central Subtitle (e.g., Percentile for SAT/ACT page 12)
    if (this.data.overallPercentile != null) {
        this.svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.0em') // Position below title
            .style('font-size', this.subtitleFontSize)
            .style('font-weight', 'bold')
            .style('fill', '#e65100') // Orange color like image
            .text(`${this.data.overallPercentile}TH PERCENTILE`);
    }

    // Add Legend below chart (like Page 11)
    const legendGroup = this.svg.append('g')
        .attr('transform', `translate(${-this.radius}, ${this.radius + 20})`); // Position below

    const legendItems = legendGroup.selectAll('.legend-item')
        .data(this.data.distribution)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d: any, i: number) => `translate(${(i % 2) * (this.width / 2)}, ${Math.floor(i / 2) * 20})`); // 2 columns

    legendItems.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', (d: any) => this.colors(d.level));

    legendItems.append('text')
        .attr('x', 16)
        .attr('y', 6)
        .attr('dy', '0.35em')
        .style('font-size', '10px')
        .text((d: any) => d.level);
  }
}