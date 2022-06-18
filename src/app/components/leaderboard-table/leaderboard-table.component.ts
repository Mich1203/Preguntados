import { Component, Input, OnInit } from '@angular/core';
import { ILeaderboardData } from 'src/app/interfaces/leaderboard';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.component.html',
  styleUrls: ['./leaderboard-table.component.scss'],
})
export class LeaderboardTableComponent implements OnInit {
  @Input() data: ILeaderboardData = [];
  @Input() mode = 'classic';

  constructor() {}

  ngOnInit() {}

  getBadgeColor(position: number) {
    switch (position) {
      case 1:
        return 'warning';
      case 2:
        return 'medium';
      case 3:
        return 'light';
    }
  }
}
