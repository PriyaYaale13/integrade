import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

export interface LineChartDataPoint {
  x: number | Date;
  y: number;
}

export interface LineChartSeries {
  name: string;
  data: LineChartDataPoint[];
  color?: string;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() series: LineChartSeries[] = [];
  @Input() width: number = 500;
  @Input() height: number = 300;
  @Input() margin = { top: 20, right: 80, bottom: 40, left: 50 };
  @Input() showXAxis: boolean = true;
  @Input() showYAxis: boolean = true;
  @Input() showGrid: boolean = true;
  @Input() showTooltip: boolean = true;
  @Input() colors: string[] = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8861DD'];
  @Input() title: string = '';
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  @Input() xAxisTickFormat: (d: any) => string = d => d.toString();
  @Input() yAxisTickFormat: (d: any) => string = d => d.toString();
  @Input() maxYValue?: number;
  @Input() minYValue?: number;
  @Input() showLegend: boolean = true;
  @Input() legendPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() animated: boolean = true;
  @Input() curved: boolean = true;
  @Input() showPoints: boolean = true;
  @Input() showArea: boolean = false;
  @Input() areaOpacity: number = 0.1;

  private svg: any;
  private container: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private tooltip: any;
  private innerWidth: number = 0;
  private innerHeight: number = 0;
  private colorScale: any;
  private line: any;
  private area: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initializeChart();
    if (this.series.length > 0) {
      this.updateChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['series'] && !changes['series'].firstChange) ||
      (changes['width'] && !changes['width'].firstChange) ||
      (changes['height'] && !changes['height'].firstChange) ||
      (changes['curved'] && !changes['curved'].firstChange) ||
      (changes['showArea'] && !changes['showArea'].firstChange) ||
      (changes['maxYValue'] && !changes['maxYValue'].firstChange) ||
      (changes['minYValue'] && !changes['minYValue'].firstChange)
    ) {
      this.updateChart();
    }
  }

  private initializeChart(): void {
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    // Clear any existing SVG
    d3.select(this.elementRef.nativeElement).select('svg').remove();

    // Create SVG element
    this.svg = d3.select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'line-chart');

    this.container = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Create tooltip
    if (this.showTooltip) {
      this.tooltip = d3.select('body')
        .append('div')
        .attr('class', 'chart-tooltip')
        .style('opacity', 0);
    }

    // Initialize color scale
    this.colorScale = d3.scaleOrdinal().range(this.colors);
  }

  private updateChart(): void {
    if (!this.series || this.series.length === 0) return;

    // Clear existing elements
    this.container.selectAll('*').remove();

    // Updated dimensions
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    // Update scales
    this.updateScales();

    // Add grid lines
    if (this.showGrid) {
      this.addGridLines();
    }

    // Add axes
    this.addAxes();

    // Initialize line generator
    this.line = d3.line<LineChartDataPoint>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y));

    if (this.curved) {
      this.line.curve(d3.curveMonotoneX);
    }

    // Initialize area generator if needed
    if (this.showArea) {
      this.area = d3.area<LineChartDataPoint>()
        .x(d => this.xScale(d.x))
        .y0(this.innerHeight)
        .y1(d => this.yScale(d.y));

      if (this.curved) {
        this.area.curve(d3.curveMonotoneX);
      }
    }

    // Add lines and points
    this.addLinesAndPoints();

    // Add title
    if (this.title) {
      this.svg.append('text')
        .attr('x', this.width / 2)
        .attr('y', this.margin.top / 2)
        .attr('text-anchor', 'middle')
        .attr('class', 'chart-title')
        .text(this.title);
    }

    // Add axis labels
    if (this.xAxisLabel) {
      this.svg.append('text')
        .attr('x', this.width / 2)
        .attr('y', this.height - 5)
        .attr('text-anchor', 'middle')
        .attr('class', 'axis-label')
        .text(this.xAxisLabel);
    }

    if (this.yAxisLabel) {
      this.svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -this.height / 2)
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .attr('class', 'axis-label')
        .text(this.yAxisLabel);
    }

    // Add legend
    if (this.showLegend) {
      this.addLegend();
    }
  }

  private updateScales(): void {
    // Determine all x values and y values across all series
    const allXValues: (number | Date)[] = [];
    const allYValues: number[] = [];

    this.series.forEach(s => {
      s.data.forEach(d => {
        allXValues.push(d.x);
        allYValues.push(d.y);
      });
    });

    // X scale - handle both numeric and date types
    if (typeof allXValues[0] === 'number') {
      this.xScale = d3.scaleLinear()
        .domain([d3.min(allXValues as number[]) || 0, d3.max(allXValues as number[]) || 0])
        .range([0, this.innerWidth]);
    } else {
      this.xScale = d3.scaleTime()
        .domain([d3.min(allXValues as Date[]) || new Date(), d3.max(allXValues as Date[]) || new Date()])
        .range([0, this.innerWidth]);
    }

    // Y scale
    const minY = this.minYValue !== undefined ? this.minYValue : (d3.min(allYValues) || 0);
    const maxY = this.maxYValue !== undefined ? this.maxYValue : (d3.max(allYValues) || 0);
    
    this.yScale = d3.scaleLinear()
      .domain([minY, maxY])
      .range([this.innerHeight, 0])
      .nice();

    // Define axes
    this.xAxis = d3.axisBottom(this.xScale).tickFormat(this.xAxisTickFormat);
    this.yAxis = d3.axisLeft(this.yScale).tickFormat(this.yAxisTickFormat);
  }

  private addGridLines(): void {
    // Add horizontal grid lines
    if (this.showYAxis) {
      this.container.append('g')
        .attr('class', 'grid-lines')
        .call(d3.axisLeft(this.yScale)
          .tickSize(-this.innerWidth)
          .tickFormat(this.yAxisTickFormat)
        );
    }
  }

  private addAxes(): void {
    // Add X axis
    if (this.showXAxis) {
      this.container.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${this.innerHeight})`)
        .call(this.xAxis);
    }

    // Add Y axis
    if (this.showYAxis) {
      this.container.append('g')
        .attr('class', 'y-axis')
        .call(this.yAxis);
    }
  }

  private addLinesAndPoints(): void {
    // Add clipping path to ensure lines don't exceed chart area
    this.container.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.innerWidth)
      .attr('height', this.innerHeight);

    const chartGroup = this.container.append('g')
      .attr('clip-path', 'url(#clip)');

    // Add areas first if enabled
    if (this.showArea) {
      this.series.forEach((s, i) => {
        chartGroup.append('path')
          .datum(s.data)
          .attr('class', 'area')
          .attr('fill', s.color || this.colors[i % this.colors.length])
          .attr('fill-opacity', this.areaOpacity)
          .attr('d', this.area);
      });
    }

    // Add lines
    this.series.forEach((s, i) => {
      const color = s.color || this.colors[i % this.colors.length];
      
      const path = chartGroup.append('path')
        .datum(s.data)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2);
      
      if (this.animated) {
        const totalLength = path.node().getTotalLength();
        
        path
          .attr('stroke-dasharray', `${totalLength},${totalLength}`)
          .attr('stroke-dashoffset', totalLength)
          .attr('d', this.line)
          .transition()
          .duration(1000)
          .attr('stroke-dashoffset', 0);
      } else {
        path.attr('d', this.line);
      }
      
      // Add points
      if (this.showPoints) {
        chartGroup.selectAll(`.point-${i}`)
          .data(s.data)
          .enter()
          .append('circle')
          .attr('class', `point point-${i}`)
          .attr('cx', (d: any) => this.xScale(d.x))
          .attr('cy', (d: any) => this.yScale(d.y))
          .attr('r', 4)
          .attr('fill', color)
          .style('opacity', 0.8)
          .on('mouseover', (event: any, d: any) => {
            if (this.showTooltip) {
              const xValue = d.x instanceof Date ? d.x.toLocaleDateString() : d.x;
              this.tooltip
                .style('opacity', 1)
                .html(`<strong>${s.name}</strong><br>${xValue}: ${d.y}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 20) + 'px');
            }
          })
          .on('mouseout', () => {
            if (this.showTooltip) {
              this.tooltip.style('opacity', 0);
            }
          });
      }
    });
  }

  private addLegend(): void {
    const legendRectSize = 18;
    const legendSpacing = 4;
    let legendX = 0;
    let legendY = 0;
    
    switch (this.legendPosition) {
      case 'top':
        legendX = this.innerWidth / 2 - (this.series.length * legendRectSize * 1.5) / 2;
        legendY = -this.margin.top / 2;
        break;
      case 'right':
        legendX = this.innerWidth + 10;
        legendY = this.innerHeight / 2 - (this.series.length * (legendRectSize + legendSpacing)) / 2;
        break;
      case 'bottom':
        legendX = this.innerWidth / 2 - (this.series.length * legendRectSize * 1.5) / 2;
        legendY = this.innerHeight + 30;
        break;
      case 'left':
        legendX = -this.margin.left + 10;
        legendY = this.innerHeight / 2 - (this.series.length * (legendRectSize + legendSpacing)) / 2;
        break;
    }

    const legend = this.container.selectAll('.legend')
      .data(this.series)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d: any, i: number) => {
        const x = ['top', 'bottom'].includes(this.legendPosition) ? 
          legendX + i * legendRectSize * 3 : 
          legendX;
        const y = ['top', 'bottom'].includes(this.legendPosition) ? 
          legendY : 
          legendY + i * (legendRectSize + legendSpacing);
        return `translate(${x}, ${y})`;
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', (d: any, i: number) => d.color || this.colors[i % this.colors.length])
      .style('stroke', (d: any, i: number) => d.color || this.colors[i % this.colors.length]);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text((d: any) => d.name);
  }
}
