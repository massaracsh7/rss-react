import { Component } from 'react';

import CardsList from '../../components/CardsList/CardsList';
import { CharacterArray } from '../../types/types';
import { getCharacters } from '../../utils/api';

interface State {
  characters: CharacterArray;
}
export default class MainPage extends Component {
  state: State = {
    characters: [],
  };

  async componentDidMount() {
    try {
      const data = await getCharacters();
      if (data) {
        this.setState({ characters: [...data] });
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }
  render() {
    const charactArr = this.state.characters;
    return (
      <div className='main-page'>
        <h1>Header1</h1>
        <CardsList charactArr={charactArr} />
      </div>
    );
  }
}
