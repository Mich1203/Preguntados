import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassicModePage } from './classic-mode.page';

const routes: Routes = [
  {
    path: '',
    component: ClassicModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassicModePageRoutingModule {}
