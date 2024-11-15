import { render, screen } from '@testing-library/react';
import ReservationMissing from './ReservationMissing';
import userEvent from '@testing-library/user-event';

const mockHandleNavigation = jest.fn();

describe('ReservationMissing', () => {
  test('renders missing message', () => {
    render(<ReservationMissing handleNavigation={mockHandleNavigation} />);

    expect(screen.getByText('Reservation Not Found')).toBeInTheDocument();
  });

  describe('Return to WaitList Button', () => {
    test('renders a Return to WaitList button', () => {
      render(<ReservationMissing handleNavigation={mockHandleNavigation} />);

      expect(
        screen.getByRole('button', { name: 'Return to Waitlist' }),
      ).toBeInTheDocument();
    });

    test('handles onClick', async () => {
      render(<ReservationMissing handleNavigation={mockHandleNavigation} />);

      const button = screen.getByRole('button', { name: 'Return to Waitlist' });

      await userEvent.click(button);

      expect(mockHandleNavigation).toHaveBeenCalledTimes(1);
    });
  });
});
