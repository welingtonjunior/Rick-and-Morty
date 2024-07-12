import { createAction, props } from "@ngrx/store";
import { FilterCharacters, FilterCharactersParams } from "../models/filter-characters.interface";
import { Character, ApiResponse, CharacterApi, CharacterDetails } from "../models/character.interface";

export const loadCharactersRequest = createAction(
    '[Characters] - Load Characters Request',
    props<{ params?: FilterCharactersParams, page?: number }>()
);

export const loadCharactersSuccess = createAction(
    '[Characters] - Load Characters Success',
    props<{ data: CharacterApi}>()
);

export const loadCharactersFailure = createAction(
    '[Characters] - Load Characters Failure',
    props<{error: any }>()
);

export const loadDetailsRequest = createAction(
    '[Details] - Load Details Request',
    props<{ id: number }>()
);

export const loadDetailsSuccess = createAction(
    '[Details] - Load Details Success',
    props<{ data: CharacterDetails }>()
);

export const loadDetailsFailure = createAction(
    '[Details] - Load Details Failure',
    props<{error: any }>()
);
