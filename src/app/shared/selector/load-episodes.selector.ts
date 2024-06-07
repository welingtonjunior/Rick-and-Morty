import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loadEpisodesState } from "../reducer/load-episodes.reducer";

export const selectEpisodesState = createFeatureSelector<loadEpisodesState>('loadEpisodes');

export const selectEpisodes = createSelector(
    selectEpisodesState,
    (state: loadEpisodesState) => state
)