import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loadCharactersState } from "../reducer/load-characters.reducer";

export const selectCharactersState = createFeatureSelector<loadCharactersState>('loadCharacters');

export const selectCharacters = createSelector(
    selectCharactersState,
    (state: loadCharactersState) => state
)
