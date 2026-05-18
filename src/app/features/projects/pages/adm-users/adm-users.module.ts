import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmUsersPageRoutingModule } from './adm-users-routing.module';

import { AdmUsersPage } from './adm-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmUsersPageRoutingModule
  ],
  declarations: [AdmUsersPage]
})
export class AdmUsersPageModule {}
