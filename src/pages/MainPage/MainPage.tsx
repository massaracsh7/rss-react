import { Component } from 'react';

import CardsList from '../../components/CardsList/CardsList';

export default class MainPage extends Component {
  render() {
    return (
      <div className='main-page'>
        <h1>Header1</h1>
        <CardsList />
      </div>
    );
  }
}
