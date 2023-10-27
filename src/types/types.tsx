export type PageNumber = string | null;
export type Gender = 'unknown' | 'Female' | 'Male' | 'Genderless';
export type Status = 'Dead' | 'Alive' | 'unknown';

export interface Info {
  count: number;
  pages: number;
  next: PageNumber;
  prev: PageNumber;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type CharacterArray = Array<Character>;

export interface ApiResponse {
  info: Info;
  results: CharacterArray;
}

export interface StateMainPage {
  characters: CharacterArray;
  search: string;
  loading: boolean;
  textError: string;
}
