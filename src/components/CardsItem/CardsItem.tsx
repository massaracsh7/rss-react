import Link from 'next/link';

import { Character } from '../../types/types';
import styles from './CardsItem.module.css';

interface Props {
  character: Character;
}

export default function CardsItem({ character }: Props) {
  return (
    <li className={styles['cards__item']} data-testid={`detail-${character.id}`}>
      <Link
        href={{
          pathname: 'details/[id]',
          query: { id: character.id },
        }}
        data-testid='detail-link'
      >
        <div className={styles['cards__info']}>
          <h4 className={styles['cards__name']}>{character.name}</h4>
          <div>
            <img className={styles['cards__img']} src={character.image} />
          </div>
          <p className={styles['cards__status']}> {character.status}</p>
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
