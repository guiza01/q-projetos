import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_CONFIG } from '../../../../core/config/api.config';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.page.html',
  styleUrls: ['./coordinator.page.scss'],
  standalone: false,
})
export class CoordinatorPage {
  isLoading = false;
  errorMessage = '';
  responseContent = '';
  token = 'seu_token_aqui';

  constructor(private readonly http: HttpClient) {}

  mostrarMeusProjetos = false;
  mostrarProjetosAtivos = false;
  mostrarInteressados = false;
  mostrarProjetosEncerrados = false;

  projetos: any[] = [];

  leads: any[] = [];

  get projetosAtivos() {
    return this.projetos.filter((projeto) => projeto.status !== 'Encerrado');
  }

  get projetosEncerrados() {
    return this.projetos.filter((projeto) => projeto.status === 'Encerrado');
  }

  toggleMeusProjetos(): void {
    this.mostrarMeusProjetos = !this.mostrarMeusProjetos;
    if (this.mostrarMeusProjetos) {
      this.mostrarProjetosAtivos = false;
      this.mostrarInteressados = false;
      this.mostrarProjetosEncerrados = false;
      //this.loadProjects("/projetos/meus-projetos");
      this.projetos = [];
    }
  }

  toggleProjetosAtivos(): void {
    this.mostrarProjetosAtivos = !this.mostrarProjetosAtivos;
    if (this.mostrarProjetosAtivos) {
      this.mostrarMeusProjetos = false;
      this.mostrarInteressados = false;
      this.mostrarProjetosEncerrados = false;
      this.loadProjects("/projetos");
    }
  }

  toggleInteressados(): void {
    this.mostrarInteressados = !this.mostrarInteressados;
    if (this.mostrarInteressados) {
      this.mostrarMeusProjetos = false;
      this.mostrarProjetosAtivos = false;
      this.mostrarProjetosEncerrados = false;
    }
  }

  toggleProjetosEncerrados(): void {
    this.mostrarProjetosEncerrados = !this.mostrarProjetosEncerrados;
    if (this.mostrarProjetosEncerrados) {
      this.mostrarMeusProjetos = false;
      this.mostrarProjetosAtivos = false;
      this.mostrarInteressados = false;
    }
  }

  async loadProjects(endpoint: string): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.responseContent = '';

    this.projetos = await this.execGet(endpoint);
  }

  private mapApiProjectsToView(projects: any[]): any[] {
    return projects.map((item) => ({
      titulo: item.titulo ?? 'Sem título',
      categoria: item.tipo ?? item.modalidade ?? 'Não informado',
      vagas: item.vagas ?? 0,
      inscricoes: item.dataInicioInscricao && item.dataFimInscricao
        ? `${item.dataInicioInscricao} a ${item.dataFimInscricao}`
        : 'Não informado',
      status: item.status ?? 'Desconhecido',
      imagem: item.banner ?? 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
    }));
  }

  // param: endpoint - string endpoint da API (ex: '/projetos/ativos')
  private async execGet(endpoint: string): Promise<any> {
    try {
      const url = `${API_CONFIG.baseUrl}${endpoint}`;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });

      const response = await firstValueFrom(this.http.get(url, { headers }));
      this.responseContent = JSON.stringify(response, null, 2);

      if (Array.isArray(response)) {
        return this.mapApiProjectsToView(response);
      }
    } catch (error: any) {
      this.errorMessage = error?.message || 'Falha ao carregar projetos.';
      this.responseContent = JSON.stringify(error?.error ?? error, null, 2);
    } finally {
      this.isLoading = false;
    }
  }
}

