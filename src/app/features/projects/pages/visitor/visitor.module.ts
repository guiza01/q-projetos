import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectCardModule } from '../../components/project-card/project-card.module';
import { VisitorPageRoutingModule } from './visitor-routing.module';
import { VisitorPage } from './visitor.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProjectCardModule, VisitorPageRoutingModule],
  declarations: [VisitorPage],
})
export class VisitorPageModule {}
