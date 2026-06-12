import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visitor',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/project-list/project-list.module').then((m) => m.ProjectListPageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_COORD', 'ROLE_USER'] },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'coordinator',
    loadChildren: () =>
      import('./pages/coordinator/coordinator.module').then((m) => m.CoordinatorPageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_COORD'] },
  },
  {
    path: 'administrator',
    loadChildren: () =>
      import('./pages/administrator/administrator.module').then((m) => m.AdministratorPageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'visitor',
    loadChildren: () =>
      import('./pages/visitor/visitor.module').then((m) => m.VisitorPageModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/project-edit/project-edit.module').then((m) => m.ProjectEditPageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_COORD'] },
  },
  {
    path: 'adm-users',
    loadChildren: () => import('./pages/adm-users/adm-users.module').then((m) => m.AdmUsersPageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'adm-more',
    loadChildren: () => import('./pages/adm-more/adm-more.module').then((m) => m.AdmMorePageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then((m) => m.CadastroPageModule)
  },
  {
    path: 'esqueceu-senha',
    loadChildren: () => import('./pages/esqueceu-senha/esqueceu-senha.module').then((m) => m.EsqueceuSenhaPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then((m) => m.TestPageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'project-create',
    loadChildren: () => import('./pages/project-create/project-create.module').then((m) => m.ProjectCreatePageModule),
    canMatch: [authGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_COORD'] },
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  {
    path: 'project-details/:id',
    loadChildren: () => import('./pages/project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
