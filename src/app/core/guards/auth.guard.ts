import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  console.log('Auth Guard - Checking if user is logged in...');

  return authService.isLoggedIn$.pipe(
    take(1), // Take the first emission
    tap(isLoggedIn => console.log('Auth Guard - isLoggedIn:', isLoggedIn)),
    map(isLoggedIn => {
      if (isLoggedIn) {
        console.log('Auth Guard - Access granted');
        return true; // Allow access if logged in
      } else {
        console.log('Auth Guard - Access denied, redirecting to login');
        // Redirect to login page if not logged in
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
  );
};