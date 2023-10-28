import { Component } from 'react';

import './style.css';

interface Props {
  createError: () => void;
}

export default class Header extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <header className='header'>
          <button className='button-error' onClick={this.props.createError}>
            Create Error
          </button>
          <h1 className='header__title'>Rick & Morty Characters</h1>
        </header>
      </>
    );
  }
}
