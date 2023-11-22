import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';

import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Layout from '../components/Layout/Layout';
import { store } from '../store/index';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
}
