import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Pagination } from '../components/Pagination';

describe('Pagination component', () => {
  it('Should render pagination', () => {
    render(
      <Pagination prevPage='' nextPage='' putNextPage={jest.fn()} putPrevPage={jest.fn()} num='' />,
    );
    const btn1 = screen.getByText('Prev');
    expect(btn1).toBeInTheDocument();
    const btn2 = screen.getByText('Next');
    expect(btn2).toBeInTheDocument();
  });
});
