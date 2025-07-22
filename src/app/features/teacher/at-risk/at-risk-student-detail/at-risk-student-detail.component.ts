import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { StudentProfileHeaderComponent } from '../../../../shared/components/student-profile-header/student-profile-header.component';
import { StateBehaviors, StateStudentListTableComponent, stateGrades, stateNotes } from '../../../../models/subject-selector.model';


import { AcademicDetailCardWithRecommendationsComponent } from '../../../../shared/components/academic-detail-card-with-recommendations/academic-detail-card-with-recommendations.component';
import { MenuItem, SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';


import { ActivatedRoute, RouterLink } from '@angular/router';
import { AtService } from '../../../../services/at.service';
import { StudentKpisAndDetailsComponent } from '../../../../shared/components/student-kpis-and-details/student-kpis-and-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-at-risk-student-detail',
  imports: [HeaderComponent,MatProgressSpinnerModule,CommonModule, SidebarComponent, StudentProfileHeaderComponent, StudentKpisAndDetailsComponent, AcademicDetailCardWithRecommendationsComponent,RouterLink],
  templateUrl: './at-risk-student-detail.component.html',
  styleUrl: './at-risk-student-detail.component.scss'
})
export class AtRiskStudentDetailComponent implements OnInit {
  studentId!: number;
  studentList: StateStudentListTableComponent[] = [];
  grades: stateGrades[] = [];
  behaviors: StateBehaviors[] = [];
  
  notes: stateNotes[] = [];
  constructor(private route: ActivatedRoute) { }
  private atService = inject(AtService)


isLoading = true;
  
  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      this.studentId = +params.get('id')!;
      this.getStudentData();
    });

    forkJoin({
      grades: this.atService.getGrades(),
      behaviors: this.atService.getBehaviors(),
      notes: this.atService.getNotes()
    }).subscribe({
      next: (response) => {
      
        this.grades = response.grades;
        this.behaviors = response.behaviors;
        this.notes = response.notes;

    
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      
        this.isLoading = false;
      }
    });
  }
  tabIndex = 0;

  onTabChanged(index: number): void {
    console.log('Tab changed to', index);
    this.tabIndex = index;
  }
  
  getStudentData(): void {
    this. atService.getStudentList().subscribe(data => {
      this.studentList = data.filter(student => student.student_id === this.studentId);
    });
  }
  
 
 
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

}