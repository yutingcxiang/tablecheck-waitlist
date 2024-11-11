import { Reservation } from '../types/common-types';
import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';

export type ReservationEditParams = Partial<Reservation>;

export const editReservation = async (params: ReservationEditParams) => {
  const { id } = params;
  try {
    const response = await fetch(`${API_URL}/${id}`, {
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
