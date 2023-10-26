import { Component } from 'react';

import { SearchInput } from './SerachInput';

export default class Search extends Component {
  render() {
    return (
      <form>
        <SearchInput />
        <button type='submit'>🔍</button>
      </form>
    );
  }
}
