import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILeaderboardData } from 'src/app/interfaces/leaderboard';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leaderboard-tab',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  leaderboardData: ILeaderboardData = [];
  selectedMode = 'classic';

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.fetchLeaderboard(this.selectedMode);
    this.subscriptions.add(
      this.apiService.leaderboard
        .pipe(tap((leaderboard) => (this.leaderboardData = leaderboard)))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleModeChange(event: Event) {
    const customEvent = event as CustomEvent<SegmentChangeEventDetail>;
    this.selectedMode = customEvent.detail.value;
    this.apiService.fetchLeaderboard(this.selectedMode);
  }
}
