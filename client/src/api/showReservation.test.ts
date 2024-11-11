import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';
import { showReservation } from './showReservation';

const params = { id: 4 };
const invalidParams = { id: 14 };
const errorMessage = 'Error';
const mockReservation = {
  id: 4,
  name: "4 Guys",
  party_size: 4,
  position: 5,
}

describe('showReservation', () => {
  test('should fetch the reservation', () => {
    const URL = `${API_URL}?id=${params.id}`;

    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: mockReservation }) }),
        ) as jest.Mock,
      );

    showReservation(params);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(URL, {
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

    const result = await showReservation(params);

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
      await showReservation(invalidParams);
    }).rejects.toThrow(DEFAULT_ERROR_MESSAGE);
  });
});
