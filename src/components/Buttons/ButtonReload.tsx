import { Component } from 'react';

export default class ButtonReload extends Component {
  render() {
    return (
      <>
        <button onClick={() => window.location.reload()}> Try again! </button>
      </>
    );
  }
}
