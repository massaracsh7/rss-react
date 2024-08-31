import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Header } from '../components/Header';

describe('Header component', () => {
  it('Should render header', () => {
    render(<Header />);
    const header = screen.getByText('Rick & Morty Characters');
    expect(header).toBeInTheDocument();
  });
});
