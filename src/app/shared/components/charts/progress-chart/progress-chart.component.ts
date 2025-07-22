import { Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnChanges, OnDestroy {
  @Input() student: any;
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  resizeTimeout: any;

  ngOnChanges() {
    window.addEventListener('resize', this.onResize.bind(this));
    if (this.student) {
      this.renderChart();
    }
  }

  renderChart() {
    const data = this.student.progressNotes.map((note: any, index: any) => ({
      date: new Date(note.date),
      score: this.interpolateScore(index)
    }));

    const container = this.chartContainer.nativeElement;
    container.innerHTML = ''; // Clear old chart

    const margin = { top: 0, right: 10, bottom: 40, left: 40 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X and Y scales
    // Define the x scale
    const x = d3.scaleTime()
      .domain(d3.extent(data, (d: any) => new Date(d.date)) as [Date, Date]) // Make sure this is a valid Date range
      .range([0, width]);

    // Define the y scale
    const y = d3.scaleLinear()
      .domain([50, Math.max(this.student.targetScore + 10, d3.max(data, (d: any) => +d.score) ?? 0)])
      .range([height, 0]);

    // Define the line generator
    const line = d3.line<any>()
      .x((d: any) => x(d.date))  // Use x scale for x position
      .y(d => y(d.score));       // Use y scale for y position

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

      // Dots
    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => x(d.date))
      .attr('cy', (d: any) => y(d.score))
      .attr('r', 4)
      .attr('fill', '#3b82f6');

    // Target line
    svg.append('line')
      .attr('x1', 0)
      .attr('y1', y(this.student.targetScore))
      .attr('x2', width)
      .attr('y2', y(this.student.targetScore))
      .attr('stroke', '#f97316')
      .attr('stroke-dasharray', '4 2');

    svg.append('text')
      .attr('x', width - 60)
      .attr('y', y(this.student.targetScore) - 6)
      .text(`Target: ${this.student.targetScore}`)
      .attr('fill', '#f97316')
      .style('font-size', '12px');

    // X and Y axes
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));
  }

  // Simulate score progression
  interpolateScore(index: number): number {
    const { startScore, currentScore, progressNotes } = this.student;
    const totalSteps = progressNotes.length - 1;
    const stepScore = (currentScore - startScore) / totalSteps;
    return +(startScore + stepScore * index).toFixed(1);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.student) {
        this.renderChart();
      }
    }, 200); // Delay to avoid rapid re-renders
  }

}
