import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock data for the server response
import { CharacterAnswer } from './CharacterListMock';

// This can be replaced with a server url that's on staging to avoid mains server getting needless hits, if at all
export const BASE_MOCK_URL = 'https://rickandmortyapi.com/api/character';

export const server = setupServer(
  // Call for getting list of all characters
  rest.get(`${BASE_MOCK_URL}`, (req, res, ctx) => {
    return res(ctx.json(CharacterAnswer));
    console.log(req);
  }),
);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn',
  }),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
