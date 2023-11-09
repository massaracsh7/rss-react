import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonError from '../components/Buttons/ButtonError';

describe('ButtonReload component', () => {
  test('Should render Button Reload', () => {
    render(<ButtonError />);
    const errorBtn = screen.getByText('Create Error');
    expect(errorBtn).toBeInTheDocument();
  });

  test('Should reload after Button Reload click', () => {
    render(<ButtonError />);
    const errorBtn = screen.getByText('Create Error');
    userEvent.click(errorBtn);
    waitFor(() => {
      const errorText = screen.getByText('Something went wrong.');
      expect(errorText).toBeInTheDocument();
    });
  });
});
