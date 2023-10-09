export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
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

  export interface Data {
    results: Character[];
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
  }


export interface Episode {
  id: number;
  name: string;
  air_date: string;
}
  
  