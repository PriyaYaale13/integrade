import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherDataService } from '../../services/teacher-data.service';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Child Components
import { ClassReportComponent } from '../../components/class-report/class-report.component';
import { StateAssessmentComponent } from '../../components/state-assessment/state-assessment.component';
import { CourseProficiencyComponent } from '../../components/course-proficiency/course-proficiency.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-teachers-dashboard',
  templateUrl: './teachers-dashboard.component.html',
  styleUrls: ['./teachers-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    ClassReportComponent,
    StateAssessmentComponent,
    CourseProficiencyComponent,
    SidebarComponent,
  ]
})
export class TeachersDashboardComponent implements OnInit {
  @ViewChild(SidebarComponent) sidebar?: SidebarComponent;
  sidebarCollapsed = false;
  isMobile = window.innerWidth < 768;
  
  proficientStudents: any[] = [
    { name: 'Class Average', semester1: 98, semester2: 96, semester3: null },
    { name: 'Mike basset', semester1: 95, semester2: 94, semester3: null },
    { name: 'Ade Bendel', semester1: 99, semester2: 95, semester3: null }
  ];
  
  displayedColumns: string[] = ['name', 'semester1', 'semester2', 'semester3'];

  constructor(private teacherDataService: TeacherDataService) { }

  ngOnInit(): void {
    // Load the dashboard data
    this.loadDashboardData();
    
    // Handle window resize events for responsive behavior
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }
  
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile && !this.sidebarCollapsed && this.sidebar) {
      this.sidebar.toggleSidebar();
    }
  }
  
  onSidebarCollapsed(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }
  
  toggleMobileSidebar() {
    if (this.sidebar) {
      this.sidebar.toggleSidebar();
    }
  }

  loadDashboardData(): void {
    // In a real app, this would fetch data from the service
    // this.teacherDataService.getDashboardData().subscribe(data => {
    //   // Process the data
    // });
  }
}
