import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';

import { CardsList } from '../components/CardsList';
import { CharacterAnswer, CharacterAnswerEmpty } from '../mocks/CharacterListMock';
import { renderWithProviders } from '../mocks/testUtils';

describe('CardList', () => {
  it('renders properties correctly', async () => {
    jest.mock('../types/types', () => ({
      cards: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
      countItems: jest.fn().mockImplementation(() => {
        5;
      }),
    }));
    renderWithProviders(<CardsList />);
    const charList = await screen.findByTitle('character list');
    expect(charList).toBeVisible();
  });

  test('an appropriate message should be displayed if no cards are present', async () => {
    jest.mock('../types/types', () => ({
      cards: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
      countItems: jest.fn().mockImplementation(() => {
        0;
      }),
    }));
    renderWithProviders(<CardsList />);
    waitFor(() => {
      const error = screen.findByText('Sorry, Your character is not found');
      expect(error).toBeVisible();
    });
  });

  test('the component renders the specified number of cards', async () => {
    jest.mock('../types/types', () => ({
      cards: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
      countItems: jest.fn().mockImplementation(() => {
        5;
      }),
    }));
    renderWithProviders(<CardsList />);
    const charList = await screen.findByTitle('character list');
    waitFor(() => {
      expect(charList.childElementCount).toBe(5);
    });
  });

  test('the component renders the specified number of cards', async () => {
    jest.mock('../types/types', () => ({
      cards: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
      countItems: jest.fn().mockImplementation(() => {
        5;
      }),
    }));
    renderWithProviders(<CardsList />);
    waitFor(() => {
      const charCards = screen.getAllByTestId('detail-card');
      expect(charCards.length).toBe(5);
    });
  });

  test('the component renders with mocks values', async () => {
    jest.mock('../types/types', () => ({
      cards: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
      countItems: jest.fn().mockImplementation(() => {
        5;
      }),
    }));
    renderWithProviders(<CardsList />);
    const charNames = CharacterAnswer.results.slice(0, 5).map((item) => item.name);
    waitFor(() => {
      const charList = screen.findByTitle('character list');
      expect(charList).toHaveTextContent(charNames[0]);
      expect(charList).toHaveTextContent(charNames[4]);
    });
  });

  test('an appropriate message should be displayed if no cards are present', async () => {
    jest.mock('../types/types', () => ({
      cards: jest.fn().mockImplementation(() => {
        CharacterAnswerEmpty;
      }),
      countItems: jest.fn().mockImplementation(() => {
        5;
      }),
    }));
    renderWithProviders(<CardsList />);
    waitFor(() => {
      const error = screen.findByText('Sorry, Your character is not found');
      expect(error).toBeVisible();
    });
  });

  test('cards items array should be empty, if items context is empty', async () => {
    jest.mock('../types/types', () => ({
      cards: jest.fn().mockImplementation(() => {
        CharacterAnswerEmpty;
      }),
      countItems: jest.fn().mockImplementation(() => {
        5;
      }),
    }));
    renderWithProviders(<CardsList />);
    waitFor(() => {
      const charCards = screen.getAllByRole('li');
      expect(charCards.length).toBe(0);
    });
  });
});
