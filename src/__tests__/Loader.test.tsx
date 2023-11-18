import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Loader } from '../components/Loader';

describe('Loader component', () => {
  it('Should render loader', () => {
    render(<Loader />);
    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
  });
});
