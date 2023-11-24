import { ReactElement, ReactNode, useMemo } from 'react';

import DetailLayout from '@/components/Layout/DetailLayout';
import { wrapper } from '@/store';
import { useRouter } from 'next/router';

import { DetailInfo } from '../../components/DetailInfo';
import { Loader } from '../../components/Loader';
import { fetchCharacterById, getRunningQueriesThunk } from '../../store/characterApi';
import { Character, defaultCharacter } from '../../types/types';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.query;
  const data = await store.dispatch(fetchCharacterById.initiate(id ? +id : 1));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {
      response: data,
    },
  };
});

export default function DetailPage(data: {
  response: { isLoading: boolean; error: boolean; data: Character };
}) {
  const apiData = data.response;
  const { isLoading, error } = data.response;

  const viewDetails = useMemo(() => {
    if (isLoading) return <Loader />;
    if (error) return 'Sorry, error reload data';
    return <DetailInfo character={apiData.data ?? defaultCharacter} />;
  }, [apiData.data, error, isLoading]);

  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className='cards__bg' onClick={goBack} title='detail page'></div>
      <div className='cards__detail'>{viewDetails}</div>
    </>
  );
}

DetailPage.getLayout = (page: ReactElement): ReactNode => <DetailLayout>{page}</DetailLayout>;
