import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/project-list/project-list.module').then((m) => m.ProjectListPageModule),
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
  },
  {
    path: 'administrator',
    loadChildren: () =>
      import('./pages/administrator/administrator.module').then((m) => m.AdministratorPageModule),
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
  },  {
    path: 'adm-users',
    loadChildren: () => import('./pages/adm-users/adm-users.module').then( m => m.AdmUsersPageModule)
  },
  {
    path: 'adm-more',
    loadChildren: () => import('./pages/adm-more/adm-more.module').then( m => m.AdmMorePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
