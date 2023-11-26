import { Provider } from 'react-redux';

import Layout from '@/components/Layout/Layout';
import { store } from '@/store';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import DetailLayout from '../components/Layout/DetailLayout';

describe('Layout', () => {
  test('renders Layout and show props text', async () => {
    render(
      <Provider store={store}>
        <Layout {...(<h2>Test Layout</h2>)} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    waitFor(() => {
      const header = screen.getByText('Test Layout');
      expect(header).toBeInTheDocument();
    });
  });
  test('Should be perpage in Layout', async () => {
    render(
      <Provider store={store}>
        <Layout {...(<h2>Test Layout</h2>)} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    waitFor(() => {
      const pageItems = screen.getByTestId('per-page');
      expect(pageItems).toBeInTheDocument();
    });
  });
  test('Should be perpage in Layout', async () => {
    render(
      <Provider store={store}>
        <Layout {...(<h2>Test Layout</h2>)} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    waitFor(() => {
      const searchInput = screen.getByTestId('search');
      expect(searchInput).toBeInTheDocument();
    });
  });
  test('renders DetailLayout and show props text', async () => {
    render(
      <Provider store={store}>
        <DetailLayout {...(<h1>Test Layout</h1>)} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    waitFor(() => {
      const header = screen.getByText('Test Layout');
      expect(header).toBeInTheDocument();
    });
  });
  test('Should be pagination in DetailLayout', async () => {
    render(
      <Provider store={store}>
        <DetailLayout {...(<h1>Test Layout</h1>)} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    waitFor(() => {
      const btn1 = screen.getByText('Prev');
      expect(btn1).toBeInTheDocument();
      const btn2 = screen.getByText('Next');
      expect(btn2).toBeInTheDocument();
    });
  });
  test('Should be search input in DetailLayout', async () => {
    render(
      <Provider store={store}>
        <DetailLayout {...(<h1>Test Layout</h1>)} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    waitFor(() => {
      const searchInput = screen.getByTestId('search');
      expect(searchInput).toBeInTheDocument();
    });
  });
});
