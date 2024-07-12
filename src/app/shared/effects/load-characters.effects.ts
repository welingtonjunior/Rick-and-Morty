import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import {
  loadCharactersFailure,
  loadCharactersRequest,
  loadCharactersSuccess,
  loadDetailsFailure,
  loadDetailsRequest,
  loadDetailsSuccess,
} from '../action/load-characters.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiResponse, Character } from '../models/character.interface';


@Injectable()
export class CharactersEffects {
  constructor(private action$: Actions, private apiService: ApiService) {}

  loadCharacters$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadCharactersRequest),
      mergeMap(action =>
        this.apiService.getCharacters(action.params, action.page).pipe(
          map(data => loadCharactersSuccess({ data: data })),
          catchError(error => of(loadCharactersFailure({ error })))
        )
      )
    )
  );

  loadDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadDetailsRequest),
      mergeMap(action =>
        this.apiService.getCharacterById(action.id).pipe(
          map((data: Character) => loadDetailsSuccess({ data })),
          catchError(error => of(loadDetailsFailure({ error })))
        )
      )
    )
  );

}
