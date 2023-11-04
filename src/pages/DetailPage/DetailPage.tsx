import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DetailInfo } from '../../components/DetailInfo';
import { Loader } from '../../components/Loader';
import { Character, defaultCharacter } from '../../types/types';
import { GetRef } from '../../utils/GetRef';
import { getCharacter } from '../../utils/api';
import './style.css';

export default function DetailPage() {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const detailId = params.id ?? 0;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getCharacter(+detailId);
        if (data) {
          setCharacter(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error('Failed to load data', error);
      }
    };
    getData();
  }, [detailId]);

  const viewDetails = useMemo(() => {
    if (loading) return <Loader />;
    return <DetailInfo character={character} />;
  }, [character, loading]);

  const ref = GetRef();

  return (
    <div className='cards__detail' ref={ref}>
      {viewDetails}
    </div>
  );
}
