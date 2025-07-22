import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { InterventionStudent, InterventionType, InterventionTypeFilter } from '../../../../models/intervention.model';
import { DataService } from '../../../../services/data.service';
import { ProgressChartComponent } from '../../../../shared/components/charts/progress-chart/progress-chart.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { MenuItem, SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-student-interventions',
  templateUrl: './student-interventions.component.html',
  styleUrls: ['./student-interventions.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule, MatPaginatorModule, ProgressChartComponent,
    MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatTooltipModule, SidebarComponent]
})
export class StudentInterventionsComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService);
  studentDetails!: InterventionStudent;
  studentInterventionType: InterventionType | null = null;  // Store a single intervention type object
  studentInterventionTypes: string[] = [];
  currentFilters: InterventionTypeFilter = { type: '' };
  subscriptionList: Subscription[] = [];

  sidebarMenuItems: MenuItem[] = [
    {
      label: 'At Risk Students',
      icon: 'fa-solid fa-triangle-exclamation',
      route: '/principal/principal-at-risk'
    },
    {
      label: 'Interventions',
      icon: 'fa-solid fa-hands-holding-child',
      route: '/principal/teacher-interventions'
    },
    {
      label: 'Behavior Assessment',
      icon: 'fa-solid fa-clipboard-check',
      route: '/principal/teacher-behavior'
    },
    {
      label: 'IEP',
      icon: 'fa-solid fa-file-contract',
      route: '/principal/teacher-iep'
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
      label: 'Assessment Views',
      icon: 'fa-solid fa-chart-bar',
      route: '/teacher/assessment/state'
    },
    {
      label: 'SAT/ACT',
      icon: 'fa-solid fa-chart-line',
      route: '/principal/teacher-sat-act'
    },
    {
      label: 'Students Details Page',
      icon: 'fa-solid fa-chalkboard-teacher',
      route: '/teacher/students-details-page/1',
    }
  ]

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.subscriptionList.push(this.dataService.getStudentInterventionById(id).subscribe((data) => {
          if (data) {
            this.studentDetails = data;
            this.studentInterventionTypes = data.interventionTypes?.map((intervention: any) => intervention.type);
            this.currentFilters.type = this.studentInterventionTypes[0];
            this.applyFilters();
          }
        }));
      }
    });
  }

  applyFilters(): void {
    // If the filter type is not set, show no intervention type (null)
    if (this.currentFilters.type) {
      // Filter by the selected type and take the first matching intervention
      const filteredIntervention = this.studentDetails?.interventionTypes
        .find((intervention: any) => intervention.type === this.currentFilters.type);
      if (filteredIntervention) {
        this.studentInterventionType = filteredIntervention;  // Store the single intervention type object
      } else {
        this.studentInterventionType = null;  // No intervention found, set to null
      }
    } else {
      this.studentInterventionType = null;  // If no filter is selected, set to null (or fetch all interventions if needed)
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(subscrition => subscrition.unsubscribe());
  }
}
