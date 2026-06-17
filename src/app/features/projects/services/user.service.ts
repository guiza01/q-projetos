import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UsersApiService } from 'src/app/core/services/user-api.service';
import { User } from '../models/user.model';
import { toUser, toUsers } from '../mappers/user.mapper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly usersApiService: UsersApiService
  ) {}

  list(): Observable<User[]> {
    return this.usersApiService
      .listarUsuarios()
      .pipe(map(toUsers));
  }

  updateProfile(
    id: number,
    payload: { role: string; vinculo: string }
  ): Observable<User> {
    return this.usersApiService
      .atualizarPerfilUsuario(id, payload)
      .pipe(map(toUser));
  }
}