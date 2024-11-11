import { Reservation } from '../types/common-types';
import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';

export type ReservationShowParams = Pick<Reservation, 'id'>;

export const showReservation = async (params: ReservationShowParams) => {
  const { id } = params;
  try {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'GET',
      headers: API_HEADERS,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
