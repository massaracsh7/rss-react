import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { CardsList } from '../components/CardsList';

describe('CardList', () => {
  it('renders properties correctly', async () => {
    render(
      <MemoryRouter>
        <CardsList countItems={'20'} />
      </MemoryRouter>,
    );

    const charList = await screen.findByTitle('character list');
    expect(charList).toBeVisible();
  });
});
