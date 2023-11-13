import { useContext } from 'react';

import { CardsItem } from '../../components/CardsItem';
import { ItemsContext } from '../../contexts/ItemsContext';
import './style.css';

interface Props {
  countItems: string;
}
export default function CardsList({ countItems }: Props) {
  const itemsContext = useContext(ItemsContext);
  const characts = itemsContext.itemsData !== false ? itemsContext.itemsData : [];
  return (
    <ul className='cards__list' title='character list'>
      {characts.length === 0
        ? `Sorry, Your character is not found.`
        : characts
            .slice(0, +countItems)
            .map((item) => <CardsItem character={item} key={item.id} />)}
    </ul>
  );
}
