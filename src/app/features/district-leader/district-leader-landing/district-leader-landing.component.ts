import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  inject,
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
import { BehaviorSubject, combineLatest, map, take } from 'rxjs';
import * as ExcelJS from 'exceljs';
import { DistrictLeader, districtLeaderDataforFilter } from '../../../models/district.leader.model';
import { MenuItem, SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { DistrictService } from '../../../services/district.service';
import { Router } from '@angular/router';

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
  templateUrl: './district-leader-landing.component.html',
  styleUrls: ['./district-leader-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistrictLeaderComponent implements OnInit, AfterViewInit {
  Math = Math;
  private data= inject(DistrictService);
  @Input() set districtLeaders(value: DistrictLeader[]) {
    this.districtLeadersSubject.next(value);
  }
  @Output() filtersChanged = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get totalSchools() {
    return this.tier1Count + this.tier2Count + this.tier3Count;
  }
   selector:districtLeaderDataforFilter[]=[];
  
  calculateTierPercentage(count: number): number {
    if (this.totalSchools === 0) return 0;
    return Math.round((count / this.totalSchools) * 100);
  }
  constructor(  private router: Router,) {}
viewStudent(studentId: number) {
  console.log('Navigating to student:', studentId);
  this.router.navigate(['district-leader/principal-landing', studentId.toString()]);

}
  private districtLeadersSubject = new BehaviorSubject<DistrictLeader[]>([]);
  private searchTextSubject = new BehaviorSubject<string>('');
  private academicYearSubject = new BehaviorSubject<string>('');
  private gradeSubject = new BehaviorSubject<string>('');
  private subjectSubject = new BehaviorSubject<string>('');
  private schoolSubject = new BehaviorSubject<string>('');
  private pageSubject = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  });

  searchText = '';
  academicYear = 'All Academic Years';
grade = 'All Grades';
subject = 'All Subjects';
school = 'All Schools';

filteredDistrictLeaders$ = combineLatest([
  this.districtLeadersSubject.asObservable(),
  this.searchTextSubject.asObservable(),
  this.academicYearSubject.asObservable(),
  this.gradeSubject.asObservable(),
  this.subjectSubject.asObservable(),
  this.schoolSubject.asObservable()
]).pipe(
  map(([leaders, searchText, academicYear, grade, subject, school]) => {
    // Normalize "All" filters
    const normalizedYear = academicYear === 'All Academic Years' ? '' : academicYear;
    const normalizedGrade = grade === 'All Grades' ? '' : grade;
    const normalizedSubject = subject === 'All Subjects' ? '' : subject;
    const normalizedSchool = school === 'All Schools' ? '' : school;

    return leaders.filter((item) => {
      const matchesSearch = !searchText || item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesYear = !normalizedYear || item.academicYear === normalizedYear;
      const matchesGrade = !normalizedGrade || item.grade === normalizedGrade;
      const matchesSubject = !normalizedSubject || item.subject === normalizedSubject;
      const matchesSchool = !normalizedSchool || item.school === normalizedSchool;

      return matchesSearch && matchesYear && matchesGrade && matchesSubject && matchesSchool;
    });
  })
);



  paginatedDistrictLeaders$ = combineLatest([
    this.filteredDistrictLeaders$,
    this.pageSubject.asObservable()
  ]).pipe(
    map(([filteredSchools, pageEvent]) => {
      const start = pageEvent.pageIndex * pageEvent.pageSize;
      const end = start + pageEvent.pageSize;
      return filteredSchools.slice(start, end);
    })
  );
private  initialData: DistrictLeader[] = [];

  sidebarMenuItems: MenuItem[] = [
   
  ];

  // Added: Tier counts
  tier1Count = 0;
  tier2Count = 0;
  tier3Count = 0;
  subjects:districtLeaderDataforFilter[]=[];
  academicYears:districtLeaderDataforFilter[]=[];
  grades:districtLeaderDataforFilter[]=[];
  schools:districtLeaderDataforFilter[]=[];
  ngOnInit() {
   
    this.data.getdataforFilter().subscribe((data: any) => {

     this.subjects = data.subjects;
     this.schools = data.schools;
      this.academicYears = data.academicYears;
      this.grades = data.grades
      });
    this.data.getDistrictLeaders().subscribe((data: any) => {
      this.initialData = data;  
      this.districtLeadersSubject.next(data);
      this.calculateTierCounts(data); 
    });
    this.filteredDistrictLeaders$.subscribe(filtered => {
      this.calculateTierCounts(filtered);
    });
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
      academicYear: this.academicYear,
      grade: this.grade,
      subject: this.subject,
      school: this.school
    });

    this.searchTextSubject.next(this.searchText);
    this.academicYearSubject.next(this.academicYear);
    this.gradeSubject.next(this.grade);
    this.subjectSubject.next(this.subject);
    this.schoolSubject.next(this.school);

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
    this.filteredDistrictLeaders$.pipe(
      take(1) 
    ).subscribe((data) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('District Leaders');

      worksheet.columns = [
        { header: 'School Name', key: 'name', width: 30 },
        { header: 'Tier', key: 'tier', width: 15 },
        { header: 'Students', key: 'students', width: 15 },
        { header: 'Attendance (%)', key: 'attendance', width: 15 },
        { header: 'Performance (%)', key: 'performance', width: 15 },
        { header: 'Trend', key: 'trend', width: 15 },
        { header: 'Academic Year', key: 'academicYear', width: 15 },
        { header: 'Grade Level', key: 'grade', width: 15 },
        { header: 'Subject', key: 'subject', width: 15 },
      ];

      worksheet.addRows(data);

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(blob, 'district-leaders.xlsx');
      });
    });
  }

  private calculateTierCounts(data: DistrictLeader[]) {
    this.tier1Count = data.filter(d => d.tier === 'Tier 1').length;
    this.tier2Count = data.filter(d => d.tier === 'Tier 2').length;
    this.tier3Count = data.filter(d => d.tier === 'Tier 3').length;
  }
}