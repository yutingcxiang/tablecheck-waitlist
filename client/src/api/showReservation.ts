import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';

export type ReservationShowParams = {
  id: number;
};

export const showReservation = async (params: ReservationShowParams) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: API_HEADERS,
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
