import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CardsItem } from '../components/CardsItem';
import { CharacterMock } from '../mocks/CharacterMock';
import { useFetchById } from '../store/characterApi';

describe('ProductCard', () => {
  test('renders properties correctly', () => {
    render(
      <MemoryRouter>
        <CardsItem character={CharacterMock} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('renders properties correctly', () => {
    render(
      <MemoryRouter>
        <CardsItem character={CharacterMock} />
      </MemoryRouter>,
    );
    const open = screen.getByTestId('detail-link');
    userEvent.click(open);
    waitFor(() => {
      const path = window.location.pathname;
      expect(screen.getByText('Details Info')).toBeInTheDocument();
      expect(path).toBe(CharacterMock.id);
    });
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    jest.mock('../store/characterApi', () => ({
      useFetchById: jest.fn(),
    }));
    render(
      <MemoryRouter>
        <CardsItem character={CharacterMock} />
      </MemoryRouter>,
    );
    const open = screen.getByTestId('detail-link');
    userEvent.click(open);
    waitFor(() => {
      expect(useFetchById).toHaveBeenCalled();
    });
  });
});
