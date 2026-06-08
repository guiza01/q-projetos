import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_CONFIG } from '../../../../core/config/api.config';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: false,
})
export class TestPage {
  isLoading = false;
  isLoadingProjects = false;
  errorMessage = '';
  responseContent = '';
  projects: any[] = [];

  constructor(private readonly http: HttpClient) {}

  async testLogin(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.responseContent = '';

    try {
      const baseUrl = API_CONFIG.baseUrl;

      if (!baseUrl) {
        throw new Error('API_BASE_URL não configurada no ambiente da aplicação.');
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const body = {
        email: 'admin@ifpe.edu.br',
        senha: 'admin123',
      };

      const response = await firstValueFrom(
        this.http.post(`${baseUrl}/auth/login`, body, { headers })
      );

      this.responseContent = JSON.stringify(response, null, 2);
    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.message || 'Falha ao validar login na API.';
      this.responseContent = JSON.stringify(error?.error ?? error, null, 2);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchProjects(): Promise<void> {
    this.isLoadingProjects = true;
    this.errorMessage = '';
    this.projects = [];
    this.responseContent = '';

    try {
      const baseUrl = API_CONFIG.baseUrl;
      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        localStorage.getItem('accessToken');

      if (!baseUrl) {
        throw new Error('API_BASE_URL não configurada no ambiente da aplicação.');
      }

      if (!token) {
        throw new Error('Token não encontrado no localStorage. Faça login antes de listar projetos.');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const response = await firstValueFrom(
        this.http.get<any[]>(`${baseUrl}/projetos`, { headers })
      );

      this.projects = Array.isArray(response) ? response : [];
      this.responseContent = JSON.stringify(this.projects, null, 2);
    } catch (error: any) {
      this.errorMessage = error?.error?.message || error?.message || 'Falha ao listar projetos na API.';
      this.responseContent = JSON.stringify(error?.error ?? error, null, 2);
    } finally {
      this.isLoadingProjects = false;
    }
  }
}
