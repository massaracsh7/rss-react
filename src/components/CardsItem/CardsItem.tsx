import { Component } from 'react';

import { Character } from '../../types/types';
import './style.css';

export default class CardsItem extends Component<Character> {
  constructor(props: Character) {
    super(props);
  }
  render() {
    return (
      <li className='cards__item'>
        <div className='cards__info'>
          <h4 className='cards__name'>{this.props.name}</h4>
          <div>
            <img className='cards__img' src={this.props.image} />
          </div>
          <p className='cards__status'> {this.props.status}</p>
          <p>
            <b>Gender:</b> {this.props.gender}
          </p>
          <p>
            <b>Species:</b> {this.props.species}
          </p>
          <p>
            <b>Loctaion:</b> {this.props.location.name}
          </p>
          <p>
            <b>Origin:</b> {this.props.origin.name}
          </p>
        </div>
      </li>
    );
  }
}
