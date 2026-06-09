import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { ProjectApiModel } from '../models/project-api.model';
import { LeadApiModel } from '../models/lead-api.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService {
  private readonly http = inject(HttpClient);

  private getAuthToken(): string | null {
    const knownKeys = ['token', 'authToken', 'accessToken', 'authorization', 'bearerToken'];

    for (const key of knownKeys) {
      const value = localStorage.getItem(key);
      if (value) {
        return value;
      }
    }

    for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);

    if (!key) {
      continue;
    }

    const value = localStorage.getItem(key);

    if (value && /token|bearer/i.test(key) && value.length > 10) {
      return value;
    }
  }

    return null;
  }

  listProjects(): Observable<ProjectApiModel[]> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('Token não encontrado no localStorage. Faça login antes de listar projetos.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProjectApiModel[]>(`${API_CONFIG.baseUrl}${API_CONFIG.projectsPath}`, {
      headers,
    });
  }

  listInteresses(): Observable<LeadApiModel[]> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('Token não encontrado no localStorage. Faça login antes de listar interesses.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<LeadApiModel[]>(
      'https://q-projetos-backend.onrender.com/api/interesses',
      { headers }
    );
  }

  getProjectById(id: number): Observable<ProjectApiModel> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('Token não encontrado no localStorage. Faça login antes de listar projetos.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<ProjectApiModel>(`${API_CONFIG.baseUrl}${API_CONFIG.projectsPath}/${id}`, {
      headers,
    });
  
  }
    aprovarProjeto(id: number): Observable<void> {
  const token = this.getAuthToken();

  console.log('TOKEN:', token);

  if (!token) {
    return throwError(() =>
      new Error('Token não encontrado.')
    );
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  console.log('AUTH HEADER:', `Bearer ${token}`);

  return this.http.post<void>(
    `${API_CONFIG.baseUrl}${API_CONFIG.projectsPath}/${id}/aprovar`,
    {},
    { headers }
  );
}

  reprovarProjeto(id: number): Observable<void> {
    const token = this.getAuthToken();

    if (!token) {
      return throwError(() =>
        new Error('Token não encontrado.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<void>(
      `${API_CONFIG.baseUrl}${API_CONFIG.projectsPath}/${id}/reprovar`,
      {},
      { headers }
    );
  }

  excluirProjeto(id: number): Observable<void> {
    const token = this.getAuthToken();

    if (!token) {
      return throwError(() =>
        new Error('Token não encontrado.')
      );
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>(
      `${API_CONFIG.baseUrl}${API_CONFIG.projectsPath}/${id}`,
      { headers }
    );
  }
}
