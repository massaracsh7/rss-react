import { useContext } from 'react';

import { CardsItem } from '../../components/CardsItem';
import { ItemsContext } from '../../contexts/ItemsContext';
import './style.css';

interface Props {
  countItems: string;
}
export default function CardsList({ countItems }: Props) {
  const itemsContext = useContext(ItemsContext);
  const message = `Sorry, Your character is not found.`;
  return (
    <ul className='cards__list' title='character list'>
      {itemsContext.itemsData === false
        ? message
        : itemsContext.itemsData
            .slice(0, +countItems)
            .map((item) => <CardsItem character={item} key={item.id} />)}
    </ul>
  );
}
