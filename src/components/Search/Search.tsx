import { useEffect, useState } from 'react';

import { API_URL } from '../../constants/constants';
import { setBaseName, setCards, setCurrentPage, setSearchData } from '../../store/Slice';
import { useFetchCharacters } from '../../store/characterApi';
import { useAppDispatch, useAppSelector } from '../../types/types';
import './style.css';

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const { searchData, baseName } = useAppSelector((state) => state.storeReducer);
  const [search, setSearch] = useState(searchData);
  const { data } = useFetchCharacters(baseName);

  useEffect(() => {
    dispatch(setCards(data?.results)), dispatch(setCurrentPage(1));
  }, [data?.results, dispatch, search]);

  useEffect(() => {
    dispatch(setBaseName(search ? `${API_URL}/?name=${search}` : API_URL));
  }, [dispatch, search]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchData(search));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <form className='search__form' onSubmit={handleSubmit}>
        <input
          className='search__input'
          autoFocus
          type='search'
          value={search}
          onChange={handleChange}
          data-testid='search'
        />
        <button type='submit' data-testid='submit'>
          🔍
        </button>
      </form>
    </>
  );
}
