import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const awardRecognitionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  console.log('Award Recognition Guard – User:', user);

  // ✅ Allow access only for Principals (you can extend this to check a feature flag)
  if (user?.role === 'Principal') {
    return true;
  }

  console.warn('Award Recognition Guard – Access denied. Redirecting...');
  router.navigate(['/login']);
  return false;
};
