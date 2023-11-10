import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { CardsList } from '../components/CardsList';
import { CharacterAnswer, CharacterAnswerEmpty } from '../mocks/CharacterListMock';

describe('CardList', () => {
  beforeEach(() => {
    jest.mock('../components/CardsItem');
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterAnswer.results;
    });

    jest.mock('../contexts/ItemsContext', () => ({
      ItemsContext: mockGetContext,
    }));
  });
  it('renders properties correctly', async () => {
    render(
      <MemoryRouter>
        <CardsList countItems={'20'} />
      </MemoryRouter>,
    );

    const charList = await screen.findByTitle('character list');
    expect(charList).toBeVisible();
  });

  test('the component renders the specified number of cards', async () => {
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
      const error = screen.findByText('Sorry, Your character is not found');
      expect(error).toBeVisible();
    });
  });
});
