import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { ButtonReload } from '../../components/Buttons';
import { CardsList } from '../../components/CardsList';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { PerPage } from '../../components/PerPage';
import { Search } from '../../components/Search';
import { setLoading } from '../../store/Slice';
import { useFetchCharacters } from '../../store/characterApi';
import { useAppDispatch, useAppSelector } from '../../types/types';
import './style.css';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const { baseName, textError } = useAppSelector((state) => state.storeReducer);
  const { isLoading, error } = useFetchCharacters(baseName);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

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
