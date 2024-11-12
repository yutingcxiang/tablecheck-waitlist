import { RESTAURANT_CAPACITY } from "../constants";
import { Reservation } from "../types/common-types";

export const calculateAvailableSeats = (reservations: Reservation[]) => {
    const occupiedSeats = reservations
      .filter((res) => res.position === -1)
      .reduce((acc, reservation) => acc + reservation.party_size, 0);
    return RESTAURANT_CAPACITY - occupiedSeats;
  };