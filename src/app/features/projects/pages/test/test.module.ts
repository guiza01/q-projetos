import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';
import { TestPage } from './test.page';

@NgModule({
  imports: [CommonModule, IonicModule, TestPageRoutingModule],
  declarations: [TestPage],
})
export class TestPageModule {}
