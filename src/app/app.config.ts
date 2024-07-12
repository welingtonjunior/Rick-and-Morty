import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CharactersEffects } from './shared/effects/load-characters.effects';
import { charactersReducer } from './shared/reducer/load-characters.reducer';
import { episodesReducer } from './shared/reducer/load-episodes.reducer';
import { LoadEpisodesEffects } from './shared/effects/load-episodes.effects';
import { detailsReducer } from './shared/reducer/load-details.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules), withDebugTracing()),
    provideHttpClient(),
    provideClientHydration(),
    provideStore({
      loadCharacters: charactersReducer,
      loadDetails: detailsReducer,
      loadEpisodes: episodesReducer
    }),
    provideEffects(CharactersEffects),
    provideEffects(LoadEpisodesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
