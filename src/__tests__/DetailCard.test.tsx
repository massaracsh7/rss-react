import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DetailInfo } from '../components/DetailInfo';
import { CharacterMock } from '../mocks/CharacterMock';

describe('DetailCard', () => {
  it('renders properties correctly', () => {
    render(
      <BrowserRouter>
        <DetailInfo character={CharacterMock} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('DetailPage is closed correctly', () => {
    render(
      <BrowserRouter>
        <DetailInfo character={CharacterMock} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Details Info')).toBeInTheDocument();
    const close = screen.getByTestId('close');
    userEvent.click(close);
    waitFor(() => {
      expect(screen.getByText('Details Info')).toEqual(false);
    });
  });
});
