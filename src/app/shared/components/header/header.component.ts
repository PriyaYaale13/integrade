import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Subscription, filter } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { UserContext } from '../../../models/student.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);

  currentUser: UserContext | null = null;
  isLoggedIn = false;
  selectedChildId: string | undefined = undefined;

  private userSubscription: Subscription | undefined;

  logoUrl = 'assets/logo.png'; // Path to your logo
  defaultProfileImage = 'assets/images/default-profile.jpg'; // Default profile image

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      if (user?.role === 'Parent') {
        this.selectedChildId = user.selectedChildId ?? user.children?.[0]?.id;
      } else {
        this.selectedChildId = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  onChildSelectionChange(childId: string): void {
    if (this.currentUser?.role === 'Parent') {
        this.authService.setSelectedChild(childId);
        // Optional: Navigate to the selected child's detail page immediately
        // this.router.navigate(['/parent/student', childId]);
    }
  }

  // Helper to get the dashboard route based on role
  get dashboardRoute(): string {
    switch (this.currentUser?.role) {
      case 'Teacher': return '/teacher';
      case 'Principal': return '/principal';
      case 'Parent': return '/parent'; // Or '/parent/student/' + this.selectedChildId;
      case 'Student': return '/student';
      default: return '/';
    }
  }
  
  // Helper to get the profile image
  getProfileImage(): string {
    return this.currentUser?.profileImage || this.defaultProfileImage;
  }
}