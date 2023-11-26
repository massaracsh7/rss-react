import '@testing-library/jest-dom';
import { Headers, Request, Response, fetch } from 'cross-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { CharacterAnswer } from '../src/mocks/CharacterListMock';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character/*', (_req, res, ctx) => {
    return res(ctx.json(CharacterAnswer));
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
