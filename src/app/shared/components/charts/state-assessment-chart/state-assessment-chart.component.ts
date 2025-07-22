import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { StateAssessmentPerformanceData } from '../../../../models/dashboard.model';

@Component({
  selector: 'app-state-assessment-chart', // Keep the selector the same
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-assessment-chart.component.html',
  styleUrls: ['./state-assessment-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateAssessmentChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) data!: StateAssessmentPerformanceData;
  @ViewChild('chartSvg') private chartSvg!: ElementRef<SVGElement>;
  resizeObserver!: ResizeObserver;

  ngOnChanges(changes: SimpleChanges): void {
    // Re-render if data input changes after initialization
    if (changes['data'] && !changes['data'].firstChange && this.chartSvg) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.createChart(); // Recreate chart on resize
    });
    if (this.chartSvg?.nativeElement) {
      this.resizeObserver.observe(this.chartSvg.nativeElement);
    }
  }

  private createChart(): void {
    if (!this.data || !this.chartSvg) return;

    const svgElement = this.chartSvg.nativeElement;
    // Clear any existing chart elements
    d3.select(svgElement).selectAll('*').remove();

    // Get the actual width and height of the SVG from the DOM
    const svgWidth = svgElement.clientWidth || 300; // Fallback width if clientWidth is 0
    const svgHeight = svgElement.clientHeight || 48; // Fallback height if clientHeight is 0

    const svg = d3.select(svgElement);

    // Create a unique gradient ID for this chart instance
    const uniqueId = new Date().getTime() + Math.random().toString(16).substring(2);
    const gradientId = `performance-gradient-${uniqueId}`;

    // Create the gradient definition
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    // Define gradient stops with more natural distribution
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FF5722'); // Red for "Below Basic"

    gradient.append('stop')
      .attr('offset', '33%')
      .attr('stop-color', '#FFC107'); // Yellow for "Basic"

    gradient.append('stop')
      .attr('offset', '66%')
      .attr('stop-color', '#8BC34A'); // Light Green for "Proficient"

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#4CAF50'); // Dark Green for "Advanced"

    // Draw the gradient background bar
    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('rx', 6) // Rounded corners
      .attr('ry', 6)
      .attr('fill', `url(#${gradientId})`);

    // Create scale for positioning
    const xScale = d3.scaleLinear()
      .domain([this.data.minScale, this.data.maxScale])
      .range([0, svgWidth]);

    // Draw state average indicator line
    const stateAvgX = xScale(this.data.stateAverage);
    svg.append('line')
      .attr('x1', stateAvgX)
      .attr('y1', 0)
      .attr('x2', stateAvgX)
      .attr('y2', svgHeight)
      .attr('stroke', 'rgba(0, 0, 0, 0.2)')
      .attr('stroke-width', 2);

    // Draw class average indicator (circle with border)
    const classAvgX = xScale(this.data.classAverage);
    svg.append('circle')
      .attr('cx', classAvgX)
      .attr('cy', svgHeight / 2)
      .attr('r', 8)
      .attr('fill', 'white')
      .attr('stroke', '#1976D2')
      .attr('stroke-width', 4);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}