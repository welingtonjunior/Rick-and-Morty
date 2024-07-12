
import { createReducer, on } from '@ngrx/store';
import {
  loadCharactersFailure,
  loadCharactersRequest,
  loadCharactersSuccess,
} from '../action/load-characters.action';
import { Character, CharacterApi } from '../models/character.interface';
import { ErrorApi } from '../models/episodes.interface';

export interface loadCharactersState {
  data: CharacterApi | Character;
  error: Partial<ErrorApi> | null;
  loading: boolean;
}

export const initialState: loadCharactersState = {
  data: null,
  loading: false,
  error: null,
};

export const charactersReducer = createReducer(
  initialState,
  on(loadCharactersSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  
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
