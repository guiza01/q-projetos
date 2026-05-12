import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmProjectsPageRoutingModule } from './adm-projects-routing.module';

import { AdmProjectsPage } from './adm-projects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmProjectsPageRoutingModule
  ],
  declarations: [AdmProjectsPage]
})
export class AdmProjectsPageModule {}
