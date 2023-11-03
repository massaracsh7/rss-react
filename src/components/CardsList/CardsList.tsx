import { CardsItem } from '../../components/CardsItem';
import { CharacterArray } from '../../types/types';
import './style.css';

interface Props {
  charactArr: CharacterArray;
  countItems: string;
}
export default function CardsList({ charactArr, countItems }: Props) {
  const characts = charactArr !== false ? charactArr : [];
  return (
    <ul className='cards__list'>
      {characts.slice(0, +countItems).map((item) => (
        <CardsItem character={item} key={item.id} />
      ))}
    </ul>
  );
}
