import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { CourseProficiencyData } from '../../../../models/dashboard.model'; // Adjust path

interface StackedData {
    subject: string;
    [key: string]: number | string;
}

@Component({
    selector: 'app-course-proficiency-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<div #chartContainer></div>`,
    styleUrls: ['./course-proficiency-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseProficiencyChartComponent implements AfterViewInit, OnChanges {
    @Input() data: CourseProficiencyData[] = [];
    @Output() barClick = new EventEmitter<{ subject: string; level: string }>();

    @ViewChild('chartContainer') private chartContainer!: ElementRef;

    private svg: any;
    private readonly margin = { top: 20, right: 30, bottom: 60, left: 60 };
    private width = 500 - this.margin.left - this.margin.right; // Default width, can be made dynamic
    private height = 300 - this.margin.top - this.margin.bottom; // Default height

    private readonly colors = {
        proficient: 'darkgreen',
        basic: 'orange',
        belowBasic: 'darkred'
    };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && this.svg) { // Check if svg exists before trying to update
            this.createChart();
        }
    }

    ngAfterViewInit(): void {
        // Use ResizeObserver for dynamic width/height if needed
        this.updateDimensions();
        if (this.data && this.data.length > 0) {
             this.createChart();
        }
    }

     private updateDimensions(): void {
        // Example: Adjust width based on container, handle resize logic here
        const containerWidth = this.chartContainer.nativeElement.offsetWidth;
        this.width = Math.max(200, containerWidth - this.margin.left - this.margin.right); // Ensure minimum width
        // Height could also be dynamic
    }


    private createChart(): void {
        d3.select(this.chartContainer.nativeElement).select('svg').remove();
        if (!this.data || this.data.length === 0) return;

        this.svg = d3.select(this.chartContainer.nativeElement)
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        const subjects = this.data.map(d => d.subject);
        const levels: ('proficient' | 'basic' | 'belowBasic')[] = ['proficient', 'basic', 'belowBasic'];

        const stackedData: StackedData[] = this.data.map(d => ({
            subject: d.subject,
            proficient: d.proficient, basic: d.basic, belowBasic: d.belowBasic
        }));

        const stack = d3.stack<StackedData, string>().keys(levels);
        const series = stack(stackedData);

        const x = d3.scaleBand().domain(subjects).range([0, this.width]).padding(0.3);
        this.svg.append('g')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .attr('class', 'axis x-axis'); // Add class for styling

        const y = d3.scaleLinear().domain([0, 100]).range([this.height, 0]);
        this.svg.append('g')
            .call(d3.axisLeft(y).ticks(11).tickFormat(d => `${d}%`))
            .attr('class', 'axis y-axis'); // Add class

         this.svg.append('g').attr('class', 'grid')
            .call(d3.axisLeft(y).ticks(11).tickSize(-this.width).tickFormat(() => ''));

        this.svg.append('g')
            .selectAll('g')
            .data(series)
            .enter().append('g')
            .attr('fill', (d: any) => this.colors[d.key as keyof typeof this.colors])
            .selectAll('rect')
            .data((d: any) => d)
            .enter().append('rect')
            .attr('x', (d: any) => x(d.data.subject)!)
            .attr('y', (d: any) => y(d[1]))
            .attr('height', (d: any) => Math.max(0, y(d[0]) - y(d[1]))) // Ensure non-negative height
            .attr('width', x.bandwidth())
            .style('cursor', 'pointer')
            .on('click', (event: MouseEvent, d: any) => { // Use MouseEvent for type safety
                // Find the key/level based on y-values more robustly
                const clickedY = y.invert(event.offsetY - this.margin.top); // Adjust for margins if using offsetY
                let level: string | null = null;
                 for (const key of levels) {
                     const levelData = d.data[key] as number;
                     // Check which segment the click falls into (d[0] is bottom, d[1] is top)
                     // Need the original stack data 'series' to determine which segment corresponds to which key
                     // This logic needs careful implementation based on the exact structure of 'd' and 'series'
                     // Simplified/Potentially Inaccurate Click Logic:
                      const segmentHeight = y(d[0]) - y(d[1]);
                      const valueApproximation = (segmentHeight / this.height) * 100;
                      if (Math.abs(valueApproximation - d.data.proficient) < 1) level = 'Proficient';
                      else if (Math.abs(valueApproximation - d.data.basic) < 1) level = 'Basic';
                      else if (Math.abs(valueApproximation - d.data.belowBasic) < 1) level = 'Below Basic';
                      if (level) break; // Found a likely match
                 }


                 // Fallback or refined logic if above is inaccurate:
                 // Find the series key whose range [d[0], d[1]] contains the inverted click Y
                 const yClickValue = y.invert(d3.pointer(event)[1]); // Get y value in data domain
                 const parentElement = (event.currentTarget as Element).parentElement;
                 const seriesKey = parentElement ? (d3.select(parentElement).datum() as any)?.key : undefined; // Get key from parent group
                 if(seriesKey && levels.includes(seriesKey)) {
                     level = seriesKey.charAt(0).toUpperCase() + seriesKey.slice(1);
                 }


                if (level) {
                   this.barClick.emit({ subject: d.data.subject, level });
                } else {
                    console.warn("Could not reliably determine clicked bar segment level.");
                }
            })
            .append('title')
            .text((d: any) => {
                 // Determine level for tooltip (similar logic as click, simplified)
                 const segmentHeight = y(d[0]) - y(d[1]);
                 const valueApproximation = Math.round((segmentHeight / this.height) * 100);
                 let level = '';
                  if (Math.abs(valueApproximation - d.data.proficient) < 2) level = 'Proficient';
                  else if (Math.abs(valueApproximation - d.data.basic) < 2) level = 'Basic';
                  else if (Math.abs(valueApproximation - d.data.belowBasic) < 2) level = 'Below Basic';
                 return `${d.data.subject} - ${level}: ${valueApproximation}%`;
            });


        const legend = this.svg.append('g')
            .attr('transform', `translate(20, ${this.height + 40})`) // Position below axis
            .attr('class', 'chart-legend')
            .selectAll('g')
            .data(levels.slice().reverse())
            .enter().append('g')
            .attr('transform', (d: any, i: number) => `translate(${i * 100}, 0)`); // Horizontal legend

        legend.append('rect')
            .attr('x', 0).attr('width', 18).attr('height', 18)
            .attr('fill', (d: any) => this.colors[d as keyof typeof this.colors]);

        legend.append('text')
            .attr('x', 24).attr('y', 9).attr('dy', '0.35em')
            .text((d: any) => d.charAt(0).toUpperCase() + d.slice(1))
            .style('font-size', '12px');
    }
}