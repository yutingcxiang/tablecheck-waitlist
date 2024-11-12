import { RESTAURANT_CAPACITY } from '../constants';
import { calculateAvailableSeats } from './calculateAvailableSeats';

describe('calculateAvailableSeats', () => {
  test('should return the correct number of available seats given reservations', () => {
    const reservations = [
      { id: 1, name: 'Bruce', party_size: 2, position: -1 },
      { id: 2, name: 'Chris', party_size: 1, position: 0 },
      { id: 3, name: 'Dennis', party_size: 3, position: -1 },
    ];
    const availableSeats = calculateAvailableSeats(reservations);
    expect(availableSeats).toBe(RESTAURANT_CAPACITY - 5);
  });

  test('should return the correct number of available seats given noreservations', () => {
    const availableSeats = calculateAvailableSeats([]);
    expect(availableSeats).toBe(RESTAURANT_CAPACITY);
  });
});
