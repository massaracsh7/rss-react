import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import DetailPage from '../pages/DetailPage/DetailPage';

describe('Detail page', () => {
  test('renders DetailPage', async () => {
    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );
    const detailPage = await screen.findByTitle('detail page');
    waitFor(() => {
      expect(detailPage).toBeVisible();
    });
  });

  it('should display loading state', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );
    waitFor(() => {
      expect(getByText('Loading ...')).toBeInTheDocument();
    });
  });
});
