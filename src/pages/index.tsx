import { useMemo } from 'react';

import { API_URL } from '@/constants/constants';
import { wrapper } from '@/store';
import styles from '@/styles/Home.module.css';
import { DataSSP } from '@/types/types';
import { useRouter } from 'next/router';

import { ButtonReload } from '../components/Buttons';
import { CardsList } from '../components/CardsList';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { characterApi, fetchCharacters } from '../store/characterApi';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
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
      response: data,
    },
  };
});

export default function Home(data: DataSSP) {
  const apiData = data.response;
  const router = useRouter();
  const curPage = router.query.page ? String(router.query.page) : '1';
  const { isLoading, isError } = data.response;
  const viewPage = useMemo(() => {
    if (isLoading) return <Loader />;
    if (isError || apiData.data === undefined)
      return (
        <div>
          Sorry, Your character is not found. Please, <ButtonReload />
        </div>
      );
    return (
      <>
        <div className={styles['main__flex']} title='main page'>
          <Pagination
            currentPage={curPage}
            prevPage={apiData.data.info.prev}
            nextPage={apiData.data.info.next}
          />
        </div>
        <CardsList cards={apiData.data.results} />
      </>
    );
  }, [apiData.data, curPage, isError, isLoading]);

  return <>{viewPage}</>;
}
