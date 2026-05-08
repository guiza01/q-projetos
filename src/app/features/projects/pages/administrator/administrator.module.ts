import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectCardModule } from '../../components/project-card/project-card.module';
import { AdministratorPageRoutingModule } from './administrator-routing.module';
import { AdministratorPage } from './administrator.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProjectCardModule, AdministratorPageRoutingModule],
  declarations: [AdministratorPage],
})
export class AdministratorPageModule {}
