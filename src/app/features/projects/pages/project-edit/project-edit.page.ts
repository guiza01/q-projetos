import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
  standalone: false,
})
export class ProjectEditPage implements OnInit {
  form!: FormGroup;
  projectId: string | null = null;
  project: Project | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProjectId();
  }

  loadProjectId(): void {
    this.projectId = this.route.snapshot.queryParamMap.get('id');
    if (this.projectId) {
      this.loadProject();
    }
  }

  loadProject(): void {
    if (!this.projectId) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // TODO: Implementar busca do projeto específico
    console.log('Loading project with ID:', this.projectId);
    this.isLoading = false;
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      coordinator: ['', Validators.required],
      status: ['active', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    // TODO: Implementar lógica de salvar/atualizar projeto
    console.log('Saving project:', this.form.value);
  }

  onCancel(): void {
    // TODO: Implementar navegação de volta
    console.log('Cancel edit');
  }
}
