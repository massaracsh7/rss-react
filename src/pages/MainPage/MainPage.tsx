import { Component } from 'react';

import CardsList from '../../components/CardsList/CardsList';
import { SearchInput } from '../../components/Search/SerachInput';
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
        <h1>Rick & Morty Characters</h1>
        <form>
          <SearchInput />
          <button type='submit'>🔍</button>
        </form>
        <CardsList charactArr={charactArr} />
      </div>
    );
  }
}
