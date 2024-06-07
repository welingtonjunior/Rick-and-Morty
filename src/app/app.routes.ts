import { Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => 
      import('./home/home.component').then(
        (c) => c.HomeComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./characters/character-list/character-list.component').then(
        (c) => c.CharacterListComponent
      ),

    canActivate: [AuthGuard],
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./episodes/episodes-list/episodes-list.component').then(
        (c) => c.EpisodesListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'characters/details/:id',
    loadComponent: () =>
      import('./characters/character-detail/character-detail.component')
        .then((c) => c.CharacterDetailComponent),
        canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
