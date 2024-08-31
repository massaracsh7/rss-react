import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { Pagination } from '../components/Pagination';
import { renderWithProviders } from '../mocks/testUtils';

describe('Pagination component', () => {
  it('Should render pagination', () => {
    renderWithProviders(<Pagination />);
    const btn1 = screen.getByText('Prev');
    expect(btn1).toBeInTheDocument();
    const btn2 = screen.getByText('Next');
    expect(btn2).toBeInTheDocument();
  });
});
