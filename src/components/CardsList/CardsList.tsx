import { CardsItem } from '../../components/CardsItem';
import { useAppSelector } from '../../types/types';
import './style.css';

export default function CardsList() {
  const { cards, countItems } = useAppSelector((state) => state.store);

  return (
    <ul className='cards__list' title='character list'>
      {cards.slice(0, countItems).map((item) => (
        <CardsItem character={item} key={item.id} />
      ))}
    </ul>
  );
}
