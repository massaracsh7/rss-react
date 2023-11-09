import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import MainPage from '../pages/MainPage/MainPage';

describe('Main page', () => {
  test('renders MainPage', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    const mainPage = await screen.findByTitle('main page');
    expect(mainPage).toBeVisible();
  });

  test('input event', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    const searchInput = screen.getByTestId('search');
    expect(searchInput).toContainHTML('');
    fireEvent.input(searchInput, {
      target: { value: 'test123123' },
    });
    expect(searchInput).toContainHTML('test123123');
  });

  test('expects something to be set in localStorage', () => {
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
      expect(Storage.prototype.setItem).toHaveBeenCalledWith('textQuery', 'test');
    });
  });

  test('expects something to be get from localStorage', () => {
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
});
