import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailInfo } from '../../components/DetailInfo';
import { Loader } from '../../components/Loader';
import { useFetchById } from '../../store/characterApi';
import { defaultCharacter } from '../../types/types';
import './style.css';

export default function DetailPage() {
  const params = useParams();
  const detailId = params.id ?? 0;
  const navigation = useNavigate();

  const { isLoading, data } = useFetchById(+detailId);

  const viewDetails = useMemo(() => {
    if (isLoading) return <Loader />;
    return <DetailInfo character={data ?? defaultCharacter} />;
  }, [data, isLoading]);

  const goBack = () => {
    navigation('/', { replace: true });
  };

  return (
    <>
      <div className='cards__bg' onClick={goBack} title='detail page'></div>
      <div className='cards__detail'>{viewDetails}</div>
    </>
  );
}
