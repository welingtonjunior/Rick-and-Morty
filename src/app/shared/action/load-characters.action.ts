import { createAction, props } from "@ngrx/store";
import { FilterCharacters } from "../models/filter.interface";
import { ApiResponse, Character, Info } from "../models/character.interface";
import { ErrorApi } from "../models/error-api.interface";

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