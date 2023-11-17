import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { API_URL } from '../constants/constants';
import { CharacterAnswer, CharacterAnswerEmpty } from '../mocks/CharacterListMock';
import MainPage from '../pages/MainPage/MainPage';
import { store } from '../store/index';

describe('Main page', () => {
  test('renders MainPage', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const mainPage = await screen.findByTitle('main page');
    waitFor(() => {
      expect(mainPage).toBeVisible();
    });
  });

  test('should display loading state', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    waitFor(() => {
      expect(getByText('Loading ...')).toBeInTheDocument();
    });
  });

  test('should display error message', async () => {
    jest.mock('../store/characterApi', () => ({
      useFetchById: mockGetContext,
    }));
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterAnswerEmpty;
    });
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    waitFor(() => {
      expect(getByText('Sorry, Your character is not found. Please')).toBeInTheDocument();
    });
  });

  test('expects something to be set in localStorage', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const searchInput = screen.getByTestId('search');
    const submit = screen.getByTestId('submit');
    fireEvent.input(searchInput, {
      target: { value: 'test' },
    });
    userEvent.click(submit);
    waitFor(() => {
      expect(Storage.prototype.setItem).toHaveBeenCalledWith('textQuery', 'test');
    });
  });

  test('expects something to be get from localStorage', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const searchInput = screen.getByTestId('search');
    const submit = screen.getByTestId('submit');
    fireEvent.input(searchInput, {
      target: { value: 'test' },
    });
    userEvent.click(submit);
    waitFor(() => {
      expect(Storage.prototype.getItem('textQuery')).toEqual('test');
    });
  });

  test('expects click next button  to next page', async () => {
    const nextUrl = CharacterAnswer.info.next;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const next = screen.getByTestId('next');
    const currentUrl = window.location.href;
    expect(screen.getByTestId<HTMLButtonElement>('prev').disabled).toBeTruthy();
    userEvent.click(next);
    waitFor(() => {
      expect(currentUrl).toEqual(nextUrl);
    });
  });

  test('expects click prev button  to prev page', async () => {
    const firstUrl = `${API_URL}?page = 1`;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const next = screen.getByTestId('next');
    const prev = screen.getByTestId('prev');
    const currentUrl = window.location.href;
    userEvent.click(next);
    userEvent.click(prev);
    waitFor(() => {
      expect(currentUrl).toEqual(firstUrl);
      expect(screen.getByTestId<HTMLButtonElement>('prev').disabled).toBeTruthy();
    });
  });

  test('if catch errors the component does not renders card ', async () => {
    jest.mock('../store/characterApi', () => ({
      useFetchCharacters: mockGetContext,
    }));
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterAnswerEmpty;
    });
    console.error = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
        ,
      </Provider>,
    );

    waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});
