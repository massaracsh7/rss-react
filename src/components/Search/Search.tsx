import { Component } from 'react';

interface PropsSearch {
  setSearch: (searchStr: string) => void;
  search: string;
  handleSubmit: () => void;
}
export default class SearchInput extends Component<PropsSearch> {
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { setSearch } = this.props;
    setSearch((e.target as HTMLInputElement).value.toLowerCase().trim());
  };

  render() {
    return (
      <>
        <form onSubmit={this.props.handleSubmit}>
          <input autoFocus type='search' value={this.props.search} onChange={this.handleChange} />
          <button type='submit'>🔍</button>
        </form>
      </>
    );
  }
}
