import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token && token.trim()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};