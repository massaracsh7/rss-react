import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import { CardsItem } from '../components/CardsItem';
import { CharacterMock } from '../mocks/CharacterMock';

describe('ProductCard', () => {
  test('renders properties correctly', () => {
    render(<CardsItem character={CharacterMock} />, { wrapper: MemoryRouterProvider });
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('renders properties correctly', () => {
    render(<CardsItem character={CharacterMock} />, { wrapper: MemoryRouterProvider });
    const open = screen.getByTestId('detail-link');
    userEvent.click(open);
    waitFor(() => {
      const path = window.location.pathname;
      expect(screen.getByText('Details Info')).toBeInTheDocument();
      expect(path).toBe(CharacterMock.id);
    });
  });
  test('clicking triggers an additional API call to fetch detailed information', async () => {
    render(<CardsItem character={CharacterMock} />, { wrapper: MemoryRouterProvider });
    const open = screen.getByTestId('detail-link');
    userEvent.click(open);
    waitFor(() => {
      expect(mockRouter.asPath).toEqual(CharacterMock.id);
    });
  });
});
