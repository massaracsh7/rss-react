import { useState } from 'react';

import { setSearchData } from '../../store/Slice';
import { useAppDispatch } from '../../types/types';
import { userApi } from '../../utils/UserService';
import './style.css';

export default function SearchInput() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  userApi.useGetCharacterByNameQuery(search);

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
