import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.page.html',
  styleUrls: ['./coordinator.page.scss'],
  standalone: false,
})
export class CoordinatorPage implements OnInit {
  projects: Project[] = [];
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
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  onProjectEdit(): void {
    // TODO: Implementar navegação para edição de projeto
    console.log('Edit project');
  }

  onProjectDelete(): void {
    // TODO: Implementar lógica de exclusão de projeto
    console.log('Delete project');
  }
}
