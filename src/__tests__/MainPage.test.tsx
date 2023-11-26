import { Provider } from 'react-redux';

import { API_URL } from '@/constants/constants';
import { CharacterListMockPage, CharacterListMockPageError } from '@/mocks/CharacterListMock';
import { store } from '@/store';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import Home from '../pages/index';

describe('Main page', () => {
  test('renders MainPage', async () => {
    render(
      <Provider store={store}>
        <Home {...CharacterListMockPage} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    const mainPage = await screen.findByTitle('main page');
    waitFor(() => {
      expect(mainPage).toBeVisible();
    });
  });

  test('should display error message', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home {...CharacterListMockPageError} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    waitFor(() => {
      expect(getByText('Sorry, Your character is not found.')).toBeInTheDocument();
    });
  });

  test('if catch errors the component does not renders card ', async () => {
    render(
      <Provider store={store}>
        <Home {...CharacterListMockPageError} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    console.error = jest.fn();
    waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
  test('expects click next button  to next page', async () => {
    const nextUrl = CharacterListMockPage.response.data.info.next;
    render(
      <Provider store={store}>
        <Home {...CharacterListMockPage} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    const next = screen.getByTestId('next');
    expect(screen.getByTestId<HTMLButtonElement>('prev').disabled).toBeTruthy();
    userEvent.click(next);
    waitFor(() => {
      expect(mockRouter.asPath).toEqual(nextUrl);
    });
  });

  test('expects click prev button  to prev page', async () => {
    const firstUrl = `${API_URL}?page = 1`;
    render(
      <Provider store={store}>
        <Home {...CharacterListMockPage} />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    );
    const next = screen.getByTestId('next');
    const prev = screen.getByTestId('prev');
    userEvent.click(next);
    userEvent.click(prev);
    waitFor(() => {
      expect(mockRouter.asPath).toEqual(firstUrl);
      expect(screen.getByTestId<HTMLButtonElement>('prev').disabled).toBeTruthy();
    });
  });
});
