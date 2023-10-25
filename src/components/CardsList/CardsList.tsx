import { Component } from 'react';

import CardsItem from '../../components/CardsItem/CardsItem';
import { CharacterArray } from '../../types/types';

interface Props {
  charactArr: CharacterArray;
}
export default class CardsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    console.log(this.props.charactArr);
    const arrayCharacters = this.props.charactArr;
    return (
      <ul className='cards__list'>
        {arrayCharacters.map((item) => (
          <CardsItem key={item.id} {...item} />
        ))}
      </ul>
    );
  }
}
