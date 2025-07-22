import { Component, OnInit } from '@angular/core';

import { PerdictionService } from '../../../services/prediction.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';


import {  studentDetails } from '../../../models/predictionTool.model';

import { Router } from '@angular/router';
import { PredictionsToolFactorsGuideComponent } from '../../teachers/components/prediction-tool-components/predictions-tool-factors-guide/predictions-tool-factors-guide.component';
import { PredictionToolFilterStudentComponent } from '../../teachers/components/prediction-tool-components/prediction-tool-filter-student/prediction-tool-filter-student.component';
import { PredictionsToolStudentTableComponent } from '../../teachers/components/prediction-tool-components/predictions-tool-student-table/predictions-tool-student-table.component';
import { firstValueFrom } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-prediction-tool',
  standalone: true,
  imports: [
  PredictionsToolFactorsGuideComponent,
  PredictionToolFilterStudentComponent,
  PredictionsToolStudentTableComponent,
  MatProgressSpinnerModule,
    CommonModule,
 

    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './prediction-tool.component.html',
  styleUrls: ['./prediction-tool.component.scss']
})
export class PredictionToolComponent implements OnInit {
  title ="";
  studentDetails: studentDetails[] = [];
  selectedCategory: 'present' | 'aboveAverage' | 'needSupport' | 'atRisk' = 'present';
  allClasses: string[] = [];
  classMap = new Map<string, studentDetails[]>();
  

  allStudentDetails: studentDetails[] = []; 
  categoryCounts = {
    present: 0,
    aboveAverage: 0,
    needSupport: 0,
    atRisk: 0
  };
  sidebarMenuItems: MenuItem[] = [
    { label: 'At Risk Students', icon: 'fa-solid fa-triangle-exclamation', route: '/teacher/at-risk' },
    { label: 'Interventions', icon: 'fa-solid fa-hands-holding-child', route: '/teacher/interventions' },
    { label: 'Behavior Assessment', icon: 'fa-solid fa-clipboard-check', route: '/teacher/behavior' },
    { label: 'IEP', icon: 'fa-solid fa-file-contract', route: '/teacher/iep' },
    { label: 'Academic Growth', icon: 'fa-solid fa-chart-line', route: '/teacher/growth' },
    { label: 'Prediction Tool', icon: 'fa-solid fa-lightbulb', route: '/teacher/predict' },
    { label: 'Course Proficiency', icon: 'fa-solid fa-graduation-cap', route: '/teacher/course-proficiency' },
    { label: 'State Assessment', icon: 'fa-solid fa-chart-bar', route: '/teacher/assessment/state' },
    { label: 'SAT/ACT', icon: 'fa-solid fa-chart-line', route: '/teacher/assessment/sat-act' },
    { label: 'Students Details Page', icon: 'fa-solid fa-school', route: '/teacher/students-details-page' }
  ];

  constructor(private dataService: PerdictionService,private router: Router) {}

  currentPage = 1;
  itemsPerPage = 5;
isLoading = false;
 async ngOnInit(): Promise<void> {
  this.isLoading = true;

  try {
    const data = await firstValueFrom(this.dataService.getData());

    this.allClasses = data.classes.map(c => c.title);
    this.allStudentDetails = data.classes.flatMap(c =>
      c.students.map(student => ({
        ...student,
        classTitle: c.title
      }))
    );

    this.title = 'All Class Students';
    this.studentDetails = [...this.allStudentDetails];
    this.categorizeStudents(this.studentDetails);

    console.log('Loaded students:', this.studentDetails.length);
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    this.isLoading = false;
  }
}


  onClassChange(selectedTitle: string): void {
    this.title = selectedTitle;

    if (selectedTitle === 'All Class Students') {
      
      this.studentDetails = [...this.allStudentDetails];
    } else {
      this.studentDetails = this.allStudentDetails.filter(student =>
        student.classTitle == selectedTitle
      );
    
    }
    
    this.categorizeStudents(this.studentDetails); 
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.studentDetails.length / this.itemsPerPage);
  }

  onSearchQueryChange(searchQuery: string): void {
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      this.studentDetails = this.allStudentDetails.filter(student =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.studentId.toString().includes(searchQuery)
      );
    } else {
      this.studentDetails = [...this.allStudentDetails]; 
    }
    this.categorizeStudents(this.studentDetails);
  }
 
  
   
  
  
  
   
  
  onCategoryChange(category: 'present' | 'aboveAverage' | 'needSupport' | 'atRisk'): void {
    this.selectedCategory = category;
    this.updateFilteredStudents();
  }
  
  updateFilteredStudents(): void {
    this.studentDetails = this.filteredStudents;
  }
  
 
  onPredictClick(searchQuery: string): void {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    
    const matchedStudents = this.allStudentDetails.filter(student =>
      student.name.toLowerCase() === trimmedQuery || 
      student.studentId.toString() === trimmedQuery
    );
  
    if (matchedStudents.length === 1) {
      const matched = matchedStudents[0];
      const predictionTitle = ` ${matched.classTitle}`;
    
      localStorage.setItem('selectedStudent', JSON.stringify(matched));
      localStorage.setItem('predictionTitle', predictionTitle);
    
      this.router.navigate(['/teacher/prediction-tool-results'], {
        state: {
          student: matched,
          title: predictionTitle,
          count: this.allStudentDetails.length,
        
        }
      });
    } else if (matchedStudents.length > 1) {
      alert('Multiple students found. Please enter the full name or ID.');
    } else {
      alert('No student found. Please check your input.');
    }
  }
  

  
  onStudentPredict(student: studentDetails): void {
    const predictionTitle = `${student.classTitle}`;

    localStorage.setItem('selectedStudent', JSON.stringify(student));
    localStorage.setItem('predictionTitle', predictionTitle);
    
    this.router.navigate(['/teacher/prediction-tool-results'], {
      state: {
        student,
        title: predictionTitle,
        count: this.allStudentDetails.length,
       
      }
    }).then(() => {
      window.location.reload(); 
    });
    
  }
  
  
categorizeStudents(students: studentDetails[]): void {
  this.categoryCounts = { present: 0, aboveAverage: 0, needSupport: 0, atRisk: 0 };

  students.forEach(student => {
    const mathScore = parseInt(student.math_prediction.replace('%', ''));
    const elaScore = parseInt(student.ela_prediction.replace('%', ''));


    if (mathScore >= 40 || elaScore >= 40) {
      this.categoryCounts.present++;
    }

   
    if (mathScore >= 70 && elaScore >= 70) {
      this.categoryCounts.aboveAverage++;
    }

    else if ((mathScore >= 50 || elaScore >= 50) && (mathScore < 70 || elaScore < 70) ) {
      this.categoryCounts.needSupport++;
    }

    else if (mathScore < 50 && elaScore < 50) {
      this.categoryCounts.atRisk++;
    }
  });
}

get filteredStudents(): studentDetails[] {
  return this.studentDetails.filter(student => {
    const math = parseInt(student.math_prediction.replace('%', ''));
    const ela = parseInt(student.ela_prediction.replace('%', ''));

    switch (this.selectedCategory) {
      case 'present':
        return math >= 50 || ela >= 50;
      case 'aboveAverage':
        return math >= 70 && ela >= 70;
      case 'needSupport':
        return (math >= 50 || ela >= 50) && (math < 70 || ela < 70) && !(math >= 70 && ela >= 70);
      case 'atRisk':
        return math < 50 && ela < 50;
    }
  });
}

onScoreFilterChange(threshold: string): void {
  if (!this.allStudentDetails || this.allStudentDetails.length === 0) {
    console.warn('Data not yet loaded.');
    return; 
  }

  if (!threshold) {
    this.studentDetails = [...this.allStudentDetails];
    this.categorizeStudents(this.studentDetails); 
    return;
  }

  const score = parseInt(threshold, 10);

  this.studentDetails = this.allStudentDetails.filter(student => {
    const mathScore = parseInt(student.math_prediction.replace('%', '').trim()) || 0;
    const elaScore = parseInt(student.ela_prediction.replace('%', '').trim()) || 0;
    return mathScore >= score && elaScore >= score;
  });

  this.categorizeStudents(this.studentDetails); 
}


}