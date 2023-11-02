import { Component } from 'react';

import './style.css';

export default class Loader extends Component {
  render() {
    return (
      <div className='spinner'>
        <p>Loading...</p>
        <div className='circle'></div>
      </div>
    );
  }
}
