import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Search } from '../components/Search';

describe('Search components', () => {
  test('search input event', () => {
    render(
      <MemoryRouter>
        <Search search='' setSearch={jest.fn()} handleSubmit={jest.fn()} />
      </MemoryRouter>,
    );
    const searchInput = screen.getByTestId('search');
    expect(searchInput).toContainHTML('');
    fireEvent.input(searchInput, {
      target: { value: 'test' },
    });
    expect(searchInput).toContainHTML('test');
  });
});
