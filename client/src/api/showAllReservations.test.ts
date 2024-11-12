import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';
import { showAllReservations } from './showAllReservations';

const errorMessage = 'Error';
const mockReservation = {
  id: 4,
  name: "4 Guys",
  party_size: 4,
  position: 5,
}

describe('showAllReservations', () => {
  test('should fetch the reservation', () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: mockReservation }) }),
        ) as jest.Mock,
      );

    showAllReservations();

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(API_URL, {
      headers: API_HEADERS,
      method: 'GET',
    });
  });

  test('returns the reservation on success', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: mockReservation }) }),
        ) as jest.Mock,
      );

    const result = await showAllReservations();

    expect(result).toEqual({
      data: mockReservation,
    });
  });

  test('returns an error on failure', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.reject({
          json: () => Promise.resolve({ message: errorMessage }),
        }),
      ) as jest.Mock,
    );

    await expect(async () => {
      await showAllReservations();
    }).rejects.toThrow(DEFAULT_ERROR_MESSAGE);
  });
});
