import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.page.html',
  styleUrls: ['./adm-users.page.scss'],
  standalone: false,
})
export class AdmUsersPage implements OnInit {

  abaSelecionada = 'todos';

  usuarios: User[] = [];
  usuariosFiltrados: User[] = [];

  textoBusca = '';

  constructor(
  private readonly usersService: UsersService
) {}

  ngOnInit() {
  this.carregarUsuarios();
}

  formatarRole(role: string): string {

  switch (role) {

    case 'ROLE_ADMIN':
      return 'Administrador';

    case 'ROLE_COORDENADOR':
      return 'Coordenador';

    case 'ROLE_USUARIO':
      return 'Usuário';

    default:
      return role;
  }
}

  carregarUsuarios() {

    this.usersService.list().subscribe({

      next: (usuarios) => {

      console.log('USUÁRIOS RECEBIDOS:', usuarios);
      console.log('QUANTIDADE:', usuarios.length);

      this.usuarios = usuarios;
      this.usuariosFiltrados = usuarios;

      },

    error: (error) => {

      console.error('ERRO USUÁRIOS:', error);

    }

  });

}

  filtrarUsuarios() {

  let usuarios = this.usuarios;

  // FILTRO DA ABA
  if (this.abaSelecionada !== 'todos') {

    usuarios = usuarios.filter(
      usuario =>
        usuario.tipo.toLowerCase().includes(this.abaSelecionada)
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
  this.abaSelecionada = tipo.toLowerCase();
  this.filtrarUsuarios();
}

}