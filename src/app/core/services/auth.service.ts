import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, tap, map, delay } from 'rxjs';
import { Router } from '@angular/router';
import { UserContext } from '../../models/student.model'; // Assuming UserContext is defined here

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject holds the current user context, null if not logged in
  private currentUserSubject = new BehaviorSubject<UserContext | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private router: Router) {
    // Check local storage on service init (simple persistence)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        try {
             this.currentUserSubject.next(JSON.parse(storedUser));
        } catch (e) {
            localStorage.removeItem('currentUser');
        }
    }
  }

  // Mock login - replace with actual API call
  login(username: string, password: string): Observable<boolean> {
    console.log(`Attempting login for: ${username}`);
    let user: UserContext | null = null;

    // MOCK LOGIC - Replace with backend verification
    if (username === 'teacher' && password === 'pass') {
      user = { userId: 't1', userName: 'James Anderson', role: 'Teacher' };
    } else if (username === 'principal' && password === 'pass') {
      user = { userId: 'p1', userName: 'Principal Name', role: 'Principal' };
    } else if (username === 'districtleader' && password === 'pass') {
      user = { userId: 'd1', userName: 'District Leader Name', role: 'DistrictLeader' };
    }else if (username === 'parent' && password === 'pass') {
      user = { userId: 'ps1', userName: 'Parent Name', role: 'Parent',parentId: 104 };
    }else if (username === 'student' && password === 'pass') {
        // Assuming student logs in and sees their own data, ID matches Mark Felton mock
        user = { userId: 'mf1', userName: 'Mark Felton', role: 'Student',studentId: 10 };
    }

    if (user) {
      console.log('Storing user in localStorage:', user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('User stored, setting in BehaviorSubject');
      this.currentUserSubject.next(user);
      return of(true).pipe(delay(500)); // Simulate API delay
    } else {
      return of(false).pipe(delay(500));
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUserRole(): UserContext['role'] | null {
    return this.currentUserSubject.value?.role ?? null;
  }

  getCurrentUser(): UserContext | null {
     return this.currentUserSubject.value;
  }

   // Method for parent to switch selected child context
  setSelectedChild(childId: string): void {
      const currentUser = this.currentUserSubject.value;
      if (currentUser && currentUser.role === 'Parent' && currentUser.children?.some(c => c.id === childId)) {
          const updatedUser = { ...currentUser, selectedChildId: childId };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
      }
  }
}