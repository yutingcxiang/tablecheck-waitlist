import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';
import { editReservation } from './editReservation';

const params = { name: 'Ryan', party_size: 2, id: 5 };
const invalidParams = { name: 'Ryan', party_size: 13, id: 5 };
const errorMessage = 'Invalid party size';

describe('editReservation', () => {
  test('should fetch the reservation', () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: params }) }),
        ) as jest.Mock,
      );

    editReservation(params);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(API_URL, {
      body: JSON.stringify(params),
      headers: API_HEADERS,
      method: 'PUT',
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

    const result = await editReservation(params);

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
      await editReservation(invalidParams);
    }).rejects.toThrow(DEFAULT_ERROR_MESSAGE);
  });
});
