import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoordinatorPage } from './coordinator.page';

const routes: Routes = [
  {
    path: '',
    component: CoordinatorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorPageRoutingModule {}
