import { Reservation } from '../types/common-types';
import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';

export type ReservationCreateParams = Pick<Reservation, 'name' | 'party_size'>;

export const createReservation = async (params: ReservationCreateParams) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
