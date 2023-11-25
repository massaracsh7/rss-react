import styles from '@/styles/Detail.module.css';
import Link from 'next/link';

import { Character } from '../../types/types';

interface Props {
  character: Character;
}

export default function DetailInfo({ character }: Props) {
  return (
    <div className={styles['detail__info']}>
      <Link className={styles['detail__close']} href={`/`} data-testid='close'>
        X
      </Link>
      <h3 className={styles['detail__name']}>Details Info</h3>
      <h4 className={styles['detail__name']}>{character.name}</h4>
      <div>
        <img className={styles['detail__img']} src={character.image} />
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
