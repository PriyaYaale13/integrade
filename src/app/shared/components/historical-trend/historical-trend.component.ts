import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalTrend, HistoricalPeriod } from '../../../models/dashboard.model';

@Component({
  selector: 'app-historical-trend',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg p-6 shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold">Historical Trend</h2>
        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-full bg-[#4caf50]"></span>
            <span class="text-sm text-gray-600">Advanced</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-full bg-[#3f51b5]"></span>
            <span class="text-sm text-gray-600">Proficient</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-full bg-[#ff9800]"></span>
            <span class="text-sm text-gray-600">Basic</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-full bg-[#f44336]"></span>
            <span class="text-sm text-gray-600">Below Basic</span>
          </div>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <div class="grid grid-cols-3 gap-4">
          <div *ngFor="let period of getPeriods()" class="text-center">
            <h3 class="text-sm text-gray-600 mb-4">{{ period.name }}</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <div class="w-24 bg-gray-100 rounded-full h-2">
                  <div class="bg-[#4caf50] h-2 rounded-full" [style.width.%]="period.advanced"></div>
                </div>
                <span class="ml-2 text-sm">{{ period.advanced }}%</span>
              </div>
              <div class="flex items-center">
                <div class="w-24 bg-gray-100 rounded-full h-2">
                  <div class="bg-[#3f51b5] h-2 rounded-full" [style.width.%]="period.proficient"></div>
                </div>
                <span class="ml-2 text-sm">{{ period.proficient }}%</span>
              </div>
              <div class="flex items-center">
                <div class="w-24 bg-gray-100 rounded-full h-2">
                  <div class="bg-[#ff9800] h-2 rounded-full" [style.width.%]="period.basic"></div>
                </div>
                <span class="ml-2 text-sm">{{ period.basic }}%</span>
              </div>
              <div class="flex items-center">
                <div class="w-24 bg-gray-100 rounded-full h-2">
                  <div class="bg-[#f44336] h-2 rounded-full" [style.width.%]="period.belowBasic"></div>
                </div>
                <span class="ml-2 text-sm">{{ period.belowBasic }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HistoricalTrendComponent {
  @Input() historicalData!: HistoricalTrend;
  
  getPeriods(): HistoricalPeriod[] {
    if (!this.historicalData) return [];
    return Object.values(this.historicalData);
  }
} 