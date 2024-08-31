import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { Search } from '../components/Search';
import { renderWithProviders } from '../mocks/testUtils';

describe('Search components', () => {
  test('search input event', async () => {
    renderWithProviders(<Search />);
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
