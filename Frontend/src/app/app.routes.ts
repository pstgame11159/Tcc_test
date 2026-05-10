import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'it04', pathMatch: 'full' },
  {
    path: 'it04',
    loadComponent: () =>
      import('./features/it04/it04.component').then(m => m.It04Component)
  }
];
