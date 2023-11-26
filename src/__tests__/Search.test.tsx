import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import { Search } from '../components/Search';

describe('Search components', () => {
  test('search input event', async () => {
    render(<Search />, { wrapper: MemoryRouterProvider });
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
