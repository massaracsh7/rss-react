import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../jestSetup';
import { CharacterAnswerEmpty } from '../mocks/CharacterListMock';
import { CharacterMock } from '../mocks/CharacterMock';
import { renderWithProviders } from '../mocks/testUtils';
import DetailPage from '../pages/DetailPage/DetailPage';

describe('Detail page', () => {
  test('renders DetailPage', async () => {
    server.use(
      rest.get('https://rickandmortyapi.com/api/character/*', (_req, res, ctx) => {
        return res(ctx.json(CharacterMock));
      }),
    );

    renderWithProviders(<DetailPage />);
    const detailPage = await screen.findByTitle('detail page');
    waitFor(() => {
      expect(detailPage).toBeVisible();
    });
  });

  it('should display loading state', async () => {
    const { getByText } = renderWithProviders(<DetailPage />);
    waitFor(() => {
      expect(getByText('Loading ...')).toBeInTheDocument();
    });
  });

  test('the component renders card with detail info', async () => {
    server.use(
      rest.get('https://rickandmortyapi.com/api/character/*', (_req, res, ctx) => {
        return res(ctx.json(CharacterMock));
      }),
    );

    renderWithProviders(<DetailPage />);
    waitFor(() => {
      expect(screen.getByText('Details Info Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('the component renders card with detail info', async () => {
    server.use(
      rest.get('https://rickandmortyapi.com/api/character/*', (_req, res, ctx) => {
        return res(ctx.json(CharacterMock));
      }),
    );
    const { getByText } = renderWithProviders(<DetailPage />);
    waitFor(() => {
      expect(getByText('Details Info Rick Sanchez')).toBeInTheDocument();
      expect(getByText('Loading ...')).toBeFalsy();
    });
  });

  test('if catch errors the component does not renders card ', async () => {
    server.use(
      rest.get('https://rickandmortyapi.com/api/character/*', (_req, res, ctx) => {
        return res(ctx.json(CharacterAnswerEmpty.results));
      }),
    );
    console.error = jest.fn();
    renderWithProviders(<DetailPage />);
    waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});
