import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../App';

test('demo', () => {
  expect(true).toBe(true);
});

describe('App', () => {
  test('error page', async () => {
    render(
      <MemoryRouter initialEntries={['/123445']}>
        <App />
      </MemoryRouter>,
    );
    waitFor(() => {
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
  });
});
