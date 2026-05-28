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

  // Controle de Abas
  abaSelecionada: string = 'gerais';

  // Variáveis temporárias do Modal de Equipe
  nomeIntegrante: string = '';
  papelSelecionado: string = '';
  papelPersonalizado: string = '';
  permissaoEdicao: boolean = false;

  // Lista dinâmica da Equipe
  integrantesAdicionados: any[] = [
    { nome: 'Guilherme Alves', papel: 'Coordenador' },
    { nome: 'João Silva', papel: 'Bolsista' }
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProjectId();
  }

  selecionarAba(aba: string): void {
    this.abaSelecionada = aba;
  }

  onPapelChange(event: any): void {
    this.papelSelecionado = event.detail.value;
    
    if (this.papelSelecionado === 'Coordenador') {
      this.permissaoEdicao = true;
    } else if (this.papelSelecionado !== 'Coordenador') {
      this.permissaoEdicao = false;
    }
  }

  adicionarIntegrante(modal: any): void {
    const papelFinal = this.papelSelecionado === 'Outro' ? this.papelPersonalizado : this.papelSelecionado;

    if (this.nomeIntegrante.trim() && papelFinal) {
      this.integrantesAdicionados.push({
        nome: this.nomeIntegrante.trim(),
        papel: papelFinal
      });

      this.nomeIntegrante = '';
      this.papelSelecionado = '';
      this.papelPersonalizado = '';
      this.permissaoEdicao = false;

      void modal.dismiss();
    }
  }

  removerIntegrante(index: number): void {
    this.integrantesAdicionados.splice(index, 1);
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
    console.log('Loading project with ID:', this.projectId);
    this.isLoading = false;
  }

  // CAMPOS MAPEADOS
  initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      coordinator: ['', Validators.required],
      status: ['active', Validators.required],
      type: ['extensao', Validators.required],            // Adicionado
      startDate: [''],                                    // Adicionado
      endDate: [''],                                      // Adicionado
      vagasBolsistas: [0],                                // Adicionado
      vagasVoluntarios: [0],                              // Adicionado
      inscricoesInicio: [''],                             // Adicionado
      inscricoesFim: [''],                                // Adicionado
      linkEdital: ['']                                    // Adicionado
    });
  }

  // PAYLOAD PARA INTEGRAÇÃO
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isSaving = true;
    this.errorMessage = '';

    const projetoCompletoPayload = {
      ...this.form.value,
      equipe: this.integrantesAdicionados
    };

    console.log('Payload prontinho para o Back-end:', projetoCompletoPayload);
    
    // descomentar a linha abaixo:
    // this.projectsService.updateProject(this.projectId, projetoCompletoPayload).subscribe(...)
    
    this.isSaving = false;
  }

  onCancel(): void {
    console.log('Cancel edit');
  }
}