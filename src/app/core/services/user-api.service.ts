import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { UserApiModel } from '../models/user-api.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {

  private readonly http = inject(HttpClient);

  private getAuthToken(): string | null {

    const knownKeys = [
      'token',
      'authToken',
      'accessToken',
      'authorization',
      'bearerToken'
    ];

    for (const key of knownKeys) {
      const value = localStorage.getItem(key);

      if (value) {
        return value;
      }
    }

    for (let i = 0; i < localStorage.length; i++) {

      const key = localStorage.key(i);

      if (!key) {
        continue;
      }

      const value = localStorage.getItem(key);

      if (
        value &&
        /token|bearer/i.test(key) &&
        value.length > 10
      ) {
        return value;
      }
    }

    return null;
  }

  listarUsuarios(): Observable<UserApiModel[]> {

    const token = this.getAuthToken();

    console.log('TOKEN USUÁRIOS:', token);

    if (!token) {
      return throwError(() =>
        new Error('Token não encontrado.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log(
      'URL USUÁRIOS:',
      `${API_CONFIG.baseUrl}/usuarios`
    );

    return this.http.get<UserApiModel[]>(
      `${API_CONFIG.baseUrl}/usuarios`,
      { headers }
    );
  }
}