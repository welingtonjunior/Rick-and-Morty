import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters',
    loadComponent: () =>
      import('./characters/character-list/character-list.component').then(
        (c) => c.CharacterListComponent
      ),
      children: [
        {
          path:'details/:id',
          loadComponent: () => 
            import('./characters/character-detail/character-detail.component').then(
              (c) => c.CharacterDetailComponent
            )
        }
      ]
    },
    {
      path: 'episodes',
      loadComponent: () =>
        import('./episodes/episodes-list/episodes-list.component').then(
          (c) => c.EpisodesListComponent
        ),
        
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((c) => c.LoginComponent),
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
];
