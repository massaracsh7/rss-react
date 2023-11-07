import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App from '../App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(true).toBeTruthy();
});

test('Check the header text', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const headerText = screen.getByText(/Rick & Morty Characters/i);
  expect(headerText).toBeInTheDocument();
});

test('error page', () => {
  render(
    <MemoryRouter initialEntries={['/123445']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByTestId('error-page')).toBeInTheDocument();
});
