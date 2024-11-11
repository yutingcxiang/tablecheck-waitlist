import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';
import { deleteReservation } from './deleteReservation';

const params = { id: 5 };
const invalidParams = { id: 15 };
const errorMessage = 'Error';

describe('deleteReservation', () => {
  test('should fetch the reservation', () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: params }) }),
        ) as jest.Mock,
      );

    deleteReservation(params);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(API_URL, {
      body: JSON.stringify(params),
      headers: API_HEADERS,
      method: 'DELETE',
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

    const result = await deleteReservation(params);

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
      await deleteReservation(invalidParams);
    }).rejects.toThrow(DEFAULT_ERROR_MESSAGE);
  });
});
