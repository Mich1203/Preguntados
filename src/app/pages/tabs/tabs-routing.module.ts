import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'leaderboardTab',
        loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardPageModule)
      },
      {
        path: 'playTab',
        loadChildren: () => import('./play/play.module').then(m => m.PlayPageModule)
      },
      {
        path: 'homeTab',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'settingsTab',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/homeTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/homeTab',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
