import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.page.html',
  styleUrls: ['./administrator.page.scss'],
  standalone: false,
})
export class AdministratorPage implements OnInit {
  projects: Project[] = [];
  isLoading = false;
  errorMessage = '';

  mostrarProjetos = false;
  mostrarPublicados = false;
  mostrarPendentes = false;
  mostrarEncerrados = false;
  mostrarLeads = false;

  projetos = [
  {
    titulo: 'Gamificação no Ensino de Matemática',
    coordenador: 'Ricardo Alves',
    tipo: 'Ensino',
    status: 'Publicado',
    inscricoes: 'abertas',
    imagem: 'assets/img/projeto1.png'
  },

  {
    titulo: 'Saúde mental universitária',
    coordenador: 'Juliana Costa',
    tipo: 'Extensão',
    status: 'Pendente',
    inscricoes: 'abertas',
    imagem: 'assets/img/projeto2.png'
  },

  {
    titulo: 'Novos Materiais para Energia Solar',
    coordenador: 'Carlos Mendes',
    tipo: 'Pesquisa',
    status: 'Edição',
    inscricoes: 'fechadas',
    imagem: 'assets/img/projeto3.png'
  },

   {
    titulo: 'Programação com Scratch',
    coordenador: 'Júlia da Silva',
    tipo: 'Ensino',
    status: 'Encerrado',
    inscricoes: 'fechadas',
    imagem: 'assets/img/projeto4.png'
  }
];

  leads = [

    {
      nome: 'Maria Eduarda',
      projeto: 'IA na Educação',
      email: 'maria@email.com',
      tipo: 'Bolsista'
    },

    {
      nome: 'João Pedro',
      projeto: 'Sustentabilidade',
      email: 'joao@email.com',
      tipo: 'Bolsista'
    },

    {
      nome: 'Ana Beatriz',
      projeto: 'Pesquisa em Energia',
      email: 'ana@email.com',
      tipo: 'Voluntário'
    }

  ];

    get projetosPublicados() {
    return this.projetos.filter(
      projeto => projeto.status === 'Publicado'
    );
  }

  get projetosPendentes() {
    return this.projetos.filter(
      projeto => projeto.status === 'Pendente'
    );
  }

  get projetosEdicao() {
  return this.projetos.filter(
    projeto => projeto.status === 'Edição'
  );
}

  get projetosEncerrados() {
    return this.projetos.filter(
      projeto => projeto.status === 'Encerrado'
    );
  }

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
    this.mostrarLeads = !estado;
  }
} 