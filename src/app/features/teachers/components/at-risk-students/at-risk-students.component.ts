import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Shared Components
import { PieChartComponent } from '../../../../shared/components/charts/pie-chart/pie-chart.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

// Models and Interfaces
interface AtRiskStudent {
  id: number;
  name: string;
  photo: string;
  grade: string;
  absenteeism: number;
  tardiness: number;
  behavioralIncidents: number;
  academicPerformance: number;
  riskScore: number;
  riskLevel: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-at-risk-students',
  templateUrl: './at-risk-students.component.html',
  styleUrls: ['./at-risk-students.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    PieChartComponent,
    DataTableComponent,
    SidebarComponent
  ]
})
export class AtRiskStudentsComponent {
  // Pie chart data for risk distribution
  riskDistributionData = [
    { label: 'High Risk', value: 12, color: '#ff4d4f' },
    { label: 'Medium Risk', value: 18, color: '#faad14' },
    { label: 'Low Risk', value: 35, color: '#52c41a' }
  ];

  // Sample data for at-risk students
  atRiskStudents: AtRiskStudent[] = [
    {
      id: 1,
      name: 'John Smith',
      photo: 'assets/images/students/student1.jpg',
      grade: '9th',
      absenteeism: 15,
      tardiness: 8,
      behavioralIncidents: 4,
      academicPerformance: 65,
      riskScore: 85,
      riskLevel: 'high'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      photo: 'assets/images/students/student2.jpg',
      grade: '10th',
      absenteeism: 8,
      tardiness: 3,
      behavioralIncidents: 1,
      academicPerformance: 75,
      riskScore: 55,
      riskLevel: 'medium'
    },
    {
      id: 3,
      name: 'Michael Brown',
      photo: 'assets/images/students/student3.jpg',
      grade: '9th',
      absenteeism: 2,
      tardiness: 1,
      behavioralIncidents: 0,
      academicPerformance: 92,
      riskScore: 15,
      riskLevel: 'low'
    },
    {
      id: 4,
      name: 'Sophia Davis',
      photo: 'assets/images/students/student4.jpg',
      grade: '11th',
      absenteeism: 12,
      tardiness: 6,
      behavioralIncidents: 3,
      academicPerformance: 68,
      riskScore: 78,
      riskLevel: 'high'
    },
    {
      id: 5,
      name: 'James Wilson',
      photo: 'assets/images/students/student5.jpg',
      grade: '10th',
      absenteeism: 7,
      tardiness: 4,
      behavioralIncidents: 2,
      academicPerformance: 78,
      riskScore: 42,
      riskLevel: 'medium'
    }
  ];

  // Table column configuration
  tableColumns: { 
    name: string, 
    property: string, 
    type: 'text' | 'numeric' | 'percentage' | 'date' | 'status' | 'action' | 'profile', 
    sortable: boolean 
  }[] = [
    { name: 'Student', property: 'name', type: 'profile', sortable: true },
    { name: 'Grade', property: 'grade', type: 'text', sortable: true },
    { name: 'Absenteeism', property: 'absenteeism', type: 'numeric', sortable: true },
    { name: 'Tardiness', property: 'tardiness', type: 'numeric', sortable: true },
    { name: 'Behavioral Incidents', property: 'behavioralIncidents', type: 'numeric', sortable: true },
    { name: 'Academic Performance', property: 'academicPerformance', type: 'percentage', sortable: true },
    { name: 'Risk Score', property: 'riskScore', type: 'numeric', sortable: true },
    { name: 'Risk Level', property: 'riskLevel', type: 'status', sortable: true }
  ];

  constructor(private router: Router) {}

  // Function to determine if a student is high risk (for row highlighting)
  highRiskCondition(item: any): boolean {
    return item.riskLevel === 'high';
  }

  // Handle row click event
  onRowClick(student: AtRiskStudent): void {
    console.log('Clicked on student:', student);
    // Navigate to student detail page or show modal with more information
    // this.router.navigate(['/teachers/student-detail', student.id]);
  }

  // Navigate back to the teachers dashboard
  navigateBack(): void {
    this.router.navigate(['/teachers']);
  }

  // Handle search input event
  onSearch(event: any): void {
    const searchValue = event.target.value;
    console.log('Search value:', searchValue);
    // Implement search functionality here
  }
}
