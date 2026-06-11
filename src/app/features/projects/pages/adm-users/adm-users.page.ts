import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  private readonly usersService: UsersService,
  private readonly alertController: AlertController
) {}

  ngOnInit() {
  this.carregarUsuarios();
}

  formatarRole(role: string): string {

  switch (role) {

    case 'ROLE_ADMIN':
      return 'Administrador';

    case 'ROLE_COORD':
      return 'Coordenador';

    case 'ROLE_USER':
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

  async abrirMenuUsuario(usuario: User): Promise<void> {
    const alert = await this.alertController.create({
      header: usuario.nome,
      buttons: [
        {
          text: 'Coordenador',
          handler: () => {
            this.tornarCoordenador(usuario);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  private tornarCoordenador(usuario: User): void {
    this.usersService.updateProfile(usuario.id, {
      role: 'ROLE_COORD',
      vinculo: usuario.vinculo || 'SERVIDOR'
    }).subscribe({
      next: () => {
        this.carregarUsuarios();
      },
      error: (error) => {
        console.error('Erro ao atualizar perfil do usuário:', error);
      }
    });
  }

}