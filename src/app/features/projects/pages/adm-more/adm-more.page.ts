import { Component, OnInit } from '@angular/core';
import { ProjectsApiService } from 'src/app/core/services/projects-api.service';
import { ProjectApiModel } from 'src/app/core/models/project-api.model';

@Component({
  selector: 'app-adm-more',
  templateUrl: './adm-more.page.html',
  styleUrls: ['./adm-more.page.scss'],
  standalone: false,
})
export class AdmMorePage implements OnInit {

  abaSelecionada = 'categorias';

  categorias: any[] = [];
  modalidades: any[] = [];

  constructor(
    private projectsApiService: ProjectsApiService
  ) {}

  ngOnInit() {
    this.carregarEstatisticas();
  }

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
  }

  carregarEstatisticas() {

    this.projectsApiService.listProjects().subscribe({

      next: (projetos: ProjectApiModel[]) => {

        this.categorias = [
          {
            nome: 'Pesquisa',
            quantidade: projetos.filter(
              p => p.tipo === 'PESQUISA'
            ).length,
            status: 'Projetos cadastrados',
            icone: 'flask-outline'
          },
          {
            nome: 'Ensino',
            quantidade: projetos.filter(
              p => p.tipo === 'ENSINO'
            ).length,
            status: 'Projetos cadastrados',
            icone: 'school-outline'
          },
          {
            nome: 'Extensão',
            quantidade: projetos.filter(
              p => p.tipo === 'EXTENSAO'
            ).length,
            status: 'Projetos cadastrados',
            icone: 'people-outline'
          }
        ];

        this.modalidades = [
          {
            nome: 'Bolsista',
            quantidade: projetos.filter(
              p => p.modalidade === 'BOLSISTA'
            ).length,
            status: 'Projetos cadastrados',
            icone: 'cash-outline'
          },
          {
            nome: 'Voluntário',
            quantidade: projetos.filter(
              p => p.modalidade === 'VOLUNTARIO'
            ).length,
            status: 'Projetos cadastrados',
            icone: 'heart-outline'
          }
        ];

      },

      error: (erro) => {
        console.error('Erro ao carregar estatísticas:', erro);
      }

    });
  }
}