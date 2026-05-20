import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmUsersPage } from './adm-users.page';

const routes: Routes = [
  {
    path: '',
    component: AdmUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmUsersPageRoutingModule {}
