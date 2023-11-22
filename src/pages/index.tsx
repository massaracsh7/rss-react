import { useEffect, useMemo } from 'react';

import styles from '@/styles/Home.module.css';

import { ButtonReload } from '../components/Buttons';
import { CardsList } from '../components/CardsList';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { PerPage } from '../components/PerPage';
import { Search } from '../components/Search';
import { setLoading } from '../store/Slice';
import { useFetchCharacters } from '../store/characterApi';
import { useAppDispatch, useAppSelector } from '../types/types';

export default function Home() {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <div className='main-page' title='main page'>
      <Search />
      <div className={styles['main__flex']}>
        <Pagination />
        <PerPage />
      </div>
      <div className={styles['main__flex']}>{viewPage}</div>
    </div>
  );
}
