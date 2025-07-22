
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, combineLatest, map ,take} from 'rxjs';
import * as ExcelJS from 'exceljs';  
import { Award } from '../../../models/award.model'; 
import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';


@Component({
  selector: 'app-award-recognition',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    SidebarComponent,
  ],
  templateUrl: './award-recognition.component.html',
  styleUrls: ['./award-recognition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwardRecognitionComponent implements OnInit, AfterViewInit {
  Math = Math;

  @Input() set awards(value: Award[]) {
    this.awardsSubject.next(value);
  }

  @Output() filtersChanged = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private awardsSubject = new BehaviorSubject<Award[]>([]);
  private searchTextSubject = new BehaviorSubject<string>('');
  private gradeSubject = new BehaviorSubject<string>('');
  private awardTypeSubject = new BehaviorSubject<string>('');
  private termSubject = new BehaviorSubject<string>('');
  private pageSubject = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  });

  filteredAwards$ = combineLatest([
    this.awardsSubject.asObservable(),
    this.searchTextSubject.asObservable(),
    this.gradeSubject.asObservable(),
    this.awardTypeSubject.asObservable(),
    this.termSubject.asObservable(),
  ]).pipe(
    map(([awards, searchText, grade, awardType, term]) => {
      return awards.filter((student) => {
        const matchesSearch =
          student.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
          student.id.includes(searchText);
        const matchesGrade = !grade || student.grade === grade;
        const matchesAward = !awardType || student.awards.includes(awardType);
        const matchesTerm = !term || student.term === term;

        return matchesSearch && matchesGrade && matchesAward && matchesTerm;
      });
    })
  );

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


  paginatedAwards$ = combineLatest([
    this.filteredAwards$,
    this.pageSubject.asObservable(),
  ]).pipe(
    map(([filteredAwards, pageEvent]) => {
      const start = pageEvent.pageIndex * pageEvent.pageSize;
      const end = start + pageEvent.pageSize;
      return filteredAwards.slice(start, end);
    })
  );

  searchText = '';
  grade = '';
  awardType = '';
  term = '';

  ngOnInit() {
    this.awardsSubject.next([
      {
        id: '2025001',
        studentName: 'Emma Thompson',
        grade: '12th',
        gpa: 3.95,
        awards: ['Higher Honor Roll', 'Leadership'],
        activities: ['Student Council', 'Debate Team'],
        status: 'Current',
        avatar:
          'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        term: 'Q1',
      },
      {
        id: '2025042',
        studentName: 'James Wilson',
        grade: '11th',
        gpa: 3.65,
        awards: ['Honor Roll', 'Citizenship'],
        activities: ['Sports Captain', 'Volunteer Club'],
        status: 'Current',
        avatar:
          'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
        term: 'Q2',
      },
      ...Array.from({ length: 40 }, (_, i) => ({
        id: `20250${i + 3}`,
        studentName: `Student ${i + 3}`,
        grade: i % 2 === 0 ? '11th' : '12th',
        gpa: +(3 + Math.random()).toFixed(2),
        awards: ['Honor Roll'],
        activities: ['Club A', 'Club B'],
        status: 'Current',
        avatar:
          'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
        term: i % 2 === 0 ? 'Q1' : 'Q2',
      })),
    ]);
  }

  ngAfterViewInit() {
    this.pageSubject.next({
      pageIndex: 0,
      pageSize: 10,
      length: 0,
    });
  }

  emitFilters() {
    this.filtersChanged.emit({
      searchText: this.searchText,
      grade: this.grade,
      awardType: this.awardType,
      term: this.term,
    });

    this.searchTextSubject.next(this.searchText);
    this.gradeSubject.next(this.grade);
    this.awardTypeSubject.next(this.awardType);
    this.termSubject.next(this.term);

    this.pageSubject.next({
      pageIndex: 0,
      pageSize: this.pageSubject.value.pageSize,
      length: 0,
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSubject.next(event);
  }

  get currentPage() {
    return this.pageSubject.value.pageIndex;
  }

  get pageSize() {
    return this.pageSubject.value.pageSize;
  }

  exportToExcel(): void {
    this.filteredAwards$.pipe(
      take(1) 
    ).subscribe((data) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Awards');

      worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'ID', key: 'id', width: 20 },
        { header: 'Grade', key: 'grade', width: 15 },
        { header: 'GPA', key: 'gpa', width: 10 },
        { header: 'Awards', key: 'awards', width: 30 },
        { header: 'Activities', key: 'activities', width: 30 },
        { header: 'Status', key: 'status', width: 20 },
        { header: 'Term', key: 'term', width: 10 },
      ];

      data.forEach((award) => {
        worksheet.addRow({
          name: award.studentName,
          id: award.id,
          grade: award.grade,
          gpa: award.gpa,
          awards: award.awards.join(', '),
          activities: award.activities.join(', '),
          status: award.status,
          term: award.term,
        });
      });

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Award_Recognition.xlsx');
      });
    });
  }
}
