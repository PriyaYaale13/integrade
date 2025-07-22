import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  StateBehaviors, stateGrades, stateNotes } from '../../../models/subject-selector.model';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-academic-detail-card-with-recommendations',
  imports: [CommonModule, MatCheckboxModule,FormsModule ],
  templateUrl:'./academic-detail-card-with-recommendations.component.html',
  styleUrl: './academic-detail-card-with-recommendations.component.scss'
})
export class AcademicDetailCardWithRecommendationsComponent {
 
  @Input() grades:stateGrades[] = [];
  @Input() behaviors:StateBehaviors[]=[];
  @Input() activeTabIndex = 0;
@Input() notes:stateNotes[]=[];
  @Output() tabChanged = new EventEmitter<number>();
  addEmptyNote() {
    const newNote: stateNotes = {
      id: this.notes.length + 1,
      date: new Date().toISOString().split('T')[0],
      teacher: '',
      subject: '',
      content: '',
      type: 'Academic',
      isEditing: true
    };
    this.notes.push(newNote);
  }
  
  editNote(note: stateNotes) {
    note.isEditing = true;
  }
  
  saveNote(note: stateNotes) {
    note.isEditing = false;
  }
  
  cancelEdit(note: stateNotes) {
    note.isEditing = false;
  }
  
  deleteNote(noteId: number) {
    this.notes = this.notes.filter(n => n.id !== noteId);
  }
  
  

  
  setActiveTab(index: number): void {
    this.activeTabIndex = index;
    this.tabChanged.emit(index);
  }
  
  getGradeColor(percentage: number): string {
    return percentage >= 70 ? '#ff9800' : 'red';
  }

  getTrendIcon(trend: string): string {
    return trend === 'up' ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
  }

  getTrendColor(trend: string): string {
    return trend === 'up' ? '#4caf50' : 'red';
  }
  
  // Add method to handle mobile dropdown change
  onMobileTabChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex - 1; // Assuming first option is a placeholder
    if (selectedIndex >= 0) {
      this.setActiveTab(selectedIndex);
    }
  }
  
  }