import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const expectedRole = route.data['expectedRole'] as string;
    const currentRole = authService.getCurrentUserRole();
    
    console.log('Role Guard - Expected role:', expectedRole);
    console.log('Role Guard - Current user role:', currentRole);
    console.log('Role Guard - Current user:', authService.getCurrentUser());

    if (!authService.getCurrentUser()) {
        console.log('Role Guard - No current user, redirecting to login');
        // Should be handled by authGuard first, but as a fallback
        router.navigate(['/login']);
        return false;
    }

    if (currentRole && currentRole === expectedRole) {
        console.log('Role Guard - Role matches, access granted');
        return true; 
    } else {
        console.warn(`Role Guard - Role mismatch: Expected ${expectedRole}, got ${currentRole}`);
        router.navigate(['/login']); 
        return false;
    }
};