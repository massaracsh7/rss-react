import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../App';

test('demo', () => {
  expect(true).toBe(true);
});

describe('Main page', () => {
  test('Renders the main page', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  test('Check the header text', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const headerText = screen.getByText('Rick & Morty Characters');
    waitFor(() => {
      expect(headerText).toBeInTheDocument();
    });
  });

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
