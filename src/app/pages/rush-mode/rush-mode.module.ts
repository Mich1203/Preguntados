import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RushModePageRoutingModule } from './rush-mode-routing.module';

import { RushModePage } from './rush-mode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RushModePageRoutingModule
  ],
  declarations: [RushModePage]
})
export class RushModePageModule {}
