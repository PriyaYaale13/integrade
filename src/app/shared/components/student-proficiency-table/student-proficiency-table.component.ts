import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { StudentProficiencyDetail } from '../../../models/dashboard.model';

type SortColumn = 'course' | 'proficiency' | 'grade' | null;
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-student-proficiency-table',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
      <div class="flex flex-col space-y-4 mb-4 sm:mb-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 class="text-lg font-semibold">Student Proficiency Details</h2>
          <button class="px-3 py-1.5 sm:px-4 sm:py-2 border border-[#3f51b5] text-[#3f51b5] rounded-lg text-sm whitespace-nowrap w-fit">
            <i class="fa-solid fa-filter mr-2"></i>Advanced Filters
          </button>
        </div>
        <div class="flex flex-col sm:flex-row flex-wrap gap-3">
          <select class="border rounded-lg px-3 py-2 bg-white text-sm max-w-full sm:max-w-[200px]" 
                  [(ngModel)]="selectedCourse" (change)="applyFilters()">
            <option value="All">All Courses</option>
            <option *ngFor="let course of courseOptions" [value]="course">{{ course }}</option>
          </select>
          <div class="flex flex-wrap gap-2">
            <!-- Advanced Button -->
            <button class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg filter-btn text-sm" 
                    [class.selected]="isProficiencySelected('Advanced')"
                    [class.bg-[#4caf50]]="isProficiencySelected('Advanced')"
                    [class.bg-opacity-10]="isProficiencySelected('Advanced')"
                    [class.text-[#4caf50]]="isProficiencySelected('Advanced')"
                    [class.bg-gray-100]="!isProficiencySelected('Advanced')"
                    [class.text-gray-600]="!isProficiencySelected('Advanced')"
                    (click)="toggleFilter('Advanced')">
              Advanced
              <i class="fa-solid fa-check ml-1 sm:ml-2" [style.opacity]="isProficiencySelected('Advanced') ? 1 : 0"></i>
            </button>
            
            <!-- Proficient Button -->
            <button class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg filter-btn text-sm" 
                    [class.selected]="isProficiencySelected('Proficient')"
                    [class.bg-[#3f51b5]]="isProficiencySelected('Proficient')"
                    [class.bg-opacity-10]="isProficiencySelected('Proficient')"
                    [class.text-[#3f51b5]]="isProficiencySelected('Proficient')"
                    [class.bg-gray-100]="!isProficiencySelected('Proficient')"
                    [class.text-gray-600]="!isProficiencySelected('Proficient')"
                    (click)="toggleFilter('Proficient')">
              Proficient
              <i class="fa-solid fa-check ml-1 sm:ml-2" [style.opacity]="isProficiencySelected('Proficient') ? 1 : 0"></i>
            </button>
            
            <!-- Basic Button -->
            <button class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg filter-btn text-sm" 
                    [class.selected]="isProficiencySelected('Basic')"
                    [class.bg-[#ff9800]]="isProficiencySelected('Basic')"
                    [class.bg-opacity-10]="isProficiencySelected('Basic')"
                    [class.text-[#ff9800]]="isProficiencySelected('Basic')"
                    [class.bg-gray-100]="!isProficiencySelected('Basic')"
                    [class.text-gray-600]="!isProficiencySelected('Basic')"
                    (click)="toggleFilter('Basic')">
              Basic
              <i class="fa-solid fa-check ml-1 sm:ml-2" [style.opacity]="isProficiencySelected('Basic') ? 1 : 0"></i>
            </button>
            
            <!-- Below Basic Button -->
            <button class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg filter-btn text-sm" 
                    [class.selected]="isProficiencySelected('Below Basic')"
                    [class.bg-[#f44336]]="isProficiencySelected('Below Basic')"
                    [class.bg-opacity-10]="isProficiencySelected('Below Basic')"
                    [class.text-[#f44336]]="isProficiencySelected('Below Basic')"
                    [class.bg-gray-100]="!isProficiencySelected('Below Basic')"
                    [class.text-gray-600]="!isProficiencySelected('Below Basic')"
                    (click)="toggleFilter('Below Basic')">
              Below Basic
              <i class="fa-solid fa-check ml-1 sm:ml-2" [style.opacity]="isProficiencySelected('Below Basic') ? 1 : 0"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-[650px]">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-gray-600">Student</th>
              <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-gray-600">
                <div class="flex items-center cursor-pointer" (click)="sort('course')">
                  Course
                  <i class="fa-solid ml-1 sm:ml-2" 
                     [class.fa-sort]="sortColumn !== 'course'"
                     [class.fa-sort-up]="sortColumn === 'course' && sortDirection === 'asc'"
                     [class.fa-sort-down]="sortColumn === 'course' && sortDirection === 'desc'"
                     [ngClass]="{
                       'text-gray-400': sortColumn !== 'course',
                       'text-[#3f51b5]': sortColumn === 'course'
                     }"></i>
                </div>
              </th>
              <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-gray-600">
                <div class="flex items-center cursor-pointer" (click)="sort('proficiency')">
                  Proficiency
                  <i class="fa-solid ml-1 sm:ml-2" 
                     [class.fa-sort]="sortColumn !== 'proficiency'"
                     [class.fa-sort-up]="sortColumn === 'proficiency' && sortDirection === 'asc'"
                     [class.fa-sort-down]="sortColumn === 'proficiency' && sortDirection === 'desc'"
                     [ngClass]="{
                       'text-gray-400': sortColumn !== 'proficiency',
                       'text-[#3f51b5]': sortColumn === 'proficiency'
                     }"></i>
                </div>
              </th>
              <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-gray-600">
                <div class="flex items-center cursor-pointer" (click)="sort('grade')">
                  Grade
                  <i class="fa-solid ml-1 sm:ml-2" 
                     [class.fa-sort]="sortColumn !== 'grade'"
                     [class.fa-sort-up]="sortColumn === 'grade' && sortDirection === 'asc'"
                     [class.fa-sort-down]="sortColumn === 'grade' && sortDirection === 'desc'"
                     [ngClass]="{
                       'text-gray-400': sortColumn !== 'grade',
                       'text-[#3f51b5]': sortColumn === 'grade'
                     }"></i>
                </div>
              </th>
              <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-gray-600">Trend</th>
              <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr *ngFor="let student of filteredStudents">
              <td class="px-3 py-2 sm:px-4 sm:py-3">
                <div class="flex items-center">
                  <img [src]="student.avatar" class="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3">
                  <span class="text-xs sm:text-sm">{{ student.name }}</span>
                </div>
              </td>
              <td class="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{{ student.course }}</td>
              <td class="px-3 py-2 sm:px-4 sm:py-3">
                <!-- Updated Proficiency Level Display -->
                <ng-container [ngSwitch]="student.proficiency">
                  <div *ngSwitchCase="'Advanced'" class="inline-block px-2 py-1 rounded-full bg-[#4caf50] bg-opacity-10 text-[#4caf50] text-center whitespace-nowrap text-xs sm:text-sm">
                    Advanced
                  </div>
                  <div *ngSwitchCase="'Proficient'" class="inline-block px-2 py-1 rounded-full bg-[#3f51b5] bg-opacity-10 text-[#3f51b5] text-center whitespace-nowrap text-xs sm:text-sm">
                    Proficient
                  </div>
                  <div *ngSwitchCase="'Basic'" class="inline-block px-2 py-1 rounded-full bg-[#ff9800] bg-opacity-10 text-[#ff9800] text-center whitespace-nowrap text-xs sm:text-sm">
                    Basic
                  </div>
                  <div *ngSwitchCase="'Below Basic'" class="inline-block px-2 py-1 rounded-full bg-[#f44336] bg-opacity-10 text-[#f44336] text-center whitespace-nowrap text-xs sm:text-sm">
                    Below Basic
                  </div>
                  <div *ngSwitchDefault class="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-center whitespace-nowrap text-xs sm:text-sm">
                    {{ student.proficiency }}
                  </div>
                </ng-container>
              </td>
              <td class="px-3 py-2 sm:px-4 sm:py-3 font-semibold text-xs sm:text-sm"
                  [ngClass]="{
                    'text-[#4caf50]': student.proficiency === 'Advanced',
                    'text-[#3f51b5]': student.proficiency === 'Proficient',
                    'text-[#ff9800]': student.proficiency === 'Basic',
                    'text-[#f44336]': student.proficiency === 'Below Basic'
                  }">
                {{ student.grade }}%
              </td>
              <td class="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                  [ngClass]="{
                    'text-[#4caf50]': student.trend === 'up',
                    'text-[#f44336]': student.trend === 'down',
                    'text-[#3f51b5]': student.trend === 'stable'
                  }">
                <i *ngIf="student.trend === 'up'" class="fa-solid fa-arrow-trend-up"></i>
                <i *ngIf="student.trend === 'down'" class="fa-solid fa-arrow-trend-down"></i>
                <i *ngIf="student.trend === 'stable'" class="fa-solid fa-equals"></i>
              </td>
              <td class="px-3 py-2 sm:px-4 sm:py-3">
                <div class="flex space-x-1 sm:space-x-2">
                  <button class="p-1 hover:bg-gray-100 rounded">
                    <i class="fa-solid fa-chart-line text-[#3f51b5] text-xs sm:text-sm"></i>
                  </button>
                  <button class="p-1 hover:bg-gray-100 rounded">
                    <i class="fa-solid fa-user text-[#4caf50] text-xs sm:text-sm"></i>
                  </button>
                  <button class="p-1 hover:bg-gray-100 rounded">
                    <i class="fa-solid fa-ellipsis-vertical text-gray-400 text-xs sm:text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .filter-btn {
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .filter-btn:hover {
      background-opacity: 0.2;
    }
    
    .filter-btn.selected {
      font-weight: 500;
    }
    
    .filter-btn i {
      transition: opacity 0.2s ease;
    }
    
    /* Mobile responsive styles */
    @media (max-width: 640px) {
      .filter-btn {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
      
      .filter-btn i {
        font-size: 0.75rem;
      }
    }
  `]
})
export class StudentProficiencyTableComponent {
  @Input() students: StudentProficiencyDetail[] = [];
  @Output() viewStudentDetails = new EventEmitter<StudentProficiencyDetail>();
  
  filteredStudents: StudentProficiencyDetail[] = [];
  selectedFilters = new Set<string>(['Advanced', 'Proficient']);
  selectedCourse = 'All';
  courseOptions: string[] = [];
  
  // Sorting
  sortColumn: SortColumn = null;
  sortDirection: SortDirection = 'asc';
  
  ngOnChanges() {
    this.updateCourseOptions();
    this.applyFilters();
  }
  
  updateCourseOptions() {
    if (!this.students || this.students.length === 0) return;
    
    // Get unique course names
    const courseSet = new Set<string>();
    this.students.forEach(student => courseSet.add(student.course));
    this.courseOptions = Array.from(courseSet);
  }
  
  applyFilters() {
    if (!this.students) {
      this.filteredStudents = [];
      return;
    }
    
    this.filteredStudents = this.students.filter(student => {
      // Filter by course
      const courseMatch = this.selectedCourse === 'All' || 
                         student.course === this.selectedCourse;
      
      // Filter by proficiency level
      const levelMatch = this.selectedFilters.has(student.proficiency);
      
      return courseMatch && levelMatch;
    });
    
    // Apply current sort if active
    if (this.sortColumn) {
      this.applySorting();
    }
  }
  
  toggleFilter(proficiency: string) {
    if (this.selectedFilters.has(proficiency)) {
      this.selectedFilters.delete(proficiency);
    } else {
      this.selectedFilters.add(proficiency);
    }
    this.applyFilters();
  }
  
  isProficiencySelected(proficiency: string): boolean {
    return this.selectedFilters.has(proficiency);
  }
  
  // Method to handle column sorting
  sort(column: SortColumn) {
    if (this.sortColumn === column) {
      // Toggle direction if same column clicked
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new column and default to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.applySorting();
  }
  
  // Apply the sorting to the filtered students
  private applySorting() {
    const direction = this.sortDirection === 'asc' ? 1 : -1;
    
    this.filteredStudents = [...this.filteredStudents].sort((a, b) => {
      if (this.sortColumn === 'course') {
        return a.course.localeCompare(b.course) * direction;
      } else if (this.sortColumn === 'proficiency') {
        // Map proficiency to numeric value for sorting
        const proficiencyOrder = {
          'Advanced': 4,
          'Proficient': 3,
          'Basic': 2,
          'Below Basic': 1
        };
        const aValue = proficiencyOrder[a.proficiency] || 0;
        const bValue = proficiencyOrder[b.proficiency] || 0;
        return (aValue - bValue) * direction;
      } else if (this.sortColumn === 'grade') {
        return (a.grade - b.grade) * direction;
      }
      return 0;
    });
  }
  
  onViewDetails(student: StudentProficiencyDetail) {
    this.viewStudentDetails.emit(student);
  }
} 