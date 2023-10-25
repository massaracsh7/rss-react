import { Component } from 'react';

import { Character } from '../../types/types';

export default class CardsItem extends Component<Character> {
  constructor(props: Character) {
    super(props);
  }
  render() {
    return (
      <li className='cards__item'>
        <div className='cards__info'>
          <h4>Name: {this.props.name}</h4>
          <div>
            {' '}
            <img src={this.props.image} />{' '}
          </div>
          <p>Status: {this.props.status}</p>
          <p>Gender: {this.props.gender}</p>
          <p>Species: {this.props.species}</p>
          <p>Loctaion: {this.props.location.name}</p>
          <p>Origin: {this.props.origin.name}</p>
        </div>
      </li>
    );
  }
}
