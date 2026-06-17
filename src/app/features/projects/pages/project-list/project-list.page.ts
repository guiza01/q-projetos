import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, personOutline, ellipsisHorizontal, peopleOutline, documentTextOutline, openOutline } from 'ionicons/icons';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  providers: [DatePipe]
})
export class ProjectListPage implements OnInit {
  
  // 1. Variáveis de listagem e filtros que o HTML precisa
  projetosCompletos: any[] = [];
  projetosFiltrados: any[] = [];
  filtroSelecionado: string = 'TODOS';
  termoBusca: string = '';

  // 2. Variáveis do Modal de Detalhes cobradas no erro
  isModalAberto: boolean = false;
  projetoSelecionado: any = null;

  constructor(private http: HttpClient, private router: Router) { 
    // Registra todos os ícones necessários para as abas e para o modal
    addIcons({ 
      homeOutline, 
      personOutline, 
      ellipsisHorizontal, 
      peopleOutline, 
      documentTextOutline, 
      openOutline 
    });
  }

  ngOnInit() {
    this.carregarProjetos();
  }

  // 3. Função para carregar os projetos da API
  carregarProjetos() {
    const url = 'https://q-projetos-backend.onrender.com/api/projetos';
    this.http.get<any[]>(url).subscribe({
      next: (dados) => {
        this.projetosCompletos = dados.filter(p => p.statusModeracao === 'PUBLICADO');
        this.aplicarFiltros();
      },
      error: (erro) => console.error('Erro ao buscar projetos:', erro)
    });
  }

  // 4. Função de busca por texto (ionInput)
  buscarProjeto(event: any) {
    this.termoBusca = event.target.value ? event.target.value.toLowerCase() : '';
    this.aplicarFiltros();
  }

  // 5. Função de filtro por categoria (Ensino, Pesquisa, Extensão)
  filtrarPorTipo(tipo: string) {
    this.filtroSelecionado = tipo;
    this.aplicarFiltros();
  }

  // 6. Lógica que une a busca por texto e os chips de filtro
  aplicarFiltros() {
    let resultado = [...this.projetosCompletos];

    if (this.filtroSelecionado !== 'TODOS') {
      resultado = resultado.filter(
        projeto => projeto.tipo?.toUpperCase() === this.filtroSelecionado.toUpperCase()
      );
    }

    if (this.termoBusca.trim() !== '') {
      resultado = resultado.filter(projeto => {
        const tituloContem = projeto.titulo?.toLowerCase().includes(this.termoBusca);
        const descricaoContem = projeto.descricao?.toLowerCase().includes(this.termoBusca);
        return tituloContem || descricaoContem;
      });
    }

    this.projetosFiltrados = resultado;
  }

  // 7. Funções do Modal de detalhes (click)
  abrirDetalhes(projeto: any) {
    this.projetoSelecionado = projeto;
    this.isModalAberto = true;
  }

  fecharDetalhes() {
    this.isModalAberto = false;
    this.projetoSelecionado = null;
  }

  // 8. Função de navegação do Footer inferior
  navegar(rota: string) {
    this.router.navigateByUrl(rota).catch(erro => {
      console.error('Erro ao navegar para ' + rota, erro);
    });
  }
}