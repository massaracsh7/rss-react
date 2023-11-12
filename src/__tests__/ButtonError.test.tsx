import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonError from '../components/Buttons/ButtonError';

describe('ButtonError component', () => {
  test('Should render Button Error', () => {
    render(<ButtonError />);
    const errorBtn = screen.getByText('Create Error');
    expect(errorBtn).toBeInTheDocument();
  });

  test('Should not Error text reload before Button Reload click', () => {
    render(<ButtonError />);
    waitFor(() => {
      expect(screen.getByText('Something went wrong.')).toBe(false);
    });
  });

  test('Should Error text reload after Button Reload click', () => {
    render(<ButtonError />);
    const errorBtn = screen.getByText('Create Error');
    userEvent.click(errorBtn);
    waitFor(() => {
      expect(new Error('Error was created')).toHaveBeenCalled();
    });
  });

  test('Should Error text reload after Button Reload click', () => {
    render(<ButtonError />);
    const errorBtn = screen.getByText('Create Error');
    userEvent.click(errorBtn);
    waitFor(() => {
      const errorText = screen.getByText('Something went wrong.');
      expect(errorText).toBeInTheDocument();
    });
  });
});
