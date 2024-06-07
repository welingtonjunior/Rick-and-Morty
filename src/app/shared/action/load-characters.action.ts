import { createAction, props } from "@ngrx/store";
import { FilterCharacters } from "../models/filter.interface";
import { ApiResponse } from "../models/character.interface";

export const loadCharactersRequest = createAction(
    '[Characters] - Load Characters Request',
    props<{ params?: FilterCharacters, page?: number }>()
);

export const loadCharactersSuccess = createAction(
    '[Characters] - Load Characters Success',
    props<{ characters: any, info: any }>()
)

export const loadCharactersFailure = createAction(
    '[Characters] - Load Characters Failure',
    props<{error: any }>()
)