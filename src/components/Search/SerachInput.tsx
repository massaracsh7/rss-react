import { Component } from 'react';

export interface PropsSearch {
  setSearch: (searchStr: string) => void;
  search: string;
}
export class SearchInput extends Component<PropsSearch> {
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { setSearch } = this.props;
    setSearch((e.target as HTMLInputElement).value.toLowerCase().trim());
  };
  render() {
    return (
      <>
        <input autoFocus type='search' value={this.props.search} onChange={this.handleChange} />
      </>
    );
  }
}
