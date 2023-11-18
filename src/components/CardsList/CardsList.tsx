import { CardsItem } from '../../components/CardsItem';
import { Character, useAppSelector } from '../../types/types';
import './style.css';

export default function CardsList() {
  const { countItems, cards } = useAppSelector((state) => state.storeReducer);
  return (
    <ul className='cards__list' title='character list'>
      {cards.slice(0, countItems).map((item: Character) => (
        <CardsItem character={item} key={item.id} />
      ))}
    </ul>
  );
}
