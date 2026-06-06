import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
  standalone: false,
})
export class ProjectListPage implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading = false;
  errorMessage = '';

  searchTerm = '';
  selectedStatus = 'Todos'; 

  constructor(private readonly projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectsService.list().subscribe({
      next: (backendProjects) => {
        // Mapeia os dados garantindo strings no formato ISO que o Angular aceita
        this.projects = backendProjects.map((p: any) => {
          
          // Função que transforma "2026-06-01" em "2026-06-01T03:00:00.000Z"
          // Isso evita bugs de fuso horário e passa uma string válida para o card
          const normalizarStringData = (dataStr: string): string | null => {
            if (!dataStr) return null;
            if (dataStr.includes('T')) return dataStr; // Já está no formato certo
            return `${dataStr}T00:00:00`;
          };

          return {
            id: p.id,
            // Mantém o título perfeito que já estava funcionando
            name: p.titulo || 'Projeto sem Título',
            
            // Mantém a descrição perfeita
            description: p.descricao || '',
            
            // Passa a string normalizada com o horário anexado, respeitando a interface string | null
            startDate: normalizarStringData(p.dataInicioProjeto),
            endDate: normalizarStringData(p.dataTerminoProjeto),
            
            // Mantém o status original
            status: p.status
          };
        });

        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Erro ao conectar com o servidor do Q-Projetos. Tente novamente.';
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  handleSearch(event: any) {
    this.searchTerm = event.target.value ? event.target.value.toLowerCase() : '';
    this.applyFilters();
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProjects = this.projects.filter(project => {
      const p = project as any;

      // 1. Filtro de texto (busca no título adaptado ou original da API)
      const matchesSearch = !this.searchTerm || 
        (p.title && p.title.toLowerCase().includes(this.searchTerm)) ||
        (p.titulo && p.titulo.toLowerCase().includes(this.searchTerm)) ||
        (p.descricao && p.descricao.toLowerCase().includes(this.searchTerm));

      // 2. Filtro do Chip tratando o padrão "EM_ANDAMENTO" ou "CONCLUIDO" do banco
      const backendStatus = p.status ? p.status.toUpperCase() : '';
      
      let targetStatus = '';
      if (this.selectedStatus === 'Todos') {
        return matchesSearch; // Se for 'Todos', ignora o filtro de status e valida só a busca
      } else if (this.selectedStatus === 'Em andamento') {
        targetStatus = 'EM_ANDAMENTO';
      } else if (this.selectedStatus === 'Concluido') {
        targetStatus = 'CONCLUIDO';
      }

      const matchesStatus = backendStatus === targetStatus;

      return matchesSearch && matchesStatus;
    });
  }
}