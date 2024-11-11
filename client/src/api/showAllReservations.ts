import { API_HEADERS, API_URL, DEFAULT_ERROR_MESSAGE } from './constants';


export const showAllReservations = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: API_HEADERS,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
