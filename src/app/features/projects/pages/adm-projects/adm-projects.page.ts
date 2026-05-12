import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-projects',
  templateUrl: './adm-projects.page.html',
  styleUrls: ['./adm-projects.page.scss'],
  standalone: false,
})
export class AdmProjectsPage implements OnInit {

  abaSelecionada: string = 'Todos';

  projetos = [
    {
      titulo: 'Gamificação no Ensino de Matemática',
      categoria: 'Ensino',
      professor: 'Ricardo Alves',
      inscricoes: 'abertas',
      status: 'Publicado',
      classe: 'published'
    },

    {
      titulo: 'Saúde mental universitária',
      categoria: 'Extensão',
      professor: 'Juliana Costa',
      inscricoes: 'abertas',
      status: 'Pendente',
      classe: 'pending'
    },

    {
      titulo: 'Novos Materiais para Energia Solar',
      categoria: 'Pesquisa',
      professor: 'Carlos Mendes',
      inscricoes: 'fechadas',
      status: 'Encerrado',
      classe: 'editing'
    }
  ];

  projetosFiltrados = this.projetos;

  constructor() { }

  ngOnInit() {
  }

  selecionarAba(aba: string) {

    this.abaSelecionada = aba;

    if (aba === 'Todos') {

      this.projetosFiltrados = this.projetos;

    } else {

      this.projetosFiltrados = this.projetos.filter(
        projeto => projeto.status === aba.slice(0, -1)
      );

    }
  }

}