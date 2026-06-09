import { UserApiModel } from 'src/app/core/models/user-api.model';
import { User } from '../models/user.model';

const formatRole = (role: string): string => {
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
};

export const toUser = (
  model: UserApiModel
): User => ({
  id: model.id,
  nome: model.nome,
  email: model.email,
  tipo: formatRole(model.role),
  vinculo: model.vinculo,
  imagem: 'https://i.pravatar.cc/150'
});

export const toUsers = (
  models: UserApiModel[]
): User[] => models.map(toUser);