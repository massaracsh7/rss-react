import { CardsItem } from '../../components/CardsItem';
import { Character, useAppSelector } from '../../types/types';
import styles from './CardsList.module.css';

interface Props {
  cards: Character[];
}

export default function CardsList({ cards }: Props) {
  const { countItems } = useAppSelector((state) => state.storeReducer);
  return (
    <ul className={styles['cards__list']} title='character list'>
      {cards.slice(0, countItems).map((item: Character) => (
        <CardsItem character={item} key={item.id} />
      ))}
    </ul>
  );
}
