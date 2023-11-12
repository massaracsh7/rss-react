import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Page404 from '../pages/Page404/Page404';

describe('Page404 component', () => {
  it('Should render 404 page', () => {
    render(<Page404 />);
    const header = screen.getByText('404 Not Found');
    expect(header).toBeInTheDocument();
  });
});
