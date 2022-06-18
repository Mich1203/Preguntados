import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaderboardPage } from './leaderboard.page';
import { LeaderboardPageRoutingModule } from './leaderboard-routing.module';
import { LeaderboardTableComponent } from 'src/app/components/leaderboard-table/leaderboard-table.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LeaderboardPageRoutingModule,
  ],
  declarations: [LeaderboardPage, LeaderboardTableComponent],
})
export class LeaderboardPageModule {}
