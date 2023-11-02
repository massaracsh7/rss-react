import { Component, ErrorInfo } from 'react';

import { ButtonReload } from '../Buttons';
import './style.css';

interface ErrorProps {
  children: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className='error-page'>
            <h1 className='error-page__title'>Something went wrong.</h1>
            <ButtonReload />
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
