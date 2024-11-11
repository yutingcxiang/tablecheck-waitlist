import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';
import { deleteReservation } from './deleteReservation';

const params = { id: 5 };
const invalidParams = { id: 15 };
const errorMessage = 'Error';
const successMessage = 'Success';
const mockReservation = {
  id: 5,
  name: "Sean",
  party_size: 2,
}

describe('deleteReservation', () => {
  test('should fetch the reservation', () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ data: mockReservation}) }),
        ) as jest.Mock,
      );

    deleteReservation(params);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/${mockReservation.id}`, {
      body: JSON.stringify(params),
      headers: API_HEADERS,
      method: 'DELETE',
    });
  });

  test('returns a success message on success', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({ message: successMessage }) }),
        ) as jest.Mock,
      );

    const result = await deleteReservation(params);

    expect(result).toEqual({
      message: successMessage,
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
