import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { PerdictionService } from '../../../../../services/prediction.service';
import { RootData, studentDetails} from '../../../../../models/predictionTool.model';



@Component({
  selector: 'app-prediction-tool-filter-student',
  imports: [CommonModule,FormsModule],
  templateUrl: './prediction-tool-filter-student.component.html',
  styleUrl: './prediction-tool-filter-student.component.scss'
})
export class PredictionToolFilterStudentComponent implements OnInit {
  @Input() studentDetails: studentDetails[] = []; 
  @Input() title = '';
  @Output() searchQueryChange = new EventEmitter<string>(); 
  @Output() predictClick = new EventEmitter<string>();
  @Output() studentSelect = new EventEmitter<studentDetails>();
  @Output() scoreFilterChange = new EventEmitter<string>();
  scoreFilter = '';
  
  applyScoreFilter() {
    this.scoreFilterChange.emit(this.scoreFilter);
  }



  onPredictClick() {
    this.predictClick.emit(this.searchQuery);
  }
  

  selectStudent(student: studentDetails) {
    const classTitle = this.getClassTitle(student); 
    this.studentSelect.emit({ ...student, classTitle }); 
  }
  searchQuery= '';
  suggestions: studentDetails[] = [];
  constructor(private router: Router){};

students: studentDetails[] = [];
private data=inject(PerdictionService);
@Output() classChanged = new EventEmitter<string>();
allClasses: { title: string; students: studentDetails[] }[] = [];

ngOnInit(): void {
  this.data.getData().subscribe((data: RootData) => {
    this.allClasses = data.classes;
    this.students = data.classes.flatMap(c => c.students); 
    this.studentDetails = this.students;
    this.title = 'All Class Students';
  });
}

selectedClass= ''; 

onClassChange(event: Event) {
  const selectedTitle = (event.target as HTMLSelectElement).value;

  this.title = selectedTitle;
  this.selectedClass = selectedTitle;

  const selectedClass = this.allClasses.find(c => c.title === selectedTitle);
  this.students = selectedClass ? selectedClass.students : this.allClasses.flatMap(c => c.students);

  this.classChanged.emit(selectedTitle); 
  this.studentDetails = this.students;   
}

onClick(): void {
  const selectedTitle = this.selectedClass || 'All Class Students';
  const studentsToPredict = this.studentDetails.length ? this.studentDetails : this.students;

  this.title = selectedTitle === 'All Class Students' ? 'All Classes' : selectedTitle;

  this.router.navigate(['/teacher/prediction-class'], {
    state: {
      title: this.title,
      count: studentsToPredict.length,
      students: studentsToPredict
    }
  });
}



private filterStudents(query: string): studentDetails[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return this.students.filter(student =>
    student.name.toLowerCase().includes(lowerQuery) ||
    student.studentId.toString().includes(lowerQuery)
  );
}
getClassTitle(student: studentDetails): string {
  const foundClass = this.allClasses.find(c => c.students.includes(student));
  return foundClass?.title || 'Unknown Class';
}

  onSearch() {
    this.searchQueryChange.emit(this.searchQuery);
   this.suggestions = this.filterStudents(this.searchQuery);
    
  }
 
}