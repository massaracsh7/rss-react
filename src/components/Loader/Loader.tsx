import { Component } from 'react';

import './style.css';

export default class Loader extends Component {
  render() {
    return (
      <div className='spinner'>
        <div className='react'>⌛</div>
      </div>
    );
  }
}
