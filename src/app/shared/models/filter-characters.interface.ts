import { FilterEpisodesParams } from "./filter-episodes.interface";

export type Status = 'alive' | 'dead' | 'unknown';

export interface FilterCharacters {
    name: string;
    status: Status;
    species: string;
    type: string;
    gender: string;
    id: number;
    [key: string]: any;
}

export type FilterCharactersParams = Partial<FilterCharacters>

export type Filter = FilterCharactersParams | FilterEpisodesParams
