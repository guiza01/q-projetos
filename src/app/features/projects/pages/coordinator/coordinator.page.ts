import { Component } from '@angular/core';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.page.html',
  styleUrls: ['./coordinator.page.scss'],
  standalone: false,
})
export class CoordinatorPage {
  mostrarProjetosAtivos = false;
  mostrarLeads = false;
  mostrarProjetosEncerrados = false;

  projetos = [
    {
      titulo: 'Projeto IFPE em Movimento',
      categoria: 'Voluntário',
      vagas: 30,
      inscricoes: 'Abertas',
      status: 'Publicado',
      imagem: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200&auto=format&fit=crop'
    },
    {
      titulo: 'Projeto Palco Livre',
      categoria: 'Voluntário',
      vagas: 20,
      inscricoes: 'Abertas',
      status: 'Pendente',
      imagem: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop'
    },
    {
      titulo: 'Projeto Ônibus Mágico',
       categoria: 'Bolsista',
      vagas: 15,
      inscricoes: 'Encerradas',
      status: 'Encerrado',
      imagem: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  leads = [
    {
      nome: 'Ana Clara Santos',
      projeto: 'Projeto IFPE em Movimento',
      email: 'ana.santos@example.com',
      status: 'Interessado'
    },
    {
      nome: 'Bruno Almeida',
      projeto: 'Projeto Palco Livre',
      email: 'bruno.almeida@example.com',
      status: 'Em contato'
    },
    {
      nome: 'Carla Rodrigues',
      projeto: 'Projeto Ônibus Mágico',
      email: 'carla.rodrigues@example.com',
      status: 'Confirmado'
    }
  ];

  get projetosEncerrados() {
    return this.projetos.filter((projeto) => projeto.status === 'Encerrado');
  }

  toggleProjetosAtivos(): void {
    this.mostrarProjetosAtivos = !this.mostrarProjetosAtivos;
    if (this.mostrarProjetosAtivos) {
      this.mostrarLeads = false;
      this.mostrarProjetosEncerrados = false;
    }
  }

  toggleLeads(): void {
    this.mostrarLeads = !this.mostrarLeads;
    if (this.mostrarLeads) {
      this.mostrarProjetosAtivos = false;
      this.mostrarProjetosEncerrados = false;
    }
  }

  toggleProjetosEncerrados(): void {
    this.mostrarProjetosEncerrados = !this.mostrarProjetosEncerrados;
    if (this.mostrarProjetosEncerrados) {
      this.mostrarProjetosAtivos = false;
      this.mostrarLeads = false;
    }
  }

}