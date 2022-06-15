import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RushModePage } from './rush-mode.page';

const routes: Routes = [
  {
    path: '',
    component: RushModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RushModePageRoutingModule {}
