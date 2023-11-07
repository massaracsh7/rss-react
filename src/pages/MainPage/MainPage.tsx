import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { ButtonReload } from '../../components/Buttons';
import { CardsList } from '../../components/CardsList';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { PerPage } from '../../components/PerPage';
import { Search } from '../../components/Search';
import { API_URL } from '../../constants/constants';
import { ItemsContext } from '../../contexts/ItemsContext';
import { SearchContext } from '../../contexts/SearchContext';
import { CharacterArray } from '../../types/types';
import { getCharacters } from '../../utils/api';
import './style.css';

export default function MainPage() {
  const searchContext = useContext(SearchContext);
  const itemsContext = useContext(ItemsContext);
  const [search, setSearch] = useState(searchContext.searchData);
  const [loading, setLoading] = useState(false);
  const [textError, setError] = useState('');
  const [characters, setCharacters] = useState<CharacterArray>([]);
  const [nextPage, setNextPage] = useState<string | null>();
  const [prevPage, setPrevPage] = useState<string | null>();
  const [currentPage, setCurrentPage] = useState(
    search ? `${API_URL}/?name=${search}` : `${API_URL}?page=1`,
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

  useEffect(() => {
    itemsContext.setItemsData(characters);
  }, [characters, itemsContext]);

  const handleSubmit = () => {
    localStorage.setItem('textQuery', search);
    searchContext.setSearchData(search);
  };

  const handleSearchInput = (searchText: string) => {
    setSearch(searchText);
    localStorage.setItem('textQuery', search);
    searchContext.setSearchData(search);
  };

  const handleCountItems = useCallback(
    (num: string) => {
      setCountItems(num);
      setCurrentPage(search ? `${API_URL}/?name=${search}` : `${API_URL}?page=1`);
    },
    [search],
  );

  const putNextPage = useCallback(() => {
    if (nextPage) {
      setCurrentPage(nextPage);
    }
  }, [nextPage]);

  const putPrevPage = useCallback(() => {
    if (prevPage) {
      setCurrentPage(prevPage);
    }
  }, [prevPage]);

  const viewPage = useMemo(() => {
    if (loading) return <Loader />;
    if (textError !== '')
      return (
        <div>
          {textError} <ButtonReload />
        </div>
      );
    return <CardsList countItems={countItems} />;
  }, [countItems, loading, textError]);

  return (
    <div className='main-page'>
      <Header />
      <Search handleSubmit={handleSubmit} search={search} setSearch={handleSearchInput} />
      <div className='main__flex'>
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          putNextPage={putNextPage}
          putPrevPage={putPrevPage}
          num={page}
        />
        <PerPage setCountItems={handleCountItems} />
      </div>
      <div className='main__flex'>
        {viewPage}
        <Outlet />
      </div>
    </div>
  );
}
