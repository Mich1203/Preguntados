import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'classic-mode',
    loadChildren: () =>
      import('./pages/classic-mode/classic-mode.module').then(
        (m) => m.ClassicModePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'rush-mode',
    loadChildren: () =>
      import('./pages/rush-mode/rush-mode.module').then(
        (m) => m.RushModePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: '',
    redirectTo: 'auth/register',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
