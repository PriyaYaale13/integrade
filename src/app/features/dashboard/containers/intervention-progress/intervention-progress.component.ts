// src/app/features/dashboard/containers/intervention-progress/intervention-progress.component.ts
import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';

interface InterventionSummary {
  type: string;
  onTrackPercentage: number;
  notOnTrackPercentage: number;
}

@Component({
  selector: 'app-intervention-progress',
  templateUrl: './intervention-progress.component.html',
  styleUrls: ['./intervention-progress.component.scss']
})
export class InterventionProgressComponent implements OnInit {
  isLoading = false;
  interventionSummaries: InterventionSummary[] = [];
  
  studentInterventions = [
    {
      student: 'Mathew Wang',
      interventions: [
        {
          type: 'Math intervention',
          start: 75,
          current: 77,
          target: 85,
          status: 'Not on Track'
        },
        {
          type: 'Literacy intervention',
          start: 65,
          current: 89,
          target: 85,
          status: 'On Track'
        },
        {
          type: 'Emotional management',
          start: 3,
          current: 0,
          target: 0,
          status: 'On Track'
        },
        {
          type: 'Attendance',
          start: 6,
          current: 3,
          target: 0,
          status: 'Not on Track'
        }
      ]
    },
    {
      student: 'Kris Tobin',
      interventions: []
    },
    {
      student: 'James Kross',
      interventions: []
    }
  ];
  
  displayedColumns: string[] = ['student', 'mathIntervention', 'literacyIntervention', 'emotionalManagement', 'attendance'];
  
  barChartData = [];

  constructor(private interventionService: InterventionService) {}

  ngOnInit(): void {
    this.loadInterventionSummary();
  }

  loadInterventionSummary(): void {
    this.isLoading = true;
    
    this.interventionService.getInterventionSummary().subscribe({
      next: (data) => {
        this.interventionSummaries = [
          {
            type: 'Maths intervention',
            onTrackPercentage: data.mathsIntervention.onTrack,
            notOnTrackPercentage: data.mathsIntervention.notOnTrack
          },
          {
            type: 'Literacy Intervention',
            onTrackPercentage: data.literacyIntervention.onTrack,
            notOnTrackPercentage: data.literacyIntervention.notOnTrack
          },
          {
            type: 'Emotional management',
            onTrackPercentage: data.emotionalManagement.onTrack,
            notOnTrackPercentage: data.emotionalManagement.notOnTrack
          },
          {
            type: 'Attendance',
            onTrackPercentage: data.attendance.onTrack,
            notOnTrackPercentage: data.attendance.notOnTrack
          }
        ];
        
        this.updateChartData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading intervention summary:', error);
        this.isLoading = false;
      }
    });
  }

  private updateChartData(): void {
    const onTrackData = this.interventionSummaries.map(summary => ({
      label: summary.type,
      value: summary.onTrackPercentage,
      color: '#4caf50',
      category: 'On Track'
    }));
    
    const notOnTrackData = this.interventionSummaries.map(summary => ({
      label: summary.type,
      value: summary.notOnTrackPercentage,
      color: '#f44336',
      category: 'Not On Track'
    }));
    
    this.barChartData = [...onTrackData, ...notOnTrackData];
  }

  getStatusClass(status: string): string {
    return status === 'On Track' ? 'status-on-track' : 'status-not-on-track';
  }

  getProgressPercentage(intervention: any): number {
    const start = intervention.start;
    const target = intervention.target;
    const current = intervention.current;
    
    if (start === target) {
      return 100;
    }
    
    const totalProgress = Math.abs(target - start);
    const currentProgress = Math.abs(current - start);
    
    return Math.min(Math.round((currentProgress / totalProgress) * 100), 100);
  }
}