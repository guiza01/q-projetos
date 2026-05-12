import { Component } from '@angular/core';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.page.html',
  styleUrls: ['./coordinator.page.scss'],
  standalone: false,
})
export class CoordinatorPage {

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

}