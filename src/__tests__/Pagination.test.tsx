import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Pagination } from '../components/Pagination';
import { store } from '../store/index';

describe('Pagination component', () => {
  it('Should render pagination', () => {
    jest.mock('../types/types', () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const btn1 = screen.getByText('Prev');
    expect(btn1).toBeInTheDocument();
    const btn2 = screen.getByText('Next');
    expect(btn2).toBeInTheDocument();
  });
});
