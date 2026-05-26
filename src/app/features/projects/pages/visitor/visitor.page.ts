import { Component, OnInit } from '@angular/core';
import { SearchbarInputEventDetail } from '@ionic/angular';

import { Project, ProjectStatus } from '../../models/project.model';
import { visitorMockProjects } from '../../mocks/visitor-projects.mock';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.page.html',
  styleUrls: ['./visitor.page.scss'],
  standalone: false,
})
export class VisitorPage implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading = false;
  errorMessage = '';
  searchQuery = '';
  selectedStatus: ProjectStatus | 'all' = 'all';
  statusOptions: (ProjectStatus | 'all')[] = ['all', 'pending', 'in_progress', 'done', 'archived'];

  constructor() {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.searchQuery = '';
    this.selectedStatus = 'all';

    this.projects = visitorMockProjects;
    this.applyFilters();
    this.isLoading = false;
  }

  onSearchChange(event: Event): void {
    const detail = (event as any).detail as SearchbarInputEventDetail;
    this.searchQuery = detail.value?.toLowerCase() || '';
    this.applyFilters();
  }

  onStatusFilterChange(status: ProjectStatus | 'all'): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredProjects = this.projects.filter((project) => {
      const matchesSearch =
        !this.searchQuery ||
        project.name.toLowerCase().includes(this.searchQuery) ||
        project.description.toLowerCase().includes(this.searchQuery);

      const matchesStatus = this.selectedStatus === 'all' || project.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  getStatusLabel(status: ProjectStatus | 'all'): string {
    const labels: Record<ProjectStatus | 'all', string> = {
      all: 'Todos',
      pending: 'Pendentes',
      in_progress: 'Em Andamento',
      done: 'Concluídos',
      archived: 'Arquivados',
    };
    return labels[status] || status;
  }

  getStatusIcon(status: ProjectStatus | 'all'): string {
    const icons: Record<ProjectStatus | 'all', string> = {
      all: 'list',
      pending: 'time-outline',
      in_progress: 'play-circle-outline',
      done: 'checkmark-circle-outline',
      archived: 'archive-outline',
    };
    return icons[status] || 'list';
  }

  onViewProjectDetails(project: Project): void {
    // TODO: Implementar navegação para detalhes do projeto
    console.log('View project details:', project);
  }

  onLoginClick(): void {
    // TODO: Implementar navegação para login
    console.log('Login clicked');
  }

  onFavoritesClick(): void {
    // TODO: Implementar visualização de favoritos
    console.log('Favorites clicked');
  }
}
