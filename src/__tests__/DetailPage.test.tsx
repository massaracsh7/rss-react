import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { CharacterMock } from '../mocks/CharacterMock';
import DetailPage from '../pages/DetailPage/DetailPage';
import { store } from '../store/index';

describe('Detail page', () => {
  test('renders DetailPage', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const detailPage = await screen.findByTitle('detail page');
    waitFor(() => {
      expect(detailPage).toBeVisible();
    });
  });

  it('should display loading state', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    waitFor(() => {
      expect(getByText('Loading ...')).toBeInTheDocument();
    });
  });

  test('the component renders card with detail info', async () => {
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterMock;
    });

    jest.mock('../store/characterApi', () => ({
      useFetchById: mockGetContext,
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
        ,
      </Provider>,
    );

    waitFor(() => {
      expect(screen.getByText('Details Info Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('the component renders card with detail info', async () => {
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterMock;
    });

    jest.mock('../store/characterApi', () => ({
      useFetchById: mockGetContext,
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
        ,
      </Provider>,
    );

    waitFor(() => {
      expect(getByText('Details Info Rick Sanchez')).toBeInTheDocument();
      expect(getByText('Loading ...')).toBeFalsy();
    });
  });

  test('if catch errors the component does not renders card ', async () => {
    jest.mock('../store/characterApi', () => ({
      useFetchById: [],
    }));
    console.error = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
        ,
      </Provider>,
    );

    waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});
