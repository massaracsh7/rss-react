import { useState } from 'react';

import { fetchName } from '../../store/Slice';
import { useAppDispatch } from '../../types/types';
import './style.css';

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchName({ name: search }));
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
