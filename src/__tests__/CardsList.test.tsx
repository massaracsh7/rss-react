import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { CardsList } from '../components/CardsList';
import { CharacterAnswer, CharacterAnswerEmpty } from '../mocks/CharacterListMock';

describe('CardList', () => {
  it('renders properties correctly', async () => {
    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
    }));
    render(
      <MemoryRouter>
        <CardsList countItems={'20'} />
      </MemoryRouter>,
    );

    const charList = await screen.findByTitle('character list');
    expect(charList).toBeVisible();
  });

  test('an appropriate message should be displayed if no cards are present', async () => {
    const nums = '0';
    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
    }));
    render(
      <MemoryRouter>
        <CardsList countItems={nums} />
      </MemoryRouter>,
    );
    waitFor(() => {
      const error = screen.findByText('Sorry, Your character is not found');
      expect(error).toBeVisible();
    });
  });

  test('the component renders the specified number of cards', async () => {
    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
    }));
    const nums = '5';
    render(
      <MemoryRouter>
        <CardsList countItems={nums} />
      </MemoryRouter>,
    );
    const charList = await screen.findByTitle('character list');
    waitFor(() => {
      expect(charList.childElementCount).toBe(+nums);
    });
  });

  test('the component renders the specified number of cards', async () => {
    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
    }));
    const nums = '5';
    render(
      <MemoryRouter>
        <CardsList countItems={nums} />
      </MemoryRouter>,
    );
    waitFor(() => {
      const charCards = screen.getAllByTestId('detail-card');
      expect(charCards.length).toBe(+nums);
    });
  });

  test('the component renders with mocks values', async () => {
    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: jest.fn().mockImplementation(() => {
        CharacterAnswer.results;
      }),
    }));
    const nums = '5';
    render(
      <MemoryRouter>
        <CardsList countItems={nums} />
      </MemoryRouter>,
    );
    const charNames = CharacterAnswer.results.slice(0, +nums).map((item) => item.name);
    waitFor(() => {
      const charList = screen.findByTitle('character list');
      expect(charList).toHaveTextContent(charNames[0]);
      expect(charList).toHaveTextContent(charNames[+nums - 1]);
    });
  });

  test('an appropriate message should be displayed if no cards are present', async () => {
    const nums = '5';
    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: mockGetContext,
    }));
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterAnswerEmpty;
    });
    render(
      <MemoryRouter>
        <CardsList countItems={nums} />
      </MemoryRouter>,
    );
    waitFor(() => {
      const error = screen.findByText('Sorry, Your character is not found');
      expect(error).toBeVisible();
    });
  });

  test('cards items array should be empty, if items context is empty', async () => {
    const nums = '5';
    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: mockGetContext,
    }));
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterAnswerEmpty.results;
    });
    render(
      <MemoryRouter>
        <CardsList countItems={nums} />
      </MemoryRouter>,
    );
    waitFor(() => {
      const charCards = screen.getAllByRole('li');
      expect(charCards.length).toBe(0);
    });
  });
});
