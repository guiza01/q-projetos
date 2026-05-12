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
  filteredProjects: Project[] = []; // Usaremos esta lista no HTML
  isLoading = false;
  errorMessage = '';

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
        this.filteredProjects = projects; // Inicialmente, mostra tudo
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  handleSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredProjects = this.projects;
      return;
    }

    // Se o seu modelo usa outro nome (como 'nome' em vez de 'title'), altere abaixo
    this.filteredProjects = this.projects.filter(p => 
      (p as any).title?.toLowerCase().includes(searchTerm) || 
      (p as any).nome?.toLowerCase().includes(searchTerm)
    );
  }
}
