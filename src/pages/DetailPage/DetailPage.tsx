import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Character } from '../../types/types';
import { getCharacter } from '../../utils/api';
import './style.css';

export default function DetailPage() {
  const temp: Character = {
    id: 0,
    name: '',
    status: 'Alive',
    species: '',
    type: '',
    gender: 'unknown',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [''],
    url: '',
    created: '',
  };
  const [character, setCharacter] = useState<Character>(temp);

  const params = useParams();
  const prodId = params.id ?? 0;
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCharacter(+prodId);
        if (data) {
          console.log(data);
          setCharacter(data);
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    getData();
  }, [prodId]);

  return (
    <div className='cards__detail'>
      <Link to={`/`}>Close</Link>
      <div className='cards__info'>
        <h4 className='cards__name'>{character.name}</h4>
        <div>
          <img className='cards__img' src={character.image} />
        </div>
        <p className='cards__status'> {character.status}</p>
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
    </div>
  );
}
