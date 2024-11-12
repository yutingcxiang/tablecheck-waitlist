import { waitFor, renderHook } from '@testing-library/react';
import { useWaitlist } from './useWaitList';

const mockReservation = {
  id: 4,
  name: '4 Guys',
  party_size: 4,
  position: 2,
};
const mockReservation2 = {
  id: 3,
  name: 'Lana',
  party_size: 2,
  position: 1,
};
const mockReservations = [mockReservation, mockReservation2];

let mockShowAllReservations = Promise.resolve(mockReservations);

jest.mock('../api/showAllReservations', () => ({
  showAllReservations: jest.fn().mockImplementation(() => mockShowAllReservations),
}));

jest.mock('../api/editReservation', () => ({
  editReservation: jest.fn(),
}));

// TODO: Test that the useWaitlist hook fetches data
test.skip('fetch should return data', async () => {
  const { result } = renderHook(() => useWaitlist());
  expect(result.current).toEqual({ waitlist: [], availableSeats: 10 });
  await waitFor(() => {
    expect(result.current).toEqual({
      waitList: mockReservations,
      availableSeats: 4,
    });
  });
});
