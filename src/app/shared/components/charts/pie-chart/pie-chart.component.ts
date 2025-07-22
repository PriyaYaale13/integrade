import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { ScoreDistribution } from '../../../../models/assessment.model'; // Use appropriate model

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer class="pie-chart-container"></div>`,
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements AfterViewInit, OnChanges {
  @Input() data: ScoreDistribution[] = [];
  @Input() width: number = 200;
  @Input() height: number = 200;
  @Input() innerRadiusFactor: number = 0.5; // 0 for pie, >0 for donut

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
    if (this.data && this.data.length > 0) {
      this.createChart();
    }
  }

  private createChart(): void {
    d3.select(this.chartContainer.nativeElement).select('svg').remove();

    if (!this.data || this.data.length === 0) return;

    this.radius = Math.min(this.width, this.height) / 2;
    const innerRadius = this.radius * this.innerRadiusFactor;

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    // Use colors from data if provided, otherwise generate
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.level))
      .range(this.data.map(d => d.color || d3.schemeCategory10)); // Fallback to scheme

    const pie = d3.pie<ScoreDistribution>()
      .value(d => d.percentage)
      .sort(null); // Use data order

    const arc = d3.arc<any, d3.PieArcDatum<ScoreDistribution>>()
      .innerRadius(innerRadius)
      .outerRadius(this.radius);

    // Arcs
    this.svg.selectAll('path')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => this.colors(d.data.level))
      .attr('stroke', '#fff') // White separator lines
      .style('stroke-width', '1px')
      .append('title') // Basic tooltip
      .text((d: any) => `${d.data.level}: ${d.data.percentage}%`);

    // Add labels (optional, can get crowded on small charts)
    /*
    const labelArc = d3.arc<any, d3.PieArcDatum<ScoreDistribution>>()
        .innerRadius(this.radius * 0.7)
        .outerRadius(this.radius * 0.9);

    this.svg.selectAll('text')
        .data(pie(this.data))
        .enter()
        .append('text')
        .attr('transform', (d: any) => `translate(${labelArc.centroid(d)})`)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#333') // Adjust contrast if needed
        .text((d: any) => `${d.data.percentage}%`);
    */
  }
}