import { createReducer, on } from '@ngrx/store';
import { loadEpisodesFailure, loadEpisodesRequest, loadEpisodesSuccess } from '../action/load-episodes.action';
import { loadCharactersFailure } from '../action/load-characters.action';

export interface loadEpisodesState {
  episodes: any[];
  error: any;
  info: any;
  loading: boolean;
}

export const initialStateEpisodes: loadEpisodesState = {
  episodes: [],
  info: null,
  error: null,
  loading: false,
};

export const episodesReducer = createReducer(
  initialStateEpisodes,
  on(loadEpisodesSuccess, (state, { episodes, info }) => ({
    ...state,
    episodes,
    loading: false,
    error: null,
    info,
  })),
  on(loadEpisodesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadEpisodesRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  }))
);