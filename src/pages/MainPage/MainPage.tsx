import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ButtonReload } from '../../components/Buttons';
import { CardsList } from '../../components/CardsList';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Search } from '../../components/Search';
import { CharacterArray } from '../../types/types';
import { getCharacters, searchCharacters } from '../../utils/api';
import './style.css';

export default function MainPage() {
  const [search, setSearch] = useState(localStorage.getItem('textQuery') ?? '');
  const [loading, setLoading] = useState(false);
  const [textError, setError] = useState('');
  const [characters, setCharacters] = useState<CharacterArray>([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = search === '' ? await getCharacters() : await searchCharacters(search);
        if (data) {
          setCharacters(data);
          setLoading(false);
        } else {
          setLoading(false);
          setError('Sorry, Your character is not found. Please, ');
          localStorage.setItem('textQuery', '');
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    getData();
  }, [search]);

  const handleSubmit = () => {
    localStorage.setItem('textQuery', search);
  };

  const handleSearchInput = (searchText: string) => {
    setSearch(searchText);
    localStorage.setItem('textQuery', search);
  };

  return (
    <div className='main-page'>
      <Header />
      <Search handleSubmit={handleSubmit} search={search} setSearch={handleSearchInput} />

      <div className='main__flex'>
        <Outlet />
        {loading ? (
          <Loader />
        ) : textError !== '' ? (
          <div>
            {textError} <ButtonReload />
          </div>
        ) : (
          <Link to={`/`}>
            <CardsList charactArr={characters} />
          </Link>
        )}
      </div>
    </div>
  );
}
