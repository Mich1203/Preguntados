import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [QuestionComponent, GameSummaryComponent, RegisterComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [QuestionComponent, GameSummaryComponent],
})
export class ComponentsModule {}
