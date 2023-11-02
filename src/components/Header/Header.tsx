import { Component } from 'react';

import { ButtonError } from '../../components/Buttons';
import './style.css';

export default class Header extends Component {
  render() {
    return (
      <>
        <header className='header'>
          <ButtonError />
          <h1 className='header__title'>Rick & Morty Characters</h1>
        </header>
      </>
    );
  }
}
