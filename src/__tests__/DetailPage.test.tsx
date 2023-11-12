import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import { CharacterMock } from '../mocks/CharacterMock';
import DetailPage from '../pages/DetailPage/DetailPage';

describe('Detail page', () => {
  test('renders DetailPage', async () => {
    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );
    const detailPage = await screen.findByTitle('detail page');
    waitFor(() => {
      expect(detailPage).toBeVisible();
    });
  });

  it('should display loading state', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );
    waitFor(() => {
      expect(getByText('Loading ...')).toBeInTheDocument();
    });
  });

  test('the component renders card with detail info', async () => {
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterMock;
    });

    jest.mock('../utils/api', () => ({
      getCharacter: mockGetContext,
    }));
    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );

    waitFor(() => {
      expect(screen.getByText('Details Info Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('the component renders card with detail info', async () => {
    const mockGetContext = jest.fn().mockImplementation(() => {
      CharacterMock;
    });

    jest.mock('../utils/api', () => ({
      getCharacter: mockGetContext,
    }));
    const { getByText } = render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );

    waitFor(() => {
      expect(getByText('Details Info Rick Sanchez')).toBeInTheDocument();
      expect(getByText('Loading ...')).toBeFalsy();
    });
  });

  test('if catch errors the component does not renders card ', async () => {
    jest.mock('../utils/api', () => ({
      getCharacter: [],
    }));
    console.error = jest.fn();
    render(
      <MemoryRouter>
        <DetailPage />
      </MemoryRouter>,
    );

    waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});
