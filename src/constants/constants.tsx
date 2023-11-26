export const API_URL = 'https://rickandmortyapi.com/api/character';

export const BASE_URL =
  typeof window !== 'undefined' && localStorage.getItem('textQuery')
    ? `${API_URL}/?name=${localStorage.getItem('textQuery')}`
    : API_URL;
