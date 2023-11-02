import { CardsItem } from '../../components/CardsItem';
import { CharacterArray } from '../../types/types';
import './style.css';

interface Props {
  charactArr: CharacterArray;
}
export default function CardsList({ charactArr }: Props) {
  const characts = charactArr !== false ? charactArr : [];
  return (
    <ul className='cards__list'>
      {characts.map((item) => (
        <CardsItem character={item} key={item.id} />
      ))}
    </ul>
  );
}
