import { createContext } from 'react';

export const SearchDefault: string = localStorage.getItem('textQuery') ?? '';

interface SearchContextInt {
  searchData: string;
  setSearchData: (data: string) => void;
}

const defaultContext: SearchContextInt = {
  searchData: SearchDefault,
  setSearchData: (data) => console.log(data),
};

export const SearchContext = createContext(defaultContext);
