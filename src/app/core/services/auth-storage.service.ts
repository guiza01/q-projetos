import { Injectable } from '@angular/core';

export type AppRole = 'ROLE_ADMIN' | 'ROLE_COORD' | 'ROLE_USER';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly tokenKey = 'token';
  private readonly roleKey = 'role';

  normalizeRole(role?: string | null): AppRole {
    const normalizedRole = (role || '').trim().toUpperCase();

    if (normalizedRole === 'ROLE_ADMIN' || normalizedRole === 'ADMIN' || normalizedRole === 'ADMINISTRADOR') {
      return 'ROLE_ADMIN';
    }

    if (normalizedRole === 'ROLE_COORD' || normalizedRole === 'ROLE_COORDINATOR' || normalizedRole === 'COORD' || normalizedRole === 'COORDENADOR') {
      return 'ROLE_COORD';
    }

    return 'ROLE_USER';
  }

  setSession(token: string, role?: string | null): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, this.normalizeRole(role));
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);

    return token && token.trim() ? token : null;
  }

  getRole(): AppRole {
    return this.normalizeRole(localStorage.getItem(this.roleKey));
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }
}