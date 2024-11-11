import { render, screen } from '@testing-library/react';
import ReservationInfo from './ReservationInfo';
import { DEFAULT_ERROR_MESSAGE } from '../../api/constants';

const mockReservation = {
  id: 4,
  name: '4 Guys',
  party_size: 4,
};


let mockShowReservation = Promise.resolve(mockReservation);
jest.mock('../../api/showReservation', () => ({
  showReservation: () => mockShowReservation,
}));

describe('ReservationInfo', () => {
  const reservationId = mockReservation.id;

  describe('when the reservation is found', () => {
    test('renders reservation info', async () => {
      render(<ReservationInfo id={reservationId} />);

      expect(
        await screen.findByText('Reservation Details:'),
      ).toBeInTheDocument();
      expect(await screen.findByText('Name: 4 Guys')).toBeInTheDocument();
      expect(await screen.findByText('Party Size: 4')).toBeInTheDocument();
    });
  });

  describe('when the reservation is not found', () => {
    test('renders form instructions', async () => {
      mockShowReservation = Promise.reject({ message: DEFAULT_ERROR_MESSAGE });

      render(<ReservationInfo id={10} />);

      await expect(async () => {
        expect(
          screen.queryByText('Reservation Not Found'),
        ).not.toBeInTheDocument();
      }).rejects.toThrow();
    });
  });
});
