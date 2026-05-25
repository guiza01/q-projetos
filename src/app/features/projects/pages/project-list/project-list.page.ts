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

  // Variáveis para controlar os filtros atuais
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
      next: (projects) => {
        this.projects = projects;
        this.filteredProjects = projects;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  // Captura o texto digitado na pesquisa
  handleSearch(event: any) {
    this.searchTerm = event.target.value ? event.target.value.toLowerCase() : '';
    this.applyFilters();
  }

  // Captura o clique no Chip de Filtro
  selectStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }

  // Combina o Filtro de Texto + Filtro do Chip de forma segura
  applyFilters() {
    this.filteredProjects = this.projects.filter(project => {
      const p = project as any;

      // 1. Validação da busca por texto (testa propriedades comuns como title ou nome)
      const matchesSearch = !this.searchTerm || 
        (p.title && p.title.toLowerCase().includes(this.searchTerm)) ||
        (p.nome && p.nome.toLowerCase().includes(this.searchTerm));

      // 2. Validação do status vindo da API (testa propriedades comuns como status ou situacao)
      const projectStatus = p.status || p.situacao || '';
      
      const matchesStatus = this.selectedStatus === 'Todos' || 
        projectStatus.toLowerCase() === this.selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }
}