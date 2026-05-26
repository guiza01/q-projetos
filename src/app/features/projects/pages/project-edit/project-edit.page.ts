import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import type { IonModal } from '@ionic/angular';

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

  // A sua variável que controla as 3 abas entra aqui:
  abaSelecionada: string = 'gerais';

  // NOVAS VARIÁVEIS PARA CONTROLAR O MODAL INTERATIVO DA EQUIPE:
  papelSelecionado: string = '';
  permissaoEdicao: boolean = false;
  nomeIntegrante: string = '';
  papelPersonalizado: string = '';
  integrantesAdicionados: Array<{ nome: string; papel: string }> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProjectId();
  }

  // A sua função para mudar de aba entra aqui:
  selecionarAba(aba: string): void {
    this.abaSelecionada = aba;
  }

  // NOVA FUNÇÃO QUE CONTROLA A LÓGICA INTELIGENTE DO PAPEL E DA PERMISSÃO:
  onPapelChange(event: CustomEvent<{ value: string }>): void {
    this.papelSelecionado = event.detail.value;
    } else {
    if (this.papelSelecionado === 'coordenador') {
      this.permissaoEdicao = true;
    } else {
      this.permissaoEdicao = false;
    }
  }

  adicionarIntegrante(modal: IonModal): void {
    const nome = this.nomeIntegrante.trim();
    const papel = this.getPapelSelecionado();

    if (!nome || !papel) {
      return;
    }

    this.integrantesAdicionados = [...this.integrantesAdicionados, { nome, papel }];
    this.limparModal();
    void modal.dismiss();
  }

  private getPapelSelecionado(): string {
    if (this.papelSelecionado === 'outro') {
      return this.papelPersonalizado.trim();
    }

    const papeis: Record<string, string> = {
      coordenador: 'Coordenador',
      colaborador: 'Colaborador',
      bolsista: 'Bolsista',
      voluntario: 'Voluntário',
    };

    return papeis[this.papelSelecionado] ?? '';
  }

  private limparModal(): void {
    this.nomeIntegrante = '';
    this.papelSelecionado = '';
    this.papelPersonalizado = '';
    this.permissaoEdicao = false;
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