import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CourseBreakdown, CourseBreakdownItem } from '../../../models/dashboard.model';

@Component({
  selector: 'app-course-breakdown',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg p-6 shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold">Course Breakdown</h2>
        <mat-form-field appearance="outline" class="w-48">
          <mat-select [(ngModel)]="selectedCourse" (selectionChange)="onCourseChange()">
            <mat-option value="all">All Courses</mat-option>
            <mat-option *ngFor="let course of getCourseOptions()" [value]="course">{{ course }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div class="space-y-4">
        <div *ngFor="let course of filteredCourses" class="p-4 rounded-lg bg-gray-50">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <span class="text-gray-600 mr-2">{{ course.name }}</span>
              <button class="text-gray-400 hover:text-gray-600" (click)="onCourseDetailClick(course)">
                <i class="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1">
                <span class="w-3 h-3 rounded-full bg-[#4caf50]"></span>
                <span class="text-sm">Advanced ({{ course.advanced }}%)</span>
              </div>
              <div class="flex items-center space-x-1">
                <span class="w-3 h-3 rounded-full bg-[#3f51b5]"></span>
                <span class="text-sm">Proficient ({{ course.proficient }}%)</span>
              </div>
            </div>
          </div>
          <div class="w-full h-2 rounded-full overflow-hidden flex">
            <div class="bg-[#4caf50] h-full" [style.width.%]="course.advanced"></div>
            <div class="bg-[#3f51b5] h-full" [style.width.%]="course.proficient"></div>
            <div class="bg-[#ff9800] h-full" [style.width.%]="course.basic"></div>
            <div class="bg-[#f44336] h-full" [style.width.%]="course.belowBasic"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }
    
    ::ng-deep .mat-form-field {
      margin-bottom: -1.25em;
    }
  `]
})
export class CourseBreakdownComponent {
  @Input() courses!: CourseBreakdown;
  @Output() courseClick = new EventEmitter<CourseBreakdownItem>();
  
  selectedCourse = 'all';
  filteredCourses: CourseBreakdownItem[] = [];
  
  ngOnChanges() {
    this.updateFilteredCourses();
  }
  
  updateFilteredCourses() {
    if (!this.courses) return;
    
    this.filteredCourses = Object.values(this.courses);
    
    if (this.selectedCourse !== 'all') {
      this.filteredCourses = this.filteredCourses.filter(
        course => course.name.toLowerCase() === this.selectedCourse.toLowerCase()
      );
    }
  }
  
  getCourseOptions(): string[] {
    if (!this.courses) return [];
    return Object.values(this.courses).map(course => course.name);
  }
  
  onCourseChange() {
    this.updateFilteredCourses();
  }
  
  onCourseDetailClick(course: CourseBreakdownItem) {
    this.courseClick.emit(course);
  }
} 