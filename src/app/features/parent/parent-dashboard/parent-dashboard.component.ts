import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Shared
import { HeaderComponent } from '../../../shared/components/header/header.component';

// Services & Models
import { AuthService } from '../../../core/services/auth.service';
import { DataService } from '../../../services/data.service';
import { StudentDemographics, UserContext } from '../../../models/student.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule, HeaderComponent,
    MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule
  ],
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
    authService = inject(AuthService);
    dataService = inject(DataService); // If needed to fetch children separately
    router = inject(Router);

    currentUser$: Observable<UserContext | null> = this.authService.currentUser$;
    children$: Observable<StudentDemographics[]> = of([]); // Or fetch if not in context

    ngOnInit(): void {
        // Check if children are already in the user context from login
        this.currentUser$.subscribe(user => {
            if (user?.children && user.children.length > 0) {
                // Map context children to StudentDemographics shape if needed
                const childrenDemographics = user.children.map(c => ({
                    id: c.id,
                    firstName: c.name.split(' ')[0] ?? c.name, // Basic split for name
                    lastName: c.name.split(' ')[1] ?? '',
                    // Add other details if available in context or fetch separately
                } as StudentDemographics));
                this.children$ = of(childrenDemographics);

                // Optional: Auto-navigate to the selected child's detail page
                 if (user.selectedChildId) {
                   // Check if current route is already the child's detail page to avoid loop
                   if (!this.router.url.includes(`/parent/student/${user.selectedChildId}`)) {
                     this.router.navigate(['/parent/student', user.selectedChildId]);
                   }
                 } else if (childrenDemographics.length === 1) {
                     // If only one child, navigate directly
                     if (!this.router.url.includes(`/parent/student/${childrenDemographics[0].id}`)) {
                        this.router.navigate(['/parent/student', childrenDemographics[0].id]);
                     }
                 }

            } else if (user) {
                // Fetch children separately if not in context (less efficient)
                this.children$ = this.dataService.getParentChildren(user.userId);
            }
        });
    }

     viewChildDetails(childId: string): void {
        this.authService.setSelectedChild(childId); // Update context in service
        this.router.navigate(['/parent/student', childId]);
     }
}
