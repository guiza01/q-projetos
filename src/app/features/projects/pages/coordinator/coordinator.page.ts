import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_CONFIG } from '../../../../core/config/api.config';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.page.html',
  styleUrls: ['./coordinator.page.scss'],
  standalone: false,
})
export class CoordinatorPage implements OnInit {
  isLoading = false;
  errorMessage = '';
  responseContent = '';
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJxLXByb2pldG9zLWFwaSIsInN1YiI6ImNvb3JkZW5hZG9yQGlmcGUuZWR1LmJyIiwicm9sZSI6IlJPTEVfQ09PUkQiLCJleHAiOjE3ODA2MTE4OTh9.ZtkhLkxlJyHFc4Qv8LjZRazzK5XUFhbGhgPTEnJSR6M';

  constructor(private readonly http: HttpClient) {}

  mostrarMeusProjetos = false;
  mostrarProjetosAtivos = false;
  mostrarInteressados = false;
  mostrarProjetosEncerrados = false;

  projetos: any[] = [];
  leads: any[] = [];
  meusProjetos: any[] = [];

  ngOnInit(): void {
    this.loadCounters();
  }

  get qtdProjetosMeus(): number {
    return this.meusProjetos.length;
  }

  get qtdProjetosAtivos(): number {
    return this.projetos.filter((projeto) => projeto.status !== 'ENCERRADA').length;
  }

  get qtdProjetosEncerrados(): number {
    return this.projetos.filter((projeto) => projeto.status === 'ENCERRADA').length;
  }

  get qtdInteressados(): number {
    return this.leads.length;
  }

  get projetosAtivos() {
    return this.projetos.filter((projeto) => projeto.status !== 'ENCERRADA');
  }

  get projetosEncerrados() {
    return this.projetos.filter((projeto) => projeto.status === 'ENCERRADA');
  }

  toggleMeusProjetos(): void {
    this.mostrarMeusProjetos = !this.mostrarMeusProjetos;
    if (this.mostrarMeusProjetos) {
      this.mostrarProjetosAtivos = false;
      this.mostrarInteressados = false;
      this.mostrarProjetosEncerrados = false;
    }
  }

  toggleProjetosAtivos(): void {
    this.mostrarProjetosAtivos = !this.mostrarProjetosAtivos;
    if (this.mostrarProjetosAtivos) {
      this.mostrarMeusProjetos = false;
      this.mostrarInteressados = false;
      this.mostrarProjetosEncerrados = false;
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
      //this.loadProjects("/projetos/status?status=ENCERRADA");
    }
  }

  async loadCounters(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.responseContent = '';

    try {
      const [todos, meus] = await Promise.all([
        this.fetchProjects('/projetos'),
        this.fetchProjects('/projetos/meus-projetos'),
      ]);

      this.projetos = todos;
      this.meusProjetos = meus;
      await this.loadLeaders();
      
    } catch (error: any) {
      this.errorMessage = error?.message || 'Falha ao carregar contadores.';
      this.responseContent = JSON.stringify(error?.error ?? error, null, 2);
    } finally {
      this.isLoading = false;
    }
  }

  async loadLeaders(): Promise<void> {
    if(this.meusProjetos && this.meusProjetos.length > 0) {
      const leaders: any[] = [];
      this.meusProjetos.forEach(async (projeto) =>{
        const leadersProjeto = await this.fetchLeaders(`/interesses/projeto/${projeto.id}`);
        leaders.push(...leadersProjeto);
      });
      this.leads = leaders;
    }
  }


  private mapApiProjectsToView(projects: any[]): any[] {
    return projects.map((item) => ({
      id: item.id ?? 'N/A',
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

  // param: endpoint - string endpoint da API (ex: '/projetos/meus-projetos')
  private async fetchProjects(endpoint: string): Promise<any[]> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const response = await firstValueFrom(this.http.get(url, { headers }));
  
    if (Array.isArray(response)) {
      return this.mapApiProjectsToView(response);
    }
    return [];
  }

  private mapApiLeadersToView(leaders: any[]): any[] {
    return leaders.map((item) => ({
      id: item.id ?? 'N/A',
      idProjeto: item.idProjeto ?? 'N/A',
      tituloProjeto: item.tituloProjeto ?? 'Sem título',
      nome: item.nome ?? 'Sem nome',
      email: item.email ?? 'Sem email',
      seriePeriodo: item.seriePeriodo ?? 'Não informado',
      modalidadePretendida: item.modalidadePretendida ?? 'Não informado',
      aceitouLgpd: item.aceitouLgpd ? 'Sim' : 'Não',
      dataRegistro: item.dataRegistro ?? 'Não informado',
    }));
  }

  private async fetchLeaders(endpoint: string): Promise<any[]> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
  });

    const response = await firstValueFrom(this.http.get(url, { headers }));
    console.log(response);
    if (Array.isArray(response)) {
      return this.mapApiLeadersToView(response);
    }
    return [];
  }

}

