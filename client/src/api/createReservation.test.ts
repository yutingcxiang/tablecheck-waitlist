import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';
import { createReservation } from './createReservation';

const params = { name: 'Michael', party_size: 3 };
const invalidParams = { name: 'Michael', party_size: 13 };
const errorMessage = 'Invalid party size';

describe('createReservation', () => {
  test('should fetch the reservation', () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: params }) }),
        ) as jest.Mock,
      );

    createReservation(params);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(API_URL, {
      body: JSON.stringify(params),
      headers: API_HEADERS,
      method: 'POST',
    });
  });

  test('returns the reservation on success', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: params }) }),
        ) as jest.Mock,
      );

    const result = await createReservation(params);

    expect(result).toEqual({
      data: params,
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
      await createReservation(invalidParams);
    }).rejects.toThrow(DEFAULT_ERROR_MESSAGE);
  });
});
