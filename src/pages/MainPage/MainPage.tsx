import { Component } from 'react';

import { ButtonReload } from '../../components/Buttons';
import { CardsList } from '../../components/CardsList';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Search } from '../../components/Search';
import { StateMainPage } from '../../types/types';
import { getCharacters, searchCharacters } from '../../utils/api';

export default class MainPage extends Component {
  state: StateMainPage = {
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
          textError: 'Sorry, Your character is not found. Please, ',
        });
        localStorage.setItem('textQuery', '');
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
    const { loading, textError, characters } = this.state;
    return (
      <div className='main-page'>
        <Header />
        <Search
          handleSubmit={this.handleSubmit}
          search={this.state.search}
          setSearch={this.handleSearchInput}
        />
        {loading ? (
          <Loader />
        ) : textError !== '' ? (
          <div>
            {textError} <ButtonReload />
          </div>
        ) : (
          <CardsList charactArr={characters} />
        )}
      </div>
    );
  }
}
