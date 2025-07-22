import { Component, Input, Output, EventEmitter, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { PercentagePipe } from '../../pipes/percentage.pipe';

// Create a simple status indicator component if not already available
@Component({
  selector: 'app-status-indicator',
  standalone: true,
  template: `<div class="status-indicator" [ngClass]="status?.toLowerCase()">{{ status }}</div>`,
  styles: [`
    .status-indicator {
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
      text-align: center;
      font-weight: 500;
      font-size: 12px;
    }
    .active, .completed, .success, .approved { background-color: #e8f5e9; color: #2e7d32; }
    .pending, .in-progress, .warning { background-color: #fff8e1; color: #f57f17; }
    .inactive, .failed, .error, .rejected { background-color: #ffebee; color: #c62828; }
  `],
  imports: [CommonModule]
})
export class StatusIndicatorComponent {
  @Input() status: string | undefined;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    PercentagePipe,
    StatusIndicatorComponent
  ],
  animations: [
    trigger('expandRow', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: { 
    name: string, 
    property: string, 
    type?: 'text' | 'numeric' | 'percentage' | 'date' | 'status' | 'action' | 'profile', 
    sortable?: boolean 
  }[] = [];
  @Input() showPaginator: boolean = true;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() showFilter: boolean = true;
  @Input() selectable: boolean = false;
  @Input() expandable: boolean = false;
  @Input() expandedTemplate: any; // Template reference for expanded row
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No data available';
  @Input() tableClass: string = '';
  @Input() highlightRows: boolean = false;
  @Input() highlightCondition: (row: any) => boolean = () => false;
  @Input() rowLink: (row: any) => string | null = () => null;

  @Output() rowClicked = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<any[]>();
  @Output() actionClicked = new EventEmitter<{ action: string, row: any }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  expandedElement: any | null = null;
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.updateDisplayedColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }

    if (changes['columns']) {
      this.updateDisplayedColumns();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = [];
    
    if (this.selectable) {
      this.displayedColumns.push('select');
    }
    
    if (this.expandable) {
      this.displayedColumns.push('expand');
    }
    
    this.displayedColumns = [...this.displayedColumns, ...this.columns.map(col => col.property)];
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(row: any): void {
    this.rowClicked.emit(row);
  }

  onActionClick(action: string, row: any, event: Event): void {
    event.stopPropagation();
    this.actionClicked.emit({ action, row });
  }

  toggleExpandRow(row: any, event: Event): void {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  isExpanded = (row: any) => this.expandedElement === row;

  /** Selection methods */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    
    this.selectionChanged.emit(this.selection.selected);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  onCheckboxChange(): void {
    this.selectionChanged.emit(this.selection.selected);
  }

  isRowHighlighted(row: any): boolean {
    return this.highlightRows && this.highlightCondition(row);
  }

  getRowLink(row: any): string | null {
    return this.rowLink(row);
  }
}