import { createAction, props } from "@ngrx/store";
import { FilterEpisodes } from "../models/filter-episodes.interface";

export const loadEpisodesRequest = createAction(
    '[Episodes] - Load Episodes Request',
    props<{ params?: FilterEpisodes, page?: number}>()
);

export const loadEpisodesSuccess = createAction(
    '[Episodes] - Load Episodes Success',
    props<{ episodes: any[], info: any}>()
);

export const loadEpisodesFailure = createAction(
    '[Episodes] - Load Episodes Failure',
    props<{ error: any }>()
) 