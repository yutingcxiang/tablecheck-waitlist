import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';

export type ReservationEditParams = {
  name: string;
  party_size: number;
  id: number;
};

export const editReservation = async (params: ReservationEditParams) => {
  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: API_HEADERS,
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
