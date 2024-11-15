import { render, screen } from '@testing-library/react';
import CheckedInScreen from './CheckedInScreen';
import userEvent from '@testing-library/user-event';

const mockHandleNavigation = jest.fn();

describe('CheckedInScreen', () => {
  test('renders confirmation message', () => {
    render(<CheckedInScreen handleNavigation={mockHandleNavigation} />);

    expect(screen.getByText('Successfully Checked In')).toBeInTheDocument();
    expect(screen.getByText('Please enjoy your meal!')).toBeInTheDocument();
  });

  describe('Return to WaitList Button', () => {
    test('renders a Return to WaitList button', () => {
    render(<CheckedInScreen handleNavigation={mockHandleNavigation} />);

      expect(
        screen.getByRole('button', { name: 'Return to Waitlist' }),
      ).toBeInTheDocument();
    });

    test('handles onClick', async () => {
    render(<CheckedInScreen handleNavigation={mockHandleNavigation} />);

      const button = screen.getByRole('button', { name: 'Return to Waitlist' });

      await userEvent.click(button);

      expect(mockHandleNavigation).toHaveBeenCalledTimes(1);
    });
  });
});
