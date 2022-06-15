import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassicModePageRoutingModule } from './classic-mode-routing.module';
import { ClassicModePage } from './classic-mode.page';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { GameSummaryComponent } from 'src/app/components/game-summary/game-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassicModePageRoutingModule,
  ],
  declarations: [ClassicModePage, QuestionComponent, GameSummaryComponent],
})
export class ClassicModePageModule {}
