import { Component } from 'react';

export default class CardsItem extends Component {
  render() {
    return (
      <li className='cards__item'>
        <div className='cards__info'>
          <h4>Name: </h4>
          <div> IMG </div>
        </div>
      </li>
    );
  }
}
