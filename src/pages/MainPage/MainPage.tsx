import { Component } from 'react';

import CardsList from '../../components/CardsList/CardsList';
import Loader from '../../components/Loader/Loader';
import { SearchInput } from '../../components/Search/SerachInput';
import { CharacterArray } from '../../types/types';
import { getCharacters, searchCharacters } from '../../utils/api';

interface State {
  characters: CharacterArray;
  search: string;
  loading: boolean;
  textError: string;
}
export default class MainPage extends Component {
  state: State = {
    characters: [],
    search: localStorage.getItem('textQuery') ?? '',
    loading: false,
    textError: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const data =
        this.state.search === ''
          ? await getCharacters()
          : await searchCharacters(this.state.search);
      if (data) {
        this.setState({ characters: [...data], loading: false });
      } else {
        this.setState({
          loading: false,
          textError: 'Sorry, Your character is not found. Try again, please.',
        });
        localStorage.setItem('textQuery', '');
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  }

  createError = () => {
    this.setState({ characters: false });
  };

  handleSubmit = () => {
    localStorage.setItem('textQuery', this.state.search);
  };

  handleSearchInput = (searchText: string) => {
    this.setState({ search: searchText });
    localStorage.setItem('textQuery', this.state.search);
  };

  render() {
    const { loading, textError, characters } = this.state;
    return (
      <div className='main-page'>
        <button onClick={this.createError}>Create Error</button>
        <h1>Rick & Morty Characters</h1>
        <form onSubmit={this.handleSubmit}>
          <SearchInput search={this.state.search} setSearch={this.handleSearchInput} />
          <button type='submit'>🔍</button>
        </form>
        {loading ? (
          <Loader />
        ) : textError !== '' ? (
          <div>{textError}</div>
        ) : (
          <CardsList charactArr={characters} />
        )}
      </div>
    );
  }
}
