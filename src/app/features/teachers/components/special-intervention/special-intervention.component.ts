import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { BarChartComponent } from '../../../../shared/components/charts/bar-chart/bar-chart.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-special-intervention',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent,
    BarChartComponent
    //DataTableComponent
  ],
  templateUrl: './special-intervention.component.html',
  styleUrl: './special-intervention.component.scss'
})
export class SpecialInterventionComponent implements OnInit {
  // Chart data for the intervention summary report
  chartData = [
    // Not On Track values (red) - listing these first to ensure they get the first color in the color array
    { label: 'Maths Intervention', value: 20, category: 'Not On Track', color: '#FF6347' },
    { label: 'Literacy Intervention', value: 30, category: 'Not On Track', color: '#FF6347' },
    { label: 'Emotional Management', value: 40, category: 'Not On Track', color: '#FF6347' },
    { label: 'Attendance', value: 10, category: 'Not On Track', color: '#FF6347' },
    
    // On Track values (green)
    { label: 'Maths Intervention', value: 80, category: 'On Track', color: '#228B22' },
    { label: 'Literacy Intervention', value: 70, category: 'On Track', color: '#228B22' },
    { label: 'Emotional Management', value: 60, category: 'On Track', color: '#228B22' },
    { label: 'Attendance', value: 90, category: 'On Track', color: '#228B22' }
  ];

  // Table data for intervention progress
  tableData = [
    {
      student: 'Mathew Wang',
      semester: 'Winter Semester',
      mathStart: 75,
      mathCurrent: 77,
      mathStatus: 'Not on Track',
      literacyStart: 65,
      literacyCurrent: 89,
      literacyStatus: 'On Track',
      emotionalStart: 3,
      emotionalCurrent: 0,
      emotionalStatus: 'On Track',
      attendanceStart: 6,
      attendanceCurrent: 3,
      attendanceStatus: 'Not on Track'
    },
    {
      student: 'Kris Tobin',
      semester: 'Winter Semester',
      mathStart: null,
      mathCurrent: null,
      mathStatus: null,
      literacyStart: null,
      literacyCurrent: null,
      literacyStatus: null,
      emotionalStart: null,
      emotionalCurrent: null,
      emotionalStatus: null,
      attendanceStart: null,
      attendanceCurrent: null,
      attendanceStatus: null
    },
    {
      student: 'James Kross',
      semester: 'Winter Semester',
      mathStart: null,
      mathCurrent: null,
      mathStatus: null,
      literacyStart: null,
      literacyCurrent: null,
      literacyStatus: null,
      emotionalStart: null,
      emotionalCurrent: null,
      emotionalStatus: null,
      attendanceStart: null,
      attendanceCurrent: null,
      attendanceStatus: null
    }
  ];

  // Table columns configuration
  tableColumns = [
    { name: 'Student/Semester', property: 'student', type: 'text', sortable: true },
    { name: 'Math Start', property: 'mathStart', type: 'numeric', sortable: true },
    { name: 'Math Current', property: 'mathCurrent', type: 'numeric', sortable: true },
    { name: 'Math Status', property: 'mathStatus', type: 'status', sortable: true },
    { name: 'Literacy Start', property: 'literacyStart', type: 'numeric', sortable: true },
    { name: 'Literacy Current', property: 'literacyCurrent', type: 'numeric', sortable: true },
    { name: 'Literacy Status', property: 'literacyStatus', type: 'status', sortable: true },
    { name: 'Emotional Start', property: 'emotionalStart', type: 'numeric', sortable: true },
    { name: 'Emotional Current', property: 'emotionalCurrent', type: 'numeric', sortable: true },
    { name: 'Emotional Status', property: 'emotionalStatus', type: 'status', sortable: true },
    { name: 'Attendance Start', property: 'attendanceStart', type: 'numeric', sortable: true },
    { name: 'Attendance Current', property: 'attendanceCurrent', type: 'numeric', sortable: true },
    { name: 'Attendance Status', property: 'attendanceStatus', type: 'status', sortable: true }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Any initialization code if needed
  }

  goBack(): void {
    // Navigate back or to a specific route
    this.router.navigate(['/teachers']);
  }
}
