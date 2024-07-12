import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loadDetailsState } from "../reducer/load-details.reducer";

export const selectDetailsState = createFeatureSelector<loadDetailsState>('loadDetails')

export const selectDetails = createSelector(
    selectDetailsState,
    (state: loadDetailsState) => state
)