import { useState, useEffect } from 'react';
import { editReservation } from '../api/editReservation';
import { Reservation } from '../types/common-types';
import { RESERVATION_LIST_POLLING_INTERVAL, RESTAURANT_CAPACITY } from '../constants';
import { showAllReservations } from '../api/showAllReservations';
import { calculateAvailableSeats } from '../utils';

export const useWaitlist = () => {
  const [waitlist, setWaitlist] = useState<Reservation[]>([]);
  const [availableSeats, setAvailableSeats] = useState(RESTAURANT_CAPACITY);

  useEffect(() => {
    // Get all reservations in waitlist
    const fetchAllReservations = async () => {
      try {
        const response = showAllReservations();
        const waitlist = await response;
        setWaitlist(waitlist);
        setAvailableSeats(calculateAvailableSeats(waitlist));
      } catch (error) {
        console.log(error);
      }
    };

    // Poll for new reservations every 3 seconds
    const interval = setInterval(() => {
      fetchAllReservations();
    }, RESERVATION_LIST_POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const setReadyForCheckIn = async (reservation: Reservation) => {
    // Set the position of the reservation to 0 to indicate ready for check in
    try {
      await editReservation({ ...reservation, position: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  const checkWaitlist = async () => {
    if (waitlist.length === 0 || availableSeats === 0) {
      return;
    }

    // If reservations and seats are available, check for the next reservation
    const nextReservation = waitlist[0];
    if (nextReservation) {
      const hasAvailableSeats = nextReservation.party_size <= availableSeats;
      if (hasAvailableSeats) {
        await setReadyForCheckIn(nextReservation);
      }
    }
  };

  useEffect(() => {
    // Check for new reservations and available seats
    const getUpdatedWaitlist = async () => {
      await checkWaitlist();
    };
    getUpdatedWaitlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitlist, availableSeats]);

  return {
    waitlist,
    availableSeats,
  };
};
