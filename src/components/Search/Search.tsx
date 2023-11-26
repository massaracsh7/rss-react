import React, { useState } from 'react';

import { useRouter } from 'next/router';

import styles from './Search.module.css';

export default function SearchInput() {
  const [search, setSearch] = useState('');
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(search);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const router = useRouter();
  const handleSearch = (search: string): void => {
    router.push({
      query: {
        page: '1',
        name: search,
      },
    });
    console.log(router);
  };

  return (
    <>
      <form className={styles['search__form']} onSubmit={handleSubmit}>
        <input
          className={styles['search__input']}
          autoFocus
          type='search'
          data-testid='search'
          onChange={handleChange}
        />
        <button type='submit' data-testid='submit'>
          🔍
        </button>
      </form>
    </>
  );
}
