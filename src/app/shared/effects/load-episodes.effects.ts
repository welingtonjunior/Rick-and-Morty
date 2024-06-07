import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/services/api.service';
import {
  loadEpisodesFailure,
  loadEpisodesRequest,
  loadEpisodesSuccess,
} from '../action/load-episodes.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LoadEpisodesEffects$ {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodesRequest),
      mergeMap(action =>
        this.apiService.getEpisodes(action.params, action.page).pipe(
          map(data =>
            loadEpisodesSuccess({ episodes: data.results, info: data.info })
          ),
          catchError(error => of(loadEpisodesFailure({ error })))
        )
      )
    )
  );
}
