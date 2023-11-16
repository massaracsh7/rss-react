import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { ButtonReload } from '../../components/Buttons';
import { CardsList } from '../../components/CardsList';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { PerPage } from '../../components/PerPage';
import { Search } from '../../components/Search';
import { useFetchCharacters } from '../../store/characterApi';
import { useAppSelector } from '../../types/types';
import './style.css';

export default function MainPage() {
  const { baseName, textError } = useAppSelector((state) => state.storeReducer);
  const { isLoading, error } = useFetchCharacters(baseName);

  const viewPage = useMemo(() => {
    if (isLoading) return <Loader />;
    if (error)
      return (
        <div>
          {textError} <ButtonReload />
        </div>
      );
    return <CardsList />;
  }, [error, isLoading, textError]);

  return (
    <div className='main-page' title='main page'>
      <Header />
      <Search />
      <div className='main__flex'>
        <Pagination />
        <PerPage />
      </div>
      <div className='main__flex'>
        {viewPage}
        <Outlet />
      </div>
    </div>
  );
}
