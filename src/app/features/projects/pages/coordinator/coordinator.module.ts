import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectCardModule } from '../../components/project-card/project-card.module';
import { CoordinatorPageRoutingModule } from './coordinator-routing.module';
import { CoordinatorPage } from './coordinator.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProjectCardModule, CoordinatorPageRoutingModule],
  declarations: [CoordinatorPage],
})
export class CoordinatorPageModule {}
