import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmProjectsPage } from './adm-projects.page';

const routes: Routes = [
  {
    path: '',
    component: AdmProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmProjectsPageRoutingModule {}
