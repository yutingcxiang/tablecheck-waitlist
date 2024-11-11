import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deleteReservation } from '../../api/deleteReservation';
import CheckInButton from './CheckInButton';

const mockReservation = {
  id: 4,
  name: '4 Guys',
  party_size: 4,
  position: 5,
};

const mockReadyReservation = {
  ...mockReservation,
  position: 1,
};

const mockHandleCheckIn = jest.fn();

jest.mock('../../api/deleteReservation', () => ({
  deleteReservation: jest.fn(),
}));

describe('CheckInButton', () => {
  test('renders a Check In button', () => {
    render(
      <CheckInButton
        reservation={mockReservation}
        handleCheckIn={mockHandleCheckIn}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Check In' }),
    ).toBeInTheDocument();
  });

  test('is disabled when position is not 1', () => {
    render(
      <CheckInButton
        reservation={mockReservation}
        handleCheckIn={mockHandleCheckIn}
      />,
    );

    expect(screen.getByRole('button', { name: 'Check In' })).toHaveAttribute(
      'disabled',
    );
  });

  test('is not disabled when position is 1', () => {
    render(
      <CheckInButton
        reservation={mockReadyReservation}
        handleCheckIn={mockHandleCheckIn}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Check In' }),
    ).not.toHaveAttribute('disabled');
  });

  test('handles onClick', async () => {
    render(
      <CheckInButton
        reservation={mockReadyReservation}
        handleCheckIn={mockHandleCheckIn}
      />,
    );

    const button = screen.getByRole('button', { name: 'Check In' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(deleteReservation).toHaveBeenCalledWith({
        id: mockReservation.id,
      });
    });
  });
});
