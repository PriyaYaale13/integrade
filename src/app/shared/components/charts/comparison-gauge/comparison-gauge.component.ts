import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-comparison-gauge',
  templateUrl: './comparison-gauge.component.html',
  styleUrls: ['./comparison-gauge.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComparisonGaugeComponent implements OnInit, OnChanges {
  @Input() value: number = 0; // Current value
  @Input() target: number = 0; // Target value
  @Input() classAverage?: number; // Optional class average
  @Input() stateAverage?: number; // Optional state average
  @Input() min: number = 0; // Min value of the scale
  @Input() max: number = 100; // Max value of the scale
  @Input() width: number = 300;
  @Input() height: number = 150;
  @Input() title: string = '';
  @Input() label: string = '';
  @Input() showLabels: boolean = true;
  @Input() animate: boolean = true;
  @Input() valueColor: string = '#4285F4';
  @Input() targetColor: string = '#34A853';
  @Input() classAvgColor: string = '#FBBC05';
  @Input() stateAvgColor: string = '#EA4335';
  @Input() backgroundColor: string = '#e0e0e0';
  @Input() textColor: string = '#333';
  @Input() valueUnit: string = '';
  @Input() thickness: number = 15; // Thickness of the gauge arc

  private svg: any;
  private container: any;
  private radius: number = 0;
  private percentScale: any;
  private arc: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initializeChart();
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).some(key => ['value', 'target', 'classAverage', 'stateAverage', 'min', 'max', 'width', 'height'].includes(key) && !changes[key].firstChange)) {
      this.updateChart();
    }
  }

  private initializeChart(): void {
    // Clear any existing SVG
    d3.select(this.elementRef.nativeElement).select('svg').remove();

    // Create SVG element
    this.svg = d3.select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'comparison-gauge');

    this.container = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height})`);

    // Calculate radius based on the min dimension
    this.radius = Math.min(this.width, this.height * 2) / 2 - 10;

    // Create scale to map values to angles
    this.percentScale = d3.scaleLinear()
      .domain([this.min, this.max])
      .range([-Math.PI, 0]);

    // Create arc generator
    this.arc = d3.arc()
      .innerRadius(this.radius - this.thickness)
      .outerRadius(this.radius)
      .startAngle(-Math.PI)
      .cornerRadius(this.thickness / 2);
  }

  private updateChart(): void {
    // Clear existing elements
    this.container.selectAll('*').remove();

    // Recalculate radius based on the min dimension
    this.radius = Math.min(this.width, this.height * 2) / 2 - 10;

    // Update scale to map values to angles
    this.percentScale
      .domain([this.min, this.max])
      .range([-Math.PI, 0]);

    // Update arc generator
    this.arc
      .innerRadius(this.radius - this.thickness)
      .outerRadius(this.radius);

    // Background arc
    this.container.append('path')
      .datum({ endAngle: 0 })
      .attr('class', 'gauge-background')
      .attr('d', this.arc)
      .attr('fill', this.backgroundColor);

    // Current value arc
    const valueArc = this.container.append('path')
      .datum({ endAngle: this.percentScale(this.min) })
      .attr('class', 'gauge-value')
      .attr('d', this.arc)
      .attr('fill', this.valueColor);

    // Animate the value arc
    if (this.animate) {
      valueArc.transition()
        .duration(1000)
        .attrTween('d', this.arcTween(this.percentScale(this.value), this.arc));
    } else {
      valueArc.datum({ endAngle: this.percentScale(this.value) })
        .attr('d', this.arc);
    }

    // Add target indicator
    if (this.target !== undefined) {
      this.addIndicator(this.target, this.targetColor, 'target');
    }

    // Add class average indicator
    if (this.classAverage !== undefined) {
      this.addIndicator(this.classAverage, this.classAvgColor, 'class-avg');
    }

    // Add state average indicator
    if (this.stateAverage !== undefined) {
      this.addIndicator(this.stateAverage, this.stateAvgColor, 'state-avg');
    }

    // Add current value text
    this.container.append('text')
      .attr('class', 'gauge-value-text')
      .attr('text-anchor', 'middle')
      .attr('dy', -this.radius / 2)
      .attr('fill', this.textColor)
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .text(`${this.value}${this.valueUnit}`);

    // Add label text
    if (this.label) {
      this.container.append('text')
        .attr('class', 'gauge-label')
        .attr('text-anchor', 'middle')
        .attr('dy', -this.radius / 2 + 25)
        .attr('fill', this.textColor)
        .attr('font-size', '14px')
        .text(this.label);
    }

    // Add min and max labels
    if (this.showLabels) {
      this.container.append('text')
        .attr('class', 'min-label')
        .attr('x', -this.radius)
        .attr('y', 0)
        .attr('text-anchor', 'start')
        .attr('font-size', '12px')
        .attr('fill', this.textColor)
        .text(`${this.min}${this.valueUnit}`);

      this.container.append('text')
        .attr('class', 'max-label')
        .attr('x', this.radius)
        .attr('y', 0)
        .attr('text-anchor', 'end')
        .attr('font-size', '12px')
        .attr('fill', this.textColor)
        .text(`${this.max}${this.valueUnit}`);
    }

    // Add title
    if (this.title) {
      this.svg.append('text')
        .attr('class', 'gauge-title')
        .attr('x', this.width / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('font-weight', '500')
        .attr('fill', this.textColor)
        .text(this.title);
    }
  }

  private addIndicator(value: number, color: string, className: string): void {
    const angle = this.percentScale(value);
    const [x1, y1] = this.polarToCartesian(this.radius - this.thickness, angle);
    const [x2, y2] = this.polarToCartesian(this.radius, angle);
    
    // Add indicator line
    this.container.append('line')
      .attr('class', `${className}-line`)
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', color)
      .attr('stroke-width', 2);
    
    // Add indicator circle
    this.container.append('circle')
      .attr('class', `${className}-circle`)
      .attr('cx', x2)
      .attr('cy', y2)
      .attr('r', 4)
      .attr('fill', color);
    
    // Add indicator label
    const [labelX, labelY] = this.polarToCartesian(this.radius + 15, angle);
    this.container.append('text')
      .attr('class', `${className}-label`)
      .attr('x', labelX)
      .attr('y', labelY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '10px')
      .attr('fill', color)
      .text(value);
  }

  private polarToCartesian(radius: number, angle: number): [number, number] {
    return [
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    ];
  }

  private arcTween(newAngle: number, arc: any) {
    return (d: any) => {
      const interpolate = d3.interpolate(d.endAngle, newAngle);
      return (t: number) => {
        d.endAngle = interpolate(t);
        return arc(d);
      };
    };
  }
}
