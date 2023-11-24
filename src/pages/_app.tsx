import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Layout from '@/components/Layout/Layout';
import { store } from '@/store';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Layout>{layout}</Layout>
      </Provider>
    </ErrorBoundary>
  );
}
