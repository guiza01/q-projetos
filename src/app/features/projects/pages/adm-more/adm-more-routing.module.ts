import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmMorePage } from './adm-more.page';

const routes: Routes = [
  {
    path: '',
    component: AdmMorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmMorePageRoutingModule {}
