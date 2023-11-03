import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { ButtonReload } from '../../components/Buttons';
import { CardsList } from '../../components/CardsList';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import Pagination from '../../components/Pagination/Pagination';
import PerPage from '../../components/PerPage/PerPage';
import { Search } from '../../components/Search';
import { CharacterArray } from '../../types/types';
import { getCharacters } from '../../utils/api';
import './style.css';

export default function MainPage() {
  const [search, setSearch] = useState(localStorage.getItem('textQuery') ?? '');
  const [loading, setLoading] = useState(false);
  const [textError, setError] = useState('');
  const [characters, setCharacters] = useState<CharacterArray>([]);
  const [nextPage, setNextPage] = useState<string | null>();
  const [prevPage, setPrevPage] = useState<string | null>();
  const [currentPage, setCurrentPage] = useState(
    search
      ? `https://rickandmortyapi.com/api/character/?name=${search}`
      : `https://rickandmortyapi.com/api/character?page=1`,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [countItems, setCountItems] = useState('20');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getCharacters(currentPage);
        if (data?.results) {
          setNextPage(data.info.next);
          setPrevPage(data.info.prev);
          setCharacters(data.results);
          setSearchParams(currentPage.slice(currentPage.indexOf('?')));
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
  }, [currentPage, search, setSearchParams, setCountItems]);

  const handleSubmit = () => {
    localStorage.setItem('textQuery', search);
  };

  const handleSearchInput = (searchText: string) => {
    setSearch(searchText);
    localStorage.setItem('textQuery', search);
  };

  const handleCountItems = (num: string) => {
    setCountItems(num);
    setCurrentPage(
      search
        ? `https://rickandmortyapi.com/api/character/?name=${search}`
        : `https://rickandmortyapi.com/api/character?page=1`,
    );
  };

  function putNextPage() {
    nextPage ? setCurrentPage(nextPage) : null;
  }

  function putPrevPage() {
    prevPage ? setCurrentPage(prevPage) : null;
  }

  return (
    <div className='main-page'>
      <Header />
      <Search handleSubmit={handleSubmit} search={search} setSearch={handleSearchInput} />
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        putNextPage={putNextPage}
        putPrevPage={putPrevPage}
        num={page}
      />
      <PerPage setCountItems={handleCountItems} />
      <div className='main__flex'>
        {loading ? (
          <Loader />
        ) : textError !== '' ? (
          <div>
            {textError} <ButtonReload />
          </div>
        ) : (
          <CardsList charactArr={characters} countItems={countItems} />
        )}
        <Outlet />
      </div>
    </div>
  );
}
