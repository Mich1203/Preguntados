import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayPage } from './play.page';
import { PlayPageRoutingModule } from './play-routing.module';
import { GamemodeSelectorComponent } from 'src/app/components/gamemode-selector/gamemode-selector.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, PlayPageRoutingModule],
  declarations: [PlayPage, GamemodeSelectorComponent],
})
export class PlayPageModule {}
