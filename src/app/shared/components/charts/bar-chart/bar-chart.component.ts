import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { InterventionSummaryData } from '../../../../models/intervention.model';

interface BarChartDataItem {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer class="bar-chart-container"></div>`,
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  // Example input: Expecting data formatted for simple bars
  @Input() data: BarChartDataItem[] = [];
  @Input() width: number = 400;
  @Input() height: number = 250;
  @Input() yAxisLabel: string = 'Percentage';
  @Input() yMax: number = 120; // Match Page 14 y-axis

  @ViewChild('chartContainer') private chartContainer!: ElementRef;

  private svg: any;
  private margin = { top: 20, right: 20, bottom: 50, left: 50 }; // Adjusted margins
  private chartWidth!: number;
  private chartHeight!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] || changes['width'] || changes['height']) && this.svg) {
      this.updateDimensions();
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    this.updateDimensions();
    if (this.data && this.data.length > 0) {
      this.createChart();
    }
  }

  private updateDimensions(): void {
      this.chartWidth = this.width - this.margin.left - this.margin.right;
      this.chartHeight = this.height - this.margin.top - this.margin.bottom;
  }

  private createChart(): void {
    d3.select(this.chartContainer.nativeElement).select('svg').remove();
    if (!this.data || this.data.length === 0) return;

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // X axis
    const x = d3.scaleBand()
      .range([0, this.chartWidth])
      .domain(this.data.map(d => d.label))
      .padding(0.4); // Adjust padding

    this.svg.append('g')
      .attr('transform', `translate(0,${this.chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
        .style("text-anchor", "middle"); // Center labels

    // Y axis
    const y = d3.scaleLinear()
      .domain([0, this.yMax])
      .range([this.chartHeight, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `${d}%`)); // Match y-axis from page 14

     // Add Y gridlines
     this.svg.append('g').attr('class', 'grid')
        .call(d3.axisLeft(y).ticks(6).tickSize(-this.chartWidth).tickFormat(() => ''));

    // Bars
    this.svg.selectAll(".bar")
      .data(this.data)
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", (d: BarChartDataItem) => x(d.label)!)
        .attr("y", (d: BarChartDataItem) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d: BarChartDataItem) => this.chartHeight - y(d.value))
        .attr("fill", (d: BarChartDataItem) => d.color || "#69b3a2") // Default color
        .append('title')
        .text((d: any) => `${d.label}: ${d.value}%`);

    // Add value labels on top of bars
    this.svg.selectAll(".bar-label")
       .data(this.data)
       .enter()
       .append("text")
       .attr("class", "bar-label")
       .attr("x", (d: BarChartDataItem) => x(d.label)! + x.bandwidth() / 2)
       .attr("y", (d: BarChartDataItem) => y(d.value) - 5) // Position above bar
       .attr("text-anchor", "middle")
       .style("font-size", "11px")
       .style("fill", "#333")
       .text((d: BarChartDataItem) => `${d.value}%`);
  }
}