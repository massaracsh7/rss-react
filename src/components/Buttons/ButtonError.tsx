import { Component } from 'react';

import './style.css';

interface State {
  error: boolean;
}

export default class ButtonError extends Component {
  state: State = { error: false };
  createError = () => {
    this.setState({ error: true });
  };

  componentDidUpdate() {
    console.log(this.state.error);
    if (this.state.error) {
      throw new Error('Error was created');
    }
  }

  render() {
    return (
      <button className='button-error' onClick={this.createError}>
        Create Error
      </button>
    );
  }
}
