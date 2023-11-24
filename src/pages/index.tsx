/* eslint-disable react-refresh/only-export-components */
import { useMemo } from 'react';

import { API_URL } from '@/constants/constants';
import { wrapper } from '@/store';
import styles from '@/styles/Home.module.css';
import { ApiResponse } from '@/types/types';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { ButtonReload } from '../components/Buttons';
import { CardsList } from '../components/CardsList';
import { Pagination } from '../components/Pagination';
import { characterApi, fetchCharacters } from '../store/characterApi';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { name, page } = context.query;
    const data = await store.dispatch(
      fetchCharacters.initiate(
        name && page
          ? `${API_URL}?page=${page}&name=${name}`
          : page
            ? `${API_URL}?page=${page}`
            : API_URL,
      ),
    );
    await Promise.all(store.dispatch(characterApi.util.getRunningQueriesThunk()));
    return {
      props: {
        response: data.data,
        error: data.error,
      },
    };
  },
);

export default function Home(data: ApiResponse, error: boolean) {
  const apiData = data;
  const router = useRouter();
  console.log(router);
  const viewPage = useMemo(() => {
    if (error)
      return (
        <div>
          Sorry, Your character is not found. Please, <ButtonReload />
        </div>
      );
    return <CardsList cards={apiData.results} />;
  }, [apiData.results, error]);
  const curPage = router.query.page ? String(router.query.page) : '1';
  return (
    <div className='main-page' title='main page'>
      <div className={styles['main__flex']}>
        <Pagination
          currentPage={curPage}
          prevPage={apiData.info.prev}
          nextPage={apiData.info.next}
        />
      </div>
      <div className={styles['main__flex']}>{viewPage}</div>
    </div>
  );
}
