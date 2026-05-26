import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 1. IMPORTAR AQUI
import { IonicModule } from '@ionic/angular';

import { EsqueceuSenhaPageRoutingModule } from './esqueceu-senha-routing.module';
import { EsqueceuSenhaPage } from './esqueceu-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // 2. ADICIONAR AQUI
    IonicModule,
    EsqueceuSenhaPageRoutingModule
  ],
  declarations: [EsqueceuSenhaPage]
})
export class EsqueceuSenhaPageModule {}
