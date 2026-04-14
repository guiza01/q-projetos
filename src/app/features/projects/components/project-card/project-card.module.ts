import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ProjectCardComponent } from './project-card.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ProjectCardComponent],
  exports: [ProjectCardComponent],
})
export class ProjectCardModule {}
