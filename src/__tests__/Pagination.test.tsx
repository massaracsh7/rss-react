import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import { Pagination } from '../components/Pagination';

describe('Pagination component', () => {
  it('Should render pagination', () => {
    render(<Pagination prevPage='' nextPage='' currentPage='1' />, {
      wrapper: MemoryRouterProvider,
    });
    const btn1 = screen.getByText('Prev');
    expect(btn1).toBeInTheDocument();
    const btn2 = screen.getByText('Next');
    expect(btn2).toBeInTheDocument();
  });
});
