import { act, render, screen, waitFor } from '@testing-library/react';
import ReservationInfo from './ReservationInfo';
import userEvent from '@testing-library/user-event';
import { editReservation } from '../../api/editReservation';

const mockReservation = {
  id: 4,
  name: '4 Guys',
  party_size: 4,
  position: 2,
};

const mockReadyReservation = {
  ...mockReservation,
  position: 0,
};

let mockShowReservation = Promise.resolve(mockReservation);
const mockHandleCheckIn = jest.fn();
const mockHandleCheckOut = jest.fn();

jest.mock('../../api/showReservation', () => ({
  showReservation: () => mockShowReservation,
}));
jest.mock('../../api/editReservation', () => ({
  editReservation: jest.fn(),
}));
jest.mock('../../api/deleteReservation', () => ({
  deleteReservation: jest.fn(),
}));

describe('ReservationInfo', () => {
  describe('when the reservation is found', () => {
    test('renders reservation details', async () => {
      render(
        <ReservationInfo
          reservation={mockReservation}
          handleCheckIn={mockHandleCheckIn}
          handleCheckOut={mockHandleCheckOut}
        />,
      );

      expect(
        await screen.findByTestId('reservation-details'),
      ).toBeInTheDocument();
    });
  });

  describe('when the reservation is not found', () => {
    test('renders form instructions', async () => {
      render(
        <ReservationInfo
          reservation={undefined}
          handleCheckIn={mockHandleCheckIn}
          handleCheckOut={mockHandleCheckOut}
        />,
      );

      await expect(async () => {
        expect(
          screen.queryByText('Reservation Not Found'),
        ).not.toBeInTheDocument();
      }).rejects.toThrow();
    });
  });

  describe('CheckInButton', () => {
    test('renders a Check In button', () => {
      render(
        <ReservationInfo
          reservation={mockReservation}
          handleCheckIn={mockHandleCheckIn}
          handleCheckOut={mockHandleCheckOut}
        />,
      );

      expect(
        screen.getByRole('button', { name: 'Check In' }),
      ).toBeInTheDocument();
    });

    test('is disabled when position is not 0', () => {
      render(
        <ReservationInfo
          reservation={mockReservation}
          handleCheckIn={mockHandleCheckIn}
          handleCheckOut={mockHandleCheckOut}
        />,
      );

      expect(screen.getByRole('button', { name: 'Check In' })).toHaveAttribute(
        'disabled',
      );
    });

    test('is not disabled when position is 0', () => {
      render(
        <ReservationInfo
          reservation={mockReadyReservation}
          handleCheckIn={mockHandleCheckIn}
          handleCheckOut={mockHandleCheckOut}
        />,
      );

      expect(
        screen.getByRole('button', { name: 'Check In' }),
      ).not.toHaveAttribute('disabled');
    });

    test('handles onClick', async () => {
      render(
        <ReservationInfo
          reservation={mockReadyReservation}
          handleCheckIn={mockHandleCheckIn}
          handleCheckOut={mockHandleCheckOut}
        />,
      );

      const button = screen.getByRole('button', { name: 'Check In' });
      // Act warning in test
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(editReservation).toHaveBeenCalledWith({
          id: mockReservation.id,
          position: -1,
        });
      });

      // TODO: Setup jest timers for handling setTimeout
      // await waitFor(() => {
      //   expect(deleteReservation).toHaveBeenCalledWith({
      //     id: mockReservation.id,
      //   });
      // });
    });
  });
});
