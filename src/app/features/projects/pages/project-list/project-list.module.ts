import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectCardModule } from '../../components/project-card/project-card.module';
import { ProjectListPageRoutingModule } from './project-list-routing.module';
import { ProjectListPage } from './project-list.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProjectCardModule, ProjectListPageRoutingModule],
  declarations: [ProjectListPage],
})
export class ProjectListPageModule {}
