import { Link } from 'react-router-dom';

import { Character } from '../../types/types';
import './style.css';

interface Props {
  character: Character;
}

export default function CardsItem({ character }: Props) {
  return (
    <li className='cards__item' data-testid={`detail-${character.id}`}>
      <Link to={`details=/${character.id}`} data-testid='detail-link'>
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
      </Link>
    </li>
  );
}
