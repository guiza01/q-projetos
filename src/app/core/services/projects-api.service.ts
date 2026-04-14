import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { ProjectApiModel } from '../models/project-api.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService {
  private readonly http = inject(HttpClient);

  listProjects(): Observable<ProjectApiModel[]> {
    return this.http.get<ProjectApiModel[]>(`${API_CONFIG.baseUrl}${API_CONFIG.projectsPath}`);
  }

  getProjectById(id: number): Observable<ProjectApiModel> {
    return this.http.get<ProjectApiModel>(`${API_CONFIG.baseUrl}${API_CONFIG.projectsPath}/${id}`);
  }
}
