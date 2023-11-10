import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CharacterAnswer } from '../mocks/CharacterListMock';
import MainPage from '../pages/MainPage/MainPage';

describe('Main page', () => {
  test('renders MainPage', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    const mainPage = await screen.findByTitle('main page');
    waitFor(() => {
      expect(mainPage).toBeVisible();
    });
  });

  test('should display loading state', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    waitFor(() => {
      expect(getByText('Loading ...')).toBeInTheDocument();
    });
  });

  test('expects something to be set in localStorage', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    const searchInput = screen.getByTestId('search');
    fireEvent.input(searchInput, {
      target: { value: 'test' },
    });
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
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    const searchInput = screen.getByTestId('search');
    fireEvent.input(searchInput, {
      target: { value: 'test' },
    });
    waitFor(() => {
      expect(Storage.prototype.getItem('textQuery')).toEqual('test');
    });
  });

  test('expects click next button  to next page', async () => {
    const nextUrl = CharacterAnswer.info.next;
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    const next = screen.getByTestId('next');
    const currentUrl = window.location.href;
    userEvent.click(next);
    waitFor(() => {
      expect(currentUrl).toEqual(nextUrl);
    });
  });
});
