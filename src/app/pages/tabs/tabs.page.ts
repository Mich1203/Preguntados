import { Component } from '@angular/core';
import { ITabItem } from 'src/app/interfaces/components/tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  tabs: ITabItem[] = [
    {
      name: 'playTab',
      label: 'Play',
      icon: 'game-controller-outline',
    },
    {
      name: 'homeTab',
      label: 'Home',
      icon: 'home-outline',
    },
    {
      name: 'leaderboardTab',
      label: 'Leaderboard',
      icon: 'stats-chart-outline',
    },
    {
      name: 'settingsTab',
      label: 'Settings',
      icon: 'cog-outline'
    }
  ];

  constructor() {}
}
