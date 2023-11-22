import { CardsItem } from '../../components/CardsItem';
import { Character, useAppSelector } from '../../types/types';
import styles from './CardsList.module.css';

export default function CardsList() {
  const { countItems, cards } = useAppSelector((state) => state.storeReducer);
  return (
    <ul className={styles['cards__list']} title='character list'>
      {cards.slice(0, countItems).map((item: Character) => (
        <CardsItem character={item} key={item.id} />
      ))}
    </ul>
  );
}
