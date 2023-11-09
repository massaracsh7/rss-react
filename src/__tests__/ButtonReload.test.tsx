import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonReload from '../components/Buttons/ButtonReload';

describe('ButtonReload component', () => {
  test('Should render Button Reload', () => {
    render(<ButtonReload />);
    const reload = screen.getByText('Try again!');
    expect(reload).toBeInTheDocument();
  });

  test('Should reload after Button Reload click', () => {
    render(<ButtonReload />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    waitFor(() => {
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
