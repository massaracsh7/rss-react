import { Component } from 'react';

import CardsList from '../../components/CardsList/CardsList';
import { SearchInput } from '../../components/Search/SerachInput';
import { CharacterArray } from '../../types/types';
import { getCharacters, searchCharacters } from '../../utils/api';

interface State {
  characters: CharacterArray;
  search: string;
}
export default class MainPage extends Component {
  state: State = {
    characters: [],
    search: localStorage.getItem('textQuery') ?? '',
  };

  async componentDidMount() {
    try {
      const data =
        this.state.search === ''
          ? await getCharacters()
          : await searchCharacters(this.state.search);
      if (data) {
        this.setState({ characters: [...data] });
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }

  handleSubmit = () => {
    localStorage.setItem('textQuery', this.state.search);
  };

  handleSearchInput = (searchText: string) => {
    this.setState({ search: searchText });
    localStorage.setItem('textQuery', this.state.search);
  };

  render() {
    const charactArr = this.state.characters;
    return (
      <div className='main-page'>
        <h1>Rick & Morty Characters</h1>
        <form onSubmit={this.handleSubmit}>
          <SearchInput search={this.state.search} setSearch={this.handleSearchInput} />
          <button type='submit'>🔍</button>
        </form>
        <CardsList charactArr={charactArr} />
      </div>
    );
  }
}
