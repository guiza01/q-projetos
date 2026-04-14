import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
