import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  usuarioLogado = {
    id: 1,
    nome: 'Admin Global',
    perfil: 'ADMINISTRADOR'
  };

  constructor() {}

  mostrarNotificacoes = false;
  mostrarRelatorios = false;
  mostrarSobre = false;

  notificacoes = [
    {
      titulo: 'Novo projeto publicado',
      descricao: 'O projeto IA na Educação foi publicado.'
    },
    {
      titulo: 'Novo lead cadastrado',
      descricao: 'Maria Eduarda demonstrou interesse.'
    },
    {
      titulo: 'Projeto aprovado',
      descricao: 'Gamificação no Ensino foi aprovado.'
    }
  ];

  relatorios = [
    'Relatório de Projetos',
    'Relatório de Leads',
    'Relatório de Usuários'
  ];

  toggleNotificacoes() {
    this.mostrarNotificacoes = !this.mostrarNotificacoes;
  }

  toggleRelatorios() {
    this.mostrarRelatorios = !this.mostrarRelatorios;
  }

  toggleSobre() {
    this.mostrarSobre = !this.mostrarSobre;
  }

  mostrarConfiguracoes = false;
  configuracoes = {
    temaClaro: true,
    notificacoes: true,
  };

  toggleConfiguracoes() {
    this.mostrarConfiguracoes = !this.mostrarConfiguracoes;
  }

  temaClaro = true;
  alternarTema(event: any) {
    this.temaClaro = event.detail.checked;

    if (this.temaClaro) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }

}
