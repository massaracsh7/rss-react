import { API_URL } from '../constants/constants';
import { ApiResponse, Character } from '../types/types';

export async function getCharacters() {
  try {
    const res: Response = await fetch(API_URL);
    const data: ApiResponse = await res.json();
    return data.results;
  } catch {
    return null;
  }
}

export async function searchCharacters(query: string) {
  try {
    const res: Response = await fetch(`${API_URL}/?name=${query}`);
    const data: ApiResponse = await res.json();
    return data.results;
  } catch {
    return null;
  }
}

export async function getCharacter(id: number) {
  try {
    const res: Response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data: Character = await res.json();
    return data;
  } catch {
    return null;
  }
}
