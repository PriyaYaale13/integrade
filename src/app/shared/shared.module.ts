// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';

// Components
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
//import { StatusIndicatorComponent } from './components/status-indicator/status-indicator.component';
//import { SectionContainerComponent } from './components/section-container/section-container.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { ComparisonGaugeComponent } from './components/charts/comparison-gauge/comparison-gauge.component';
//import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from '../core/layout/page-header/page-header.component';
//import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Pipes
import { PercentagePipe } from './pipes/percentage.pipe';
//import { TruncatePipe } from './pipes/truncate.pipe';
//import { SafeHtmlPipe } from './pipes/safe-html.pipe';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
//import { HasRoleDirective } from './directives/has-role.directive';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatChipsModule,
  MatBadgeModule,
  MatExpansionModule
];

const components = [
  MetricCardComponent,
  DataTableComponent,
  FilterBarComponent,
  //StatusIndicatorComponent,
  //SectionContainerComponent,
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  ComparisonGaugeComponent,
  //LoadingSpinnerComponent,
  PageHeaderComponent,
  //ConfirmDialogComponent
];

const pipes = [
  PercentagePipe,
  //TruncatePipe,
  //SafeHtmlPipe
];

const directives = [
  ClickOutsideDirective,
  //HasRoleDirective
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...materialModules,
    ...components,
    ...pipes,
    ...directives,
    MetricCardComponent,
    DataTableComponent,
    FilterBarComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ComparisonGaugeComponent,
    SidebarComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...materialModules,
    ...components,
    ...pipes,
    ...directives,
    MetricCardComponent,
    DataTableComponent,
    FilterBarComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ComparisonGaugeComponent,
    SidebarComponent
  ]
})
export class SharedModule { }