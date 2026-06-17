import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';

import { AppRole, AuthStorageService } from '../services/auth-storage.service';

const hasRequiredRole = (userRole: AppRole, allowedRoles?: string[]): boolean => {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  return allowedRoles.includes(userRole);
};

const getFallbackRoute = (userRole: AppRole): string => {
  switch (userRole) {
    case 'ROLE_ADMIN':
      return '/administrator';
    case 'ROLE_COORD':
      return '/coordinator';
    default:
      return '/list';
  }
};

export const authGuard: CanMatchFn = (route: Route) => {
  const router = inject(Router);
  const authStorage = inject(AuthStorageService);
  const token = authStorage.getToken();
  const userRole = authStorage.getRole();

  if (token && hasRequiredRole(userRole, route.data?.['roles'] as string[] | undefined)) {
    return true;
  }

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  return router.createUrlTree([getFallbackRoute(userRole)]);
};