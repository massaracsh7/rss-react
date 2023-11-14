import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { CardsList } from '../../components/CardsList';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { PerPage } from '../../components/PerPage';
import { Search } from '../../components/Search';
import { fetchGetCharacters } from '../../store/Slice';
import { useAppDispatch, useAppSelector } from '../../types/types';
import './style.css';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.store);

  useEffect(() => {
    dispatch(fetchGetCharacters());
  }, [dispatch]);

  const viewPage = useMemo(() => {
    if (isLoading) return <Loader />;
    return <CardsList />;
  }, [isLoading]);

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
