import { createAction, props } from "@ngrx/store";
import { FilterEpisodesParams } from "../models/filter-episodes.interface";
import { EpisodesApi } from "../models/episodes.interface";

export const loadEpisodesRequest = createAction(
    '[Episodes] - Load Episodes Request',
    props<{ params?: FilterEpisodesParams, page?: number}>()
);

export const loadEpisodesSuccess = createAction(
    '[Episodes] - Load Episodes Success',
    props<{ data: EpisodesApi }>()
);

export const loadEpisodesFailure = createAction(
    '[Episodes] - Load Episodes Failure',
    props<{ error: any }>()
) 