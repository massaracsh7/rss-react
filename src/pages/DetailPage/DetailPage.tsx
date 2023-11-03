import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { Character, defaultCharacter } from '../../types/types';
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

  return (
    <div className='cards__detail'>
      {loading ? (
        <Loader />
      ) : (
        <div className='detail__info'>
          <Link className='detail__close' to={`/`}>
            X
          </Link>
          <h4 className='detail__name'>{character.name}</h4>
          <div>
            <img className='detail__img' src={character.image} />
          </div>
          <p>
            <b>Status:</b>
            {character.status}
          </p>
          <p>
            <b>Gender:</b> {character.gender}
          </p>
          <p>
            <b>Species:</b> {character.species}
          </p>
          <p>
            <b>Loctaion:</b> {character.location.name}
          </p>
          <p>
            <b>Origin:</b> {character.origin.name}
          </p>
        </div>
      )}
    </div>
  );
}
