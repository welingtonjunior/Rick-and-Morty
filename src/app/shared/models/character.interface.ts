import { ErrorApi } from "./episodes.interface";
import { Option } from "./global.types"

export interface ApiResponse {
  info: Info;
  results: Character[];
  error: ErrorApi
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}


export type CharacterApi = Option<ApiResponse>

export type CharacterDetails = Option<Character>

export type CharacterList = Option<Character[]>