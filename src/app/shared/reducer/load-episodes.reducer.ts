import { createReducer, on } from '@ngrx/store';
import { loadEpisodesFailure, loadEpisodesRequest, loadEpisodesSuccess } from '../action/load-episodes.action';
import { EpisodesApi } from '../models/episodes.interface';

export interface loadEpisodesState {
  data: EpisodesApi | null;
  error: any;
  loading: boolean;
}

export const initialStateEpisodes: loadEpisodesState = {
  data: null,
  error: null,
  loading: false,
};

export const episodesReducer = createReducer(
  initialStateEpisodes,
  on(loadEpisodesSuccess, (state, { data}) => ({
    ...state,
    data,
    loading: false,
    error: null,
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