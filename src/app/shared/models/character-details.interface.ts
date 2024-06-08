export interface Location {
    name: string;
    url: string;
}
  
export  interface Origin {
    name: string;
    url: string;
}
  
export interface CharacterDetails {
    created: string;
    episode: string[];
    gender: string;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Origin;
    species: string;
    status: string;
    type: string;
    url: string;
}