// src/app/shared/components/metric-card/metric-card.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss']
})
export class MetricCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() suffix: string = '';
  @Input() target?: number;
  @Input() trend?: number;
  @Input() showTrend: boolean = false;
  @Input() isPercentage: boolean = false;
  @Input() colorByValue: boolean = true;
  @Input() thresholds: { danger: number, warning: number, success: number } = {
    danger: 70,
    warning: 85,
    success: 90
  };
  @Input() reverseThresholds: boolean = false; // For metrics where lower is better
  @Input() icon?: string;
  @Input() route?: string;

  valueClass: string = '';

  ngOnInit(): void {
    this.calculateValueClass();
  }

  private calculateValueClass(): void {
    if (!this.colorByValue) {
      return;
    }

    if (this.reverseThresholds) {
      if (this.value <= this.thresholds.danger) {
        this.valueClass = 'danger';
      } else if (this.value <= this.thresholds.warning) {
        this.valueClass = 'warning';
      } else {
        this.valueClass = 'success';
      }
    } else {
      if (this.value < this.thresholds.danger) {
        this.valueClass = 'danger';
      } else if (this.value < this.thresholds.warning) {
        this.valueClass = 'warning';
      } else {
        this.valueClass = 'success';
      }
    }
  }

  get displayValue(): string {
    if (this.isPercentage) {
      return `${this.value}%`;
    }
    return `${this.value}${this.suffix}`;
  }

  get trendIcon(): string {
    if (!this.trend) return '';
    return this.trend > 0 ? 'trending_up' : 'trending_down';
  }

  get trendClass(): string {
    if (!this.trend) return '';
    const isPositiveTrend = this.trend > 0;
    return this.reverseThresholds ? 
      (isPositiveTrend ? 'negative' : 'positive') : 
      (isPositiveTrend ? 'positive' : 'negative');
  }
}
