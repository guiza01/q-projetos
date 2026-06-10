import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Adicionado DatePipe para formatar as datas
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  providers: [DatePipe] // Permite usar formatação de data no TypeScript se necessário
})
export class ProjectListPage implements OnInit {
  
  projetosCompletos: any[] = [];
  projetosFiltrados: any[] = [];
  
  filtroSelecionado: string = 'TODOS';
  termoBusca: string = '';

  // Variáveis para o Modal de Detalhes
  isModalAberto: boolean = false;
  projetoSelecionado: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarProjetos();
  }

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

  buscarProjeto(event: any) {
    this.termoBusca = event.target.value ? event.target.value.toLowerCase() : '';
    this.aplicarFiltros();
  }

  filtrarPorTipo(tipo: string) {
    this.filtroSelecionado = tipo;
    this.aplicarFiltros();
  }

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

  // Funções para abrir e fechar os detalhes do projeto
  abrirDetalhes(projeto: any) {
    this.projetoSelecionado = projeto;
    this.isModalAberto = true;
  }

  fecharDetalhes() {
    this.isModalAberto = false;
    this.projetoSelecionado = null;
  }
}