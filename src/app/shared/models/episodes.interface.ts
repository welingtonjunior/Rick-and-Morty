import { Option } from "./global.types";

export interface EpisodesApi {
  info: Info;
  results: Episodes[];
  error: Error
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Episodes {
  id: number;
  name: string;
  airData: string;
  episode: string;
  characters: string[];
  url: string;
  created: string
}

export interface DataEpisodes {
  data: EpisodesApi;
  error: any;
  loading: boolean;
}

export interface Error{
  message: string
} 

export type ErrorApi = Partial<Error> | null
export type EpisodesType = Option<Episodes[]>