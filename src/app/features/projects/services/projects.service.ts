import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ProjectsApiService } from '../../../core/services/projects-api.service';
import { Project } from '../models/project.model';
import { toProjects } from '../mappers/project.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly projectsApiService: ProjectsApiService) {}

  list(): Observable<Project[]> {
    return this.projectsApiService.listProjects().pipe(map(toProjects));
  }

  detail(id: number): Observable<Project> {
    return this.projectsApiService.getProjectById(id).pipe(map((project) => toProjects([project])[0]));
  }
}
