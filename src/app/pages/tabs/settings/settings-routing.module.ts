import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaveChangesGuard } from 'src/app/guards/save-changes.guard';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    canDeactivate: [SaveChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
