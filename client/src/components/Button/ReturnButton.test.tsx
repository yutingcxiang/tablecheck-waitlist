import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReturnButton } from './ReturnButton';

const mockHandleNavigation = jest.fn();

describe('ReturnButton', () => {
  describe('Return to WaitList Button', () => {
    test('renders a Return to WaitList button', () => {
      render(<ReturnButton handleNavigation={mockHandleNavigation} />);

      expect(
        screen.getByRole('button', { name: 'Return to Waitlist' }),
      ).toBeInTheDocument();
    });

    test('handles onClick', async () => {
      render(<ReturnButton handleNavigation={mockHandleNavigation} />);

      const button = screen.getByRole('button', { name: 'Return to Waitlist' });

      await userEvent.click(button);

      expect(mockHandleNavigation).toHaveBeenCalledTimes(1);
    });
  });
});
