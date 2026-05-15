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

  usuariosFiltrados = this.usuarios;

  constructor() { }

  ngOnInit() {
  }

  selecionarAba(tipo: string) {
    this.abaSelecionada = tipo;
    if (tipo === 'todos') {
      this.usuariosFiltrados = this.usuarios;
    } else {
      this.usuariosFiltrados = this.usuarios.filter(
        usuario => usuario.tipo.toLowerCase() === tipo
      );

    }
  }

}