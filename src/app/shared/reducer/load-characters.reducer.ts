import { createReducer, on } from '@ngrx/store';
import {
  loadCharactersFailure,
  loadCharactersRequest,
  loadCharactersSuccess,
} from '../action/load-characters.action';

export interface loadCharactersState {
  characters: any;
  error: any;
  info: any;
  loading: boolean;
}

export const initialState: loadCharactersState = {
  characters: [],
  loading: false,
  error: null,
  info: null,
};

export const charactersReducer = createReducer(
  initialState,
  on(loadCharactersSuccess, (state, { characters, info }) => ({
    ...state,
    characters,
    loading: false,
    error: null,
    info,
  })),
  on(loadCharactersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadCharactersRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  }))
);
