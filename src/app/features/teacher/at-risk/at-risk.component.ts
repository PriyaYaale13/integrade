import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For potential filters


// Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { stateAtRiskCart } from '../../../models/subject-selector.model';

// Shared/App Specific
import { HeaderComponent } from '../../../shared/components/header/header.component';


import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';


import { StateStudentListTableComponent } from '../../../models/subject-selector.model';
import { StudentListTableComponent } from '../../../shared/components/student-list-table/student-list-table.component';
import { AtRickCardComponent } from '../../../shared/components/at-risk-card/at-risk-card.component';
import { subjectSelector } from '../../../models/subject-selector.model';

import { BehaviorSubject } from 'rxjs';
import { AtService } from '../../../services/at.service';
import { SubjectSelectorComponent } from '../../../shared/components/subject-selector/subject-selector.component';


@Component({
  selector: 'app-at-risk',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HeaderComponent, SidebarComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule,
    SubjectSelectorComponent, StudentListTableComponent, AtRickCardComponent
  ],
  templateUrl: './at-risk.component.html',
  styleUrls: ['./at-risk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtRiskComponent implements OnInit {

  private atservice = inject(AtService);
  private loadingSubject = new BehaviorSubject(true);
  isLoading$ = this.loadingSubject.asObservable();
  studentList: StateStudentListTableComponent[] = [];
  stateAtRiskCart: stateAtRiskCart[] = [];
  subjectSelector: subjectSelector[] = [];
  filteredStudents$: StateStudentListTableComponent[] = [];

  selectedGrade = 'All Grades';
  selectedSubject = 'All Subjects';
  selectedRiskLevel = 'All Levels';
  selectedTimePeriod = 'All Time Periods';


  sidebarMenuItems: MenuItem[] = [
    {
      label: 'At Risk Students',
      icon: 'fa-solid fa-triangle-exclamation',
      route: '/teacher/at-risk'
    },
    {
      label: 'Interventions',
      icon: 'fa-solid fa-hands-holding-child',
      route: '/teacher/interventions'
    },
    {
      label: 'Behavior Assessment',
      icon: 'fa-solid fa-clipboard-check',
      route: '/teacher/behavior'
    },
    {
      label: 'IEP',
      icon: 'fa-solid fa-file-contract',
      route: '/teacher/iep'
    },
    {
      label: 'Academic Growth',
      icon: 'fa-solid fa-chart-line',
      route: '/teacher/growth'
    },
    {
      label: 'Prediction Tool',
      icon: 'fa-solid fa-lightbulb',
      route: '/teacher/predict'
    },
    {
      label: 'Course Proficiency',
      icon: 'fa-solid fa-graduation-cap',
      route: '/teacher/course-proficiency'
    },
    {
      label: 'State Assessment',
      icon: 'fa-solid fa-chart-bar',
      route: '/teacher/assessment/state'
    },
    {
      label: 'SAT/ACT',
      icon: 'fa-solid fa-chart-line',
      route: '/teacher/assessment/sat-act'
    },
    {
      label: 'Students Details Page',
      icon: 'fa-solid fa-school',
      route: '/teacher/students-details-page',
    }
  ];




  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.atservice.getStudentList().subscribe({
      next: (students) => {
        this.studentList = students;
        this.applyFilters();

        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.log(err);
        this.loadingSubject.next(false);
      }
    });
    this.atservice.getData().subscribe({
      next: (data) => {
        this.stateAtRiskCart = data;
        this.loadingSubject.next(false);
      }
    });



    ;
  }


  applyFilters() {
    this.filteredStudents$ = this.studentList.filter((student) => {
      const matchedGrade = this.selectedGrade === 'All Grades' || student.grade === this.selectedGrade;
      const matchedRiskLevel = this.selectedRiskLevel === 'All Levels' || student.riskLevel === this.selectedRiskLevel;
      return matchedGrade && matchedRiskLevel;
    });
  }


  trackByStudentId(index: number, student: StateStudentListTableComponent): number {
    return student.student_id;
  }


  onFiltersChanged(filters: subjectSelector) {
    this.selectedGrade = filters.grade;
    this.selectedRiskLevel = filters.riskLevel;
    this.applyFilters();
  }
}