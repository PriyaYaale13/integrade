import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { GrowthDataPoint } from '../../../../models/growth.models'; // Assuming structure like { subject, fallScore, winterScore, summerScore }

interface StackedGrowthData {
    subject: string;
    // Values represent the *height* of each segment
    fall: number;
    winter: number; // Height representing winter score *above* fall
    summer: number; // Height representing summer score *above* winter
}

@Component({
  selector: 'app-stacked-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer class="stacked-bar-chart-container"></div>`,
  styleUrls: ['./stacked-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackedBarChartComponent implements AfterViewInit, OnChanges {
  @Input() data: GrowthDataPoint[] = [];
  @Input() width: number = 800;
  @Input() height: number = 350; // Match page 17 y-axis
  @Input() colors = { fall: '#377eb8', winter: '#ff7f00', summer: '#4daf4a' }; // Example colors

  @ViewChild('chartContainer') private chartContainer!: ElementRef;

  private svg: any;
  private margin = { top: 20, right: 30, bottom: 60, left: 60 };
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

  private transformDataForStacking(growthData: GrowthDataPoint[]): StackedGrowthData[] {
     return growthData.map(d => ({
         subject: d.subject,
         fall: d.fallScore ?? 0,
         // Winter segment height = winter score - fall score (or 0 if fall missing)
         winter: Math.max(0, (d.winterScore ?? 0) - (d.fallScore ?? 0)),
         // Summer segment height = summer score - winter score (or 0 if winter missing)
         summer: Math.max(0, (d.summerScore ?? 0) - (d.winterScore ?? 0)),
     }));
  }


  private createChart(): void {
    d3.select(this.chartContainer.nativeElement).select('svg').remove();
    if (!this.data || this.data.length === 0) return;

    const transformedData = this.transformDataForStacking(this.data);
    const subjects = transformedData.map(d => d.subject);
    const stackKeys: ('fall' | 'winter' | 'summer')[] = ['fall', 'winter', 'summer'];

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Stack generator
    const stack = d3.stack<StackedGrowthData, string>().keys(stackKeys);
    const series = stack(transformedData);

    // X axis
    const x = d3.scaleBand()
      .domain(subjects)
      .range([0, this.chartWidth])
      .padding(0.3);

    this.svg.append('g')
      .attr('transform', `translate(0,${this.chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)") // Rotate labels like Page 17
        .style("text-anchor", "end");

    // Y axis - Find max total score
    const maxScore = d3.max(this.data, d => Math.max(d.fallScore ?? 0, d.winterScore ?? 0, d.summerScore ?? 0)) ?? 100; // Default max if no data
     const yMax = Math.ceil(maxScore / 50) * 50; // Round up to nearest 50 like Page 17

    const y = d3.scaleLinear()
      .domain([0, yMax])
      .range([this.chartHeight, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(y).ticks(yMax / 50)); // Ticks every 50

    // Add Y gridlines
     this.svg.append('g').attr('class', 'grid')
        .call(d3.axisLeft(y).ticks(yMax / 50).tickSize(-this.chartWidth).tickFormat(() => ''));

    // Color scale
     const color = d3.scaleOrdinal<string>()
        .domain(stackKeys)
        .range([this.colors.fall, this.colors.winter, this.colors.summer]);

    // Bars
    this.svg.append('g')
      .selectAll('g')
      .data(series)
      .enter().append('g')
        .attr('fill', (d: any) => color(d.key))
      .selectAll('rect')
      .data((d: any) => d)
      .enter().append('rect')
        .attr('x', (d: any) => x(d.data.subject)!)
        .attr('y', (d: any) => y(d[1])) // d[1] is the top edge of the segment
        .attr('height', (d: any) => y(d[0]) - y(d[1])) // d[0] is bottom edge, d[1] is top
        .attr('width', x.bandwidth())
         .append('title') // Tooltip shows segment value
         .text((d: any, event: any) => {
             const segmentKey = (d3.select(event.target.parentNode).datum() as any).key; // Find stack key
             const segmentValue = d.data[segmentKey as keyof StackedGrowthData];
             return `${d.data.subject} - ${segmentKey}: ${segmentValue}`; // Show segment height
         });


     // Legend (Adapt from Proficiency Chart legend logic)
     const legend = this.svg.append('g')
         .attr('transform', `translate(${this.chartWidth - 100}, ${this.chartHeight + 45})`) // Position below axis
         .attr('text-anchor', 'start')
         .selectAll('g')
         .data(stackKeys) // Use fall, winter, summer
         .enter().append('g')
         .attr('transform', (d: any, i: number) => `translate(0, ${i * 20})`);

     legend.append('rect')
         .attr('x', 0).attr('width', 18).attr('height', 18)
         .attr('fill', color); // Use the color scale

     legend.append('text')
         .attr('x', 24).attr('y', 9).attr('dy', '0.35em')
         .text((d: any) => d.charAt(0).toUpperCase() + d.slice(1)) // Capitalize
         .style('font-size', '12px');
  }
}