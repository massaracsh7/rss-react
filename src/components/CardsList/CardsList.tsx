import { Component } from 'react';

import CardsItem from '../../components/CardsItem/CardsItem';

export default class CardsList extends Component {
  render() {
    return (
      <ul className='cards__list'>
        <CardsItem />
      </ul>
    );
  }
}
