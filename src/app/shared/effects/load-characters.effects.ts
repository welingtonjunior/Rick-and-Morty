import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import {
  loadCharactersFailure,
  loadCharactersRequest,
  loadCharactersSuccess,
} from '../action/load-characters.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiResponse } from '../models/character.interface';

@Injectable()
export class CharactersEffects {
  constructor(private action$: Actions, private apiService: ApiService) {}

  loadCharacters$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadCharactersRequest),
      mergeMap(action =>
        this.apiService.getCharacters(action.params, action.page).pipe(
          map(data => loadCharactersSuccess({ characters: data.results ? data.results : data, info: data.info })),
          catchError(error => of(loadCharactersFailure({ error })))
        )
      )
    )
  );
}
