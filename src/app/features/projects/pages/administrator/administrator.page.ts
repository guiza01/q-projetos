import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ProjectsService } from '../../services/projects.service';
import { Lead } from '../../models/lead.model';
import { Project, ProjectStatus } from '../../models/project.model';
import { ProjectsApiService } from 'src/app/core/services/projects-api.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.page.html',
  styleUrls: ['./administrator.page.scss'],
  standalone: false,
})
export class AdministratorPage implements OnInit, ViewWillEnter  {
  projetos: Project[] = [];
  isLoading = false;
  errorMessage = '';

  mostrarProjetos = false;
  mostrarPublicados = false;
  mostrarPendentes = false;
  mostrarEncerrados = false;
  mostrarLeads = false;

  leads: Lead[] = [];
  isLoadingLeads = false;
  errorMessageLeads = '';

  loadLeads(): void {
    this.isLoadingLeads = true;
    this.errorMessageLeads = '';

    this.projectsService.listLeads().subscribe({
      next: (response: Lead[]) => {
        this.leads = response;
        this.isLoadingLeads = false;
      },
      error: (error: Error) => {
        this.errorMessageLeads = error.message;
        this.isLoadingLeads = false;
      },
    });
  }

  get projetosPublicados() {
  return this.projetos.filter(
    projeto =>
      String(projeto.statusModeracao)
        .toLowerCase()
        .trim() === 'publicado'
  );
}

  get projetosPendentes() {
  return this.projetos.filter(
    projeto =>
      String(projeto.statusModeracao)
        .toLowerCase()
        .trim() === 'pendente'
  );
}

  get projetosEncerrados() {
    return this.projetos.filter(
      projeto => String(projeto.statusModeracao).toLowerCase().trim() === 'encerrado'
    );
  }

  constructor(
  private readonly projectsService: ProjectsService,
  private readonly projectsApiService: ProjectsApiService,
  private readonly alertController: AlertController
) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadLeads();
  }

  ionViewWillEnter(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectsService.list().subscribe({
      next: (projects) => {

        console.log('PROJETOS DA API:', projects); // 👈 AQUI

        this.projetos = projects;

        console.log('STATUSES:', projects.map(p => p.status)); // 👈 AQUI

        this.isLoading = false;
      },

      error: (error) => {
        console.error(error);
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  formatStatus(status: ProjectStatus): string {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em progresso';
      case 'done':
        return 'Publicado';
      case 'archived':
        return 'Encerrado';
      default:
        return status;
    }
  }

  onProjectCreate(): void {
    // TODO: Implementar navegação para criação de projeto
    console.log('Create project');
  }

  onProjectEdit(): void {
    // TODO: Implementar navegação para edição de projeto
    console.log('Edit project');
  }

  onProjectDelete(): void {
    // TODO: Implementar lógica de exclusão de projeto
    console.log('Delete project');
  }

  onManageUsers(): void {
    // TODO: Implementar navegação para gerenciamento de usuários
    console.log('Manage users');
  }

   fecharTudo() {
    this.mostrarProjetos = false;
    this.mostrarPublicados = false;
    this.mostrarPendentes = false;
    this.mostrarEncerrados = false;
    this.mostrarLeads = false;
  }

  toggleProjetos() {
    const estado = this.mostrarProjetos;
    this.fecharTudo();

    if (!estado) {
      this.loadProjects();
    }

    this.mostrarProjetos = !estado;
  }

  togglePublicados() {
    const estado = this.mostrarPublicados;
    this.fecharTudo();
    this.mostrarPublicados = !estado;
  }

  togglePendentes() {
    const estado = this.mostrarPendentes;
    this.fecharTudo();
    this.mostrarPendentes = !estado;
  }

  toggleEncerrados() {
    const estado = this.mostrarEncerrados;
    this.fecharTudo();
    this.mostrarEncerrados = !estado;
  }

  toggleLeads() {
    const estado = this.mostrarLeads;
    this.fecharTudo();
    if (!estado) {
      this.loadLeads();
    }
    this.mostrarLeads = !estado;
  }

  aprovarProjeto(id: number) {
    this.projectsApiService.aprovarProjeto(id).subscribe({
      next: () => {
        this.loadProjects();
      },
      error: console.error
    });
  }

  reprovarProjeto(id: number) {
    this.projectsApiService.reprovarProjeto(id).subscribe({
      next: () => {
        this.loadProjects();
      },
      error: console.error
    });
  }

  excluirProjeto(id: number) {
    this.projectsApiService.excluirProjeto(id).subscribe({
      next: () => {
        this.loadProjects();
      },
      error: console.error
    });
  }

  async abrirMenuProjeto(projeto: Project) {
  const alert = await this.alertController.create({
    header: projeto.name,
    buttons: [
      {
        text: 'Aprovar',
        handler: () => {
          this.aprovarProjeto(projeto.id);
        }
      },
      {
        text: 'Reprovar',
        handler: () => {
          this.reprovarProjeto(projeto.id);
        }
      },
      {
        text: 'Excluir',
        role: 'destructive',
        handler: () => {
          this.excluirProjeto(projeto.id);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
    ]
  });

  await alert.present();
}
} 