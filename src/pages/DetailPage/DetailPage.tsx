import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailInfo } from '../../components/DetailInfo';
import { Loader } from '../../components/Loader';
import { Character, defaultCharacter } from '../../types/types';
import { getCharacter } from '../../utils/api';
import './style.css';

export default function DetailPage() {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const detailId = params.id ?? 0;
  const navigate = useNavigate();

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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        navigate('/', { replace: true });
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [navigate]);

  return (
    <div className='cards__detail' ref={ref}>
      {viewDetails}
    </div>
  );
}
