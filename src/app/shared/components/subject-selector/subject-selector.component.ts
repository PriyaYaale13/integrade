import { Component, EventEmitter, Output } from '@angular/core';
import { subjectSelector } from '../../../models/subject-selector.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-selector',
  imports: [ CommonModule,
    FormsModule,],
  templateUrl: './subject-selector.component.html',
  styleUrl: './subject-selector.component.scss'
})
export class SubjectSelectorComponent {
  subjectSelector :subjectSelector []=[];
  @Output() filtersChanges=new EventEmitter<subjectSelector>();
  selectedGrade = 'All Grades';
  selectedSubject = 'All Subjects';
  selectedRiskLevel = 'All Levels';
  selectedTimePeriod = 'All Time Periods';

onFilterUpdated(){
  this.filtersChanges.emit({
    grade: this.selectedGrade,
    subject: this.selectedSubject,
    riskLevel: this.selectedRiskLevel,
    timePeriod: this.selectedTimePeriod
  });
}



 
}