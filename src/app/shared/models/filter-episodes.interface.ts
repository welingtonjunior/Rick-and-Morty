import { Option } from "./global.types";

export interface FilterEpisodes {
    name: string;
    type: string;
    dimension: string;
    [key: string]: any;
}

export type FilterEpisodesParams = Option<FilterEpisodes>
