import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { store } from '../store/index';

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

export interface ApiResponse {
  info: Info;
  results: Character[];
}

export interface StateMainPage {
  characters: Character[];
  search: string;
  loading: boolean;
  textError: string;
}

export const defaultCharacter: Character = {
  id: 0,
  name: '',
  status: 'Alive',
  species: '',
  type: '',
  gender: 'unknown',
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: [''],
  url: '',
  created: '',
};

export interface DataSSP {
  response: {
    isLoading: boolean;
    isError: boolean;
    data: ApiResponse;
  };
}

export interface DetailSSP {
  response: {
    isLoading: boolean;
    isError: boolean;
    data: Character;
  };
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
