// src/app/core/layout/layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { SharedModule } from '../../shared/shared.module';
import { SharedModule } from '../../shared/shared.module';

// Import your components
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageHeaderComponent } from './page-header/page-header.component';

// Import Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    // Remove MainLayoutComponent from declarations if it's standalone
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    
    // Import MainLayoutComponent as a standalone component
    MainLayoutComponent,
    PageHeaderComponent,
    
    // Import Angular Material modules
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule
  ],
  exports: [
    MainLayoutComponent,
    PageHeaderComponent
  ]
})
export class LayoutModule { }

