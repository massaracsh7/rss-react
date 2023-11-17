import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PerPage } from '../components/PerPage';
import { store } from '../store/index';

describe('PerPage', () => {
  test('should render options count items', () => {
    jest.mock('../types/types', () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PerPage />
        </MemoryRouter>
      </Provider>,
    );
    const pageItems = screen.getByTestId('per-page');
    expect(pageItems).toBeInTheDocument();
  });

  test('should change options count 20', () => {
    jest.mock('../types/types', () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PerPage />
        </MemoryRouter>
      </Provider>,
    );
    const choose = screen.getByText('20');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '20' });
    });
  });
  test('should change options count 15', () => {
    jest.mock('../types/types', () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PerPage />
        </MemoryRouter>
      </Provider>,
    );
    const choose = screen.getByText('15');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '15' });
    });
  });
  test('should change options count 10', () => {
    jest.mock('../types/types', () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PerPage />
        </MemoryRouter>
      </Provider>,
    );
    const choose = screen.getByText('10');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '10' });
    });
  });
  test('should change options count 5', () => {
    jest.mock('../types/types', () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PerPage />
        </MemoryRouter>
      </Provider>,
    );
    const choose = screen.getByText('5');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '5' });
    });
  });
});
