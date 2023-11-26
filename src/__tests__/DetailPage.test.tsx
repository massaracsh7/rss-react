import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import { CharacterMockPage, CharacterMockPageError } from '../mocks/CharacterMock';
import DetailPage from '../pages/details/[id]';

describe('Detail page', () => {
  test('renders DetailPage', async () => {
    render(<DetailPage {...CharacterMockPage} />, { wrapper: MemoryRouterProvider });
    const detailPage = await screen.findByTitle('detail page');
    waitFor(() => {
      expect(detailPage).toBeVisible();
    });
  });

  test('the component renders card with detail info', async () => {
    render(<DetailPage {...CharacterMockPage} />, { wrapper: MemoryRouterProvider });
    waitFor(() => {
      expect(screen.getByText('Details Info Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('the component renders card with detail info', async () => {
    const { getByText } = render(<DetailPage {...CharacterMockPage} />, {
      wrapper: MemoryRouterProvider,
    });
    waitFor(() => {
      expect(getByText('Details Info Rick Sanchez')).toBeInTheDocument();
      expect(getByText('Loading ...')).toBeFalsy();
    });
  });
  test('if catch errors the component does not renders card  ', async () => {
    console.error = jest.fn();
    render(<DetailPage {...CharacterMockPageError} />, { wrapper: MemoryRouterProvider });
    waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});
