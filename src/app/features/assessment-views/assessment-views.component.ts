import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../shared/components/header/header.component'; // Include header for consistency

@Component({
  selector: 'app-data-sources',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent {
  constructor(private location: Location) {}

  dataSources = [ // From Page 2
    'Power School SIS – Schoology, infi campus',
    'Social Studies and Science - Tide, DESSA',
    'Math & ELA - Smarter balance',
    'Clinic',
    'Cafeteria',
    'SAT/ACT',
    'State Assessment (STAR) - Renaissance',
    'Bus movement data - Tyler'
  ];

  goBack(): void {
    this.location.back();
  }
}
