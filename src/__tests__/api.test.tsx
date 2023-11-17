import { waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../jestSetup';
import { CharacterAnswerEmpty } from '../mocks/CharacterListMock';
import { renderWithProviders } from '../mocks/testUtils';
import MainPage from '../pages/MainPage/MainPage';

describe('Api response', function () {
  test('should display API answer ', async () => {
    const { getByText, queryByText } = renderWithProviders(<MainPage />);

    expect(queryByText(/loading.../i)).toBeInTheDocument();
    waitFor(() => {
      expect(getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });
  test('should display an error when the request fail', async () => {
    server.use(
      rest.get('https://rickandmortyapi.com/api/character/*', (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json(CharacterAnswerEmpty));
      }),
    );

    const { getByText, queryByText } = renderWithProviders(<MainPage />);

    expect(queryByText(/loading.../i)).toBeInTheDocument();
    waitFor(() => {
      expect(getByText('Sorry, Your character is not found. Please')).toBeInTheDocument();
    });
  });
});
