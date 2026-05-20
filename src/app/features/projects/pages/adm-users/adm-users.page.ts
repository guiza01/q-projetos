import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.page.html',
  styleUrls: ['./adm-users.page.scss'],
  standalone: false,
})
export class AdmUsersPage implements OnInit {

  abaSelecionada = 'todos';

  usuarios = [
    {
      nome: 'Ricardo Alves',
      email: 'ricardo@instituicao.edu.br',
      tipo: 'Coordenador',
      imagem: 'https://i.pravatar.cc/150?img=12'
    },

    {
      nome: 'Juliana Costa',
      email: 'juliana@instituicao.edu.br',
      tipo: 'Coordenador',
      imagem: 'https://i.pravatar.cc/150?img=32'
    },

    {
      nome: 'Ana Oliveira',
      email: 'ana@instituicao.edu.br',
      tipo: 'Usuário',
      imagem: 'https://i.pravatar.cc/150?img=47'
    },

    {
      nome: 'Admin Global',
      email: 'admin@instituicao.edu.br',
      tipo: 'Administrador',
      imagem: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  textoBusca = '';

  usuariosFiltrados = this.usuarios;

  constructor() { }

  ngOnInit() {
  }

  filtrarUsuarios() {

  let usuarios = this.usuarios;

  // FILTRO DA ABA
  if (this.abaSelecionada !== 'todos') {

    usuarios = usuarios.filter(
      usuario =>
        usuario.tipo.toLowerCase() === this.abaSelecionada
    );

  }

  // FILTRO DA BUSCA
  if (this.textoBusca.trim() !== '') {

    usuarios = usuarios.filter(usuario =>
      usuario.nome.toLowerCase()
      .includes(this.textoBusca.toLowerCase())
    );

  }

    this.usuariosFiltrados = usuarios;
  }

  selecionarAba(tipo: string) {
    this.abaSelecionada = tipo;
    this.filtrarUsuarios();
  }

}