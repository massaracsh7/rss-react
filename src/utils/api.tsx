import { ApiResponse } from '../types/types';

export async function getCharacters() {
  try {
    const res: Response = await fetch(`https://rickandmortyapi.com/api/character`);
    const data: ApiResponse = await res.json();
    console.log(data);
    return data.results;
  } catch {
    return null;
  }
}
