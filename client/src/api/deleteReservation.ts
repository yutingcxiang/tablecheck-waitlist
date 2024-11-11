import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';

export type ReservationDeleteParams = {
  id: number;
};

export const deleteReservation = async (params: ReservationDeleteParams) => {
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: API_HEADERS,
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
