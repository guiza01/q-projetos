import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectEditPageRoutingModule } from './project-edit-routing.module';
import { ProjectEditPage } from './project-edit.page';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ProjectEditPageRoutingModule],
  declarations: [ProjectEditPage],
})
export class ProjectEditPageModule {}
