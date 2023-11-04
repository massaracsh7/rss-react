import { Link } from 'react-router-dom';

import { Character } from '../../types/types';

interface Props {
  character: Character;
}

export default function DetailInfo({ character }: Props) {
  return (
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
  );
}
