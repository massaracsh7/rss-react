import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Search } from '../components/Search';
import { store } from '../store/index';

describe('Search components', () => {
  test('search input event', async () => {
    jest.mock('../types/types', () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const searchInput = screen.getByTestId('search');
    waitFor(() => {
      expect(searchInput).toContainHTML('');
      fireEvent.input(searchInput, {
        target: { value: 'test' },
      });
      expect(searchInput).toContainHTML('test');
    });
  });
});
