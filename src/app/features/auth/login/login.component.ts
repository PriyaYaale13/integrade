import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth.service';
import { UserContext } from '../../../models/student.model';
import parentStudentData from '../../../../assets/data/students.json';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'font-inter' // Apply Inter font to the entire component
  }
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  hidePassword = true;
  private returnUrl: string = '/'; // Default redirect URL

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.getCurrentUser()) {
      this.navigateToDashboard(this.authService.getCurrentUserRole());
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (success) => {
          if (success) {
            const role = this.authService.getCurrentUserRole();
            this.navigateToDashboard(role);
          } else {
            this.errorMessage = 'Invalid username or password.';
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      });
  }

  private navigateToDashboard(role: UserContext['role'] | null): void {
    let targetRoute = '/'; // Fallback
    switch (role) {
      case 'Teacher': targetRoute = '/teacher'; break;
      case 'Principal': targetRoute = '/principal'; break;
      case 'Student':
        const currentUser = this.authService.getCurrentUser();

        // If the current user has student ID
        if (currentUser?.studentId) {
          const studentId = currentUser.studentId;
          targetRoute = `/student/${studentId}`;
        } else {
          this.errorMessage = 'Student ID not found for this user.';
          return;
        }
        break;


      case 'DistrictLeader': targetRoute = '/district-leader'; break;
      case 'Parent':

        const parentUser = this.authService.getCurrentUser();
        const students = parentStudentData.filter(entry => entry.parent_id === parentUser?.parentId);

        if (students.length > 0) {
          const firstStudent = students[0];
          const parentId = firstStudent.parent_id;
          const studentId = firstStudent.student_id;
          targetRoute = `/parent/${parentId}/${studentId}`;
        } else {
          this.errorMessage = 'No students found for this parent.';
          return;
        }
        break;
      // Add Admin or other roles if needed
      default: targetRoute = this.returnUrl; // Or a default logged-in landing
    }

    // Only use returnUrl if it's not the login page itself AND it's not the default root path
    const finalUrl = (this.returnUrl && this.returnUrl !== '/login' && this.returnUrl !== '/')
      ? this.returnUrl
      : targetRoute;

    // Use navigate with an array instead of navigateByUrl
    this.router.navigate([finalUrl.replace(/^\//, '')])
      .then((success) => {
        console.log('Navigation result:', success ? 'SUCCESS' : 'FAILED');
        if (!success) {
          console.error('Navigation failed. Check routes configuration.');
        }
      })
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }
}