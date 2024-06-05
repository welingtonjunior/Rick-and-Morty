export class Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    url: string;
    created: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.species = data.species;
      this.type = data.type;
      this.gender = data.gender;
      this.origin = data.origin;
      this.location = data.location;
      this.image = data.image;
      this.episode = data.episode;
      this.url = data.url;
      this.created = data.created;
    }
  
    isAlive(): boolean {
      return this.status === 'Alive';
    }
  
    
    getOriginName(): string {
      return this.origin.name;
    }
  
    
    getLocationName(): string {
      return this.location.name;
    }
  
   
    getEpisodeCount(): number {
      return this.episode.length;
    }
  }
  