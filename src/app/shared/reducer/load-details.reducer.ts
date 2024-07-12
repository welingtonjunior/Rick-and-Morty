import { createReducer, on } from "@ngrx/store";
import { Character, CharacterDetails } from "../models/character.interface";
import { loadCharactersSuccess, loadDetailsFailure, loadDetailsRequest, loadDetailsSuccess } from "../action/load-characters.action";
import { state } from "@angular/animations";


export interface loadDetailsState {
    data: CharacterDetails;
    loading: boolean;
    error: any;
}

export const initialStateDetails: loadDetailsState = {
    data: null,
    loading: false,
    error: null
}

export const detailsReducer =  createReducer(
    initialStateDetails,
    on(loadDetailsSuccess, (state, {data})=> ({
        ...state,
        data,
        loading: false,
        error: false
    })),
    on(loadDetailsFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    })),
    on(loadDetailsRequest, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
    

)