import { Component } from 'react';

interface Props {
  createError: () => void;
}

export default class Header extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <header>
          <button onClick={this.props.createError}>Create Error</button>
          <h1>Rick & Morty Characters</h1>
        </header>
      </>
    );
  }
}
