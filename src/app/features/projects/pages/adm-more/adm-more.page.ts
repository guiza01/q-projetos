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
  categoriaSelecionada: string | null = null;
  modalidadeSelecionada: string | null = null;

  projetosBrutos: ProjectApiModel[] = [];
  leadsBrutos: any[] = []; 

  categorias: any[] = [];
  modalidades: any[] = [];

  projetosFiltrados: ProjectApiModel[] = [];
  leadsFiltrados: any[] = [];

  constructor(
    private projectsApiService: ProjectsApiService
  ) {}

  ngOnInit() {
    this.carregarDadosDoServidor();
  }

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
    this.categoriaSelecionada = null;
    this.modalidadeSelecionada = null;
    this.projetosFiltrados = [];
    this.leadsFiltrados = [];
  }

  carregarDadosDoServidor() {
    this.projectsApiService.listProjects().subscribe({
      next: (projetos: ProjectApiModel[]) => {
        this.projetosBrutos = projetos;

        this.categorias = [
          {
            idKey: 'PESQUISA',
            nome: 'Pesquisa',
            quantidade: projetos.filter(p => p.tipo === 'PESQUISA').length,
            status: 'Projetos cadastrados',
            icone: 'flask-outline'
          },
          {
            idKey: 'ENSINO',
            nome: 'Ensino',
            quantidade: projetos.filter(p => p.tipo === 'ENSINO').length,
            status: 'Projetos cadastrados',
            icone: 'school-outline'
          },
          {
            idKey: 'EXTENSAO',
            nome: 'Extensão',
            quantidade: projetos.filter(p => p.tipo === 'EXTENSAO' || p.tipo === 'EXTENSÃO').length,
            status: 'Projetos cadastrados',
            icone: 'people-outline'
          }
        ];

        this.carregarLeadsDoServidor();
      },
      error: (erro) => console.error('Erro ao carregar projetos:', erro)
    });
  }

  carregarLeadsDoServidor() {
    this.projectsApiService.listInteresses().subscribe({
      next: (leads: any[]) => {
        this.leadsBrutos = leads;

        this.modalidades = [
          {
            idKey: 'BOLSISTA',
            nome: 'Bolsista',
            quantidade: leads.filter(l => l.modalidadePretendida === 'BOLSISTA').length,
            status: 'Candidatos inscritos',
            icone: 'cash-outline'
          },
          {
            idKey: 'VOLUNTARIO',
            nome: 'Voluntário',
            // CONTA DE FORMA INTELIGENTE: Procura por "VOLUNT" para aceitar com ou sem acento
            quantidade: leads.filter(l => 
              l.modalidadePretendida?.toString().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes('VOLUNT')
            ).length,
            status: 'Candidatos inscritos',
            icone: 'heart-outline'
          }
        ];
      },
      error: (erro) => console.error('Erro ao buscar interesses do servidor:', erro)
    });
  }

  selecionarCategoria(tipo: string) {
    if (this.categoriaSelecionada === tipo) {
      this.categoriaSelecionada = null;
      this.projetosFiltrados = [];
    } else {
      this.categoriaSelecionada = tipo;
      this.projetosFiltrados = this.projetosBrutos.filter(p => p.tipo === tipo);
    }
  }

  selecionarModalidade(modalidade: string) {
    if (this.modalidadeSelecionada === modalidade) {
      this.modalidadeSelecionada = null;
      this.leadsFiltrados = [];
    } else {
      this.modalidadeSelecionada = modalidade;
      
      this.leadsFiltrados = this.leadsBrutos.filter(lead => {
        if (!lead || !lead.modalidadePretendida) return false;
        
        const textoBancoLimpo = lead.modalidadePretendida.toString().trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const textoCardLimpo = modalidade.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        if (textoCardLimpo === 'VOLUNTARIO') {
          return textoBancoLimpo.includes('VOLUNT');
        }
        
        return textoBancoLimpo === textoCardLimpo;
      });
    }
  }
}