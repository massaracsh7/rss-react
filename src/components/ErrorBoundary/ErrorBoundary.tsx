import { Component, ErrorInfo } from 'react';

import ButtonReload from '../Buttons/ButtonReload';
import './style.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
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

export default ErrorBoundary;
