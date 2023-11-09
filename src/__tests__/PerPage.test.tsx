import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PerPage } from '../components/PerPage';

describe('PerPage', () => {
  test('should render options count items', () => {
    render(<PerPage setCountItems={jest.fn()} />);
    const pageItems = screen.getByTestId('per-page');
    expect(pageItems).toBeInTheDocument();
  });

  test('should change options count 20', () => {
    render(<PerPage setCountItems={jest.fn()} />);
    const choose = screen.getByText('20');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '20' });
    });
  });
  test('should change options count 15', () => {
    render(<PerPage setCountItems={jest.fn()} />);
    const choose = screen.getByText('15');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '15' });
    });
  });
  test('should change options count 10', () => {
    render(<PerPage setCountItems={jest.fn()} />);
    const choose = screen.getByText('10');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '10' });
    });
  });
  test('should change options count 5', () => {
    render(<PerPage setCountItems={jest.fn()} />);
    const choose = screen.getByText('5');
    userEvent.click(choose);
    waitFor(() => {
      expect(screen.getByRole('form')).toHaveFormValues({ value: '5' });
    });
  });
});
