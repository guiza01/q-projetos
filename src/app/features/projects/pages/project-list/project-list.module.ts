import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectListPageRoutingModule } from './project-list-routing.module';
import { ProjectListPage } from './project-list.page'; // Importação do componente

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectListPageRoutingModule,
    ProjectListPage 
  ],
  declarations: [
  ]
})
export class ProjectListPageModule {}