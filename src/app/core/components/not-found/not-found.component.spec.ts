import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <mat-card>
        <mat-card-title>404 - Page Not Found</mat-card-title>
        <mat-card-content>
          <p>Oops! The page you are looking for does not exist or you may not have permission to view it.</p>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-raised-button color="primary" routerLink="/">Go to Home</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 64px); // Full height minus header (adjust if header height differs)
      padding: 2rem;
    }
    mat-card {
      max-width: 500px;
      text-align: center;
    }
  `]
})
export class NotFoundComponent {}