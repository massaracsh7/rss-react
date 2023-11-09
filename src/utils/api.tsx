import { API_URL } from '../constants/constants';
import { ApiResponse, Character } from '../types/types';

export async function getCharacters(currentPage: string) {
  try {
    const res: Response = await fetch(currentPage);
    const data: ApiResponse = await res.json();
    console.log(data);
    return data;
  } catch {
    return null;
  }
}

export async function searchCharacters(query: string) {
  try {
    const res: Response = await fetch(`${API_URL}/?name=${query}`);
    const data: ApiResponse = await res.json();
    console.log(data);
    return data;
  } catch {
    return null;
  }
}

export async function getCharacter(id: number) {
  try {
    const res: Response = await fetch(`${API_URL}/${id}`);
    const data: Character = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function getPages(currentPageUrl: string) {
  try {
    const res: Response = await fetch(currentPageUrl);
    const data: ApiResponse = await res.json();
    return data;
  } catch {
    return null;
  }
}
